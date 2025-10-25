"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MobileFooter } from "./_components/mobile-footer";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import EmblaCarousel from "./_components/carousel/EmblaCarousel";
import { Separator } from "@/components/ui/separator";
import { notFound, usePathname } from "next/navigation";
import { useListing } from "@/hooks/use-listings";
import { Loader } from "@/components/ui/loader";
import { useUser } from "@clerk/nextjs";
import ErrorBoundary from "@/components/map/error-boundary";
import { MapErrorFallback } from "@/components/map/map-error-fallback";
import { useEffect, useState } from "react";
import Map from "@/components/map/index";
import { Mail, Phone, MapPin, Landmark, X } from "lucide-react";

const Page = () => {
	const pathname = usePathname();
	const listingId = pathname.split("/")[2];
	const { data: listing, isLoading, isError } = useListing(listingId);
	const { user } = useUser();
	const [mapKey, setMapKey] = useState(0);

	// new: image viewer state
	const [viewerOpen, setViewerOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	// close viewer on ESC
	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setViewerOpen(false);
		};
		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, []);

	if (isLoading || isError) {
		return (
			<div className="w-full h-full flex items-center justify-center">
				<Loader />
			</div>
		);
	}

	if (!listing) return notFound();

	const photos = listing.photos.map((p) => p.url);
	const contact = listing.ContactInfo?.[0];

	return (
		<div className="min-h-svh w-full">
			{/* header */}
			<div className="w-full border-b shadow fixed top-0 bg-white z-[100] hidden md:block">
				<Header maxWidth="max-w-[1180px]" />
			</div>

			<section className="w-full relative h-full min-h-svh max-w-[1180px] mx-auto md:pt-[calc(80px_+_0px)] pb-[130px] bg-white">
				{/* images */}
				<div className="w-full md:mt-6 2xl:px-20 lg:px-10 md:px-8">
					{/* desktop gallery */}
					<div className="overflow-hidden rounded-2xl hidden relative md:grid grid-cols-4 grid-rows-2 min-h-[400px] max-h-[calc(60vh_-_64px)] h-full gap-2">
						{photos.map((url, i) => (
							<div
								key={i}
								className={cn("w-full relative h-full cursor-pointer", i === 0 && "col-span-2 row-span-2")}
								onClick={() => {
									setSelectedImage(url);
									setViewerOpen(true);
								}}
							>
								<Image
									src={url}
									alt={`Listing image ${i + 1}`}
									className="object-cover w-full hover:brightness-90 transition-all duration-150"
									fill
								/>
							</div>
						))}
						<div className="absolute bottom-4 right-4">
							<Button
								variant="outline"
								className="font-bold text-xs h-8 border-black border-2 rounded-lg px-3"
								onClick={() => {
									setSelectedImage(photos[0]);
									setViewerOpen(true);
								}}
							>
								Show all photos
							</Button>
						</div>
					</div>

					{/* mobile carousel */}
					<div className="w-full md:hidden">
						<EmblaCarousel
							currentUserId={user?.id}
							listing={{ id: listing.id, hostId: listing.host.user.externalId }}
							images={photos}
							options={{ containScroll: "trimSnaps", dragFree: false, loop: false, align: "start" }}
						/>
					</div>
				</div>

				{/* content + sidebar */}
				<div className="w-full flex gap-10 mt-6 2xl:px-20 lg:px-10 md:px-8 px-4">
					{/* left content */}
					<div className="w-full">
						<div className="pb-6 border-b border-black/20">
							<h2 className="font-semibold text-xl line-clamp-2">{listing.title}</h2>
							<div className="mt-1 flex items-center gap-2 text-sm">
								<span>2 guests</span>
								<Separator orientation="vertical" className="h-3 bg-black/80" />
								<span>1 bed</span>
								<Separator orientation="vertical" className="h-3 bg-black/80" />
								<span>1 bath</span>
							</div>
						</div>

						{/* host info */}
						<div className="border-b border-black/20 py-6 flex gap-6 items-center">
							<div className="relative w-[50px] h-[50px] rounded-full overflow-hidden">
								<Image
									src={listing.host.user.profilePhotoUrl!}
									alt="host"
									fill
									className="object-cover"
								/>
							</div>
							<div>
								<div className="font-semibold text-base capitalize">
									Hosted by {listing.host.user.firstName}
								</div>
								<p className="text-sm text-gray-600">1 year hosting</p>
							</div>
						</div>

						{/* about host */}
						<div className="border-b border-black/20 py-6">
							<h2 className="font-semibold text-xl mb-3">Meet your Host</h2>
							<div className="bg-[#f0efe9] rounded-3xl mt-6 p-4">
								<div className="bg-white rounded-3xl shadow-[0_6px_20px_rgba(0,0,0,0.2)] p-4 flex flex-col items-center">
									<div className="relative w-[90px] h-[90px] rounded-full overflow-hidden">
										<Image
											src={listing.host.user.profilePhotoUrl!}
											alt="host"
											fill
											className="object-cover"
										/>
									</div>
									<h3 className="font-semibold text-lg mt-3">
										{listing.host.user.firstName} {listing.host.user.lastName}
									</h3>
									<p className="text-gray-500">Host</p>
								</div>
							</div>
						</div>

						{/* description */}
						<div className="border-b border-black/20 py-6">
							<p className="text-gray-700 leading-relaxed">{listing.description}</p>
						</div>

						{/* location */}
						<div className="border-t border-black/20 py-6">
							<h2 className="font-semibold text-xl mb-4 flex items-center gap-2">
								<MapPin className="w-5 h-5" />
								Location
							</h2>

							<div className="flex flex-col gap-2 text-gray-700 mb-6">
								<div className="flex items-center gap-2">
									<Landmark className="w-4 h-4" />
									<span>{listing.title}</span>
								</div>
								<div className="flex items-center gap-2">
									<MapPin className="w-4 h-4" />
									<span>Accra, Ghana</span>
								</div>
							</div>

							<div className="w-full h-[400px] rounded-xl overflow-hidden">
								<ErrorBoundary
									fallback={<MapErrorFallback onRetry={() => setMapKey((k) => k + 1)} />}
									resetKeys={[mapKey]}
								>
									<Map key={mapKey} />
								</ErrorBoundary>
							</div>
						</div>
					</div>

					{/* sidebar */}
					<div className="w-[400px] h-fit shadow-[0_3px_15px_7px_rgba(0,0,0,0.15)] rounded-xl sticky top-[calc(80px_+_24px)] hidden md:block bg-white p-6">
						<div className="flex items-baseline justify-between">
							<div className="text-2xl font-semibold">
								₵{listing.price}
								<span className="text-sm font-normal text-gray-500 ml-1">
									/ {listing.pricingType?.toLowerCase()}
								</span>
							</div>
							<div className="text-sm text-gray-400">
								{listing.propertyType} · {listing.privacyType}
							</div>
						</div>

						<Separator className="my-4" />

						{contact && (
							<div>
								<h3 className="text-lg font-semibold mb-3">Contact Host</h3>
								<div className="space-y-2 text-sm text-gray-700">
									<div className="flex items-center gap-2">
										<Mail className="w-4 h-4 text-gray-600" />
										<span>{contact.email}</span>
									</div>
									<div className="flex items-center gap-2">
										<Phone className="w-4 h-4 text-gray-600" />
										<span>{contact.phone}</span>
									</div>
									{contact.alternatePhone && (
										<div className="flex items-center gap-2">
											<Phone className="w-4 h-4 text-gray-600" />
											<span>{contact.alternatePhone}</span>
										</div>
									)}
								</div>
								<Button className="w-full mt-6">Send Message</Button>
							</div>
						)}
					</div>
				</div>
			</section>

			{/* Image Viewer Modal */}
			{viewerOpen && (
				<div
					className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center p-4"
					onClick={() => setViewerOpen(false)}
				>
					<div
						className="relative max-w-6xl w-full h-[80vh]"
						onClick={(e) => e.stopPropagation()}
					>
						{selectedImage && (
							<Image
								src={selectedImage}
								alt="Full view"
								fill
								className="object-contain"
							/>
						)}
						<button
							className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2"
							onClick={() => setViewerOpen(false)}
						>
							<X className="w-6 h-6 text-white" />
						</button>
					</div>
				</div>
			)}

			<MobileFooter />
			<Footer maxWidth="max-w-[1180px]" />
		</div>
	);
};

export default Page;
