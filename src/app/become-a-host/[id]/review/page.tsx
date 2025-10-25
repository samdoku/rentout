"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Icons } from "./_components/icons";
import StepLayout from "../../_components/stepLayout";
import { usePathname, useRouter } from "next/navigation";
import { useStepNavigation } from "@/hooks/use-step-navigation";
import { api } from "@/lib/axios-instance";
import { toast } from "sonner";
import { ListingStatus, PricingType } from "@prisma/client";
import { useListing } from "@/hooks/useListings";
import { formatPricingLabel } from "@/lib/constants";

const nextSteps = [
	{
		title: "Confirm a few details and publish",
		description: "We’ll let you know if you need to verify your identity or register with the local government.",
		icon: Icons.confirm,
	},
	{
		title: "Set up your calendar",
		description: "Choose which dates your listing is available. It will be visible 24 hours after you publish.",
		icon: Icons.calendar,
	},
	{
		title: "Adjust your settings",
		description: "Set house rules, select a cancellation policy, choose how guests book, and more.",
		icon: Icons.adjust,
	},
];

const Page = () => {
	const pathname = usePathname();
	const listingId = pathname.split("/")[2];
	const [listing, setListing] = useState<{
		title: string;
		price: number;
		coverImage?: string;
		pricingType: PricingType;
	} | null>(null);

	const navigations = useStepNavigation();
	const router = useRouter();

	const { data, isLoading, isError, error, refetch } = useListing(listingId);

	useEffect(() => {
		if (data) {
			console.log(data);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const coverPhoto = data?.photos.find((p: any) => p?.isCover) ?? data?.photos[0];
			console.log(coverPhoto);
			const img = coverPhoto?.url ?? "/assets/photos/listing-placeholder.jpg";
			console.log(img);

			setListing({ ...data, coverImage: img });
		}
	}, [data]);

	useEffect(() => {
		if (isError) {
			console.error("Failed to fetch listing", error);
		}
	}, [isError, error]);

	// // 🔹 Prefill with existing listing
	// useEffect(() => {
	// 	const fetchListing = async () => {
	// 		try {
	// 			const res = await api.get(`/listings/${listingId}`);
	// 			setListing(res.data);

	// 			// eslint-disable-next-line @typescript-eslint/no-explicit-any
	// 		} catch (err: any) {
	// 			console.error("Failed to fetch listing", err);
	// 			toast.error("Could not load listing data");
	// 		}
	// 	};
	// 	if (listingId) fetchListing();
	// }, [listingId]);

	let disableAll: (v: boolean) => void = () => {};
	let setButtonLoading: (b: "next" | "back" | "save" | null) => void = () => {};

	const handleNext = async () => {
		disableAll(true);
		setButtonLoading("next");

		try {
			await api.patch(`/listings/${listingId}`, {
				currentStep: navigations.next,
				status: ListingStatus.Published,
			});

			if (navigations.next) {
				router.push(`/become-a-host/${listingId}/${navigations.next}`);
			} else {
				router.push("/explore");
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			console.error(err);
			toast.error("Oops, something went wrong");
			setButtonLoading(null);
			disableAll(false);
		}
	};

	if (isError) {
		return (
			<div className="w-full min-h-svh h-full flex items-center">
				<div className="p-4 bg-red-50 text-red-700 rounded-xl text-center">
					<p className="text-sm font-medium">Failed to load listing.</p>
					<p className="text-xs">{error?.message ?? "Please try again."}</p>
					<button
						onClick={() => refetch()}
						className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
						disabled={isLoading}
					>
						{/* <AlertCircle className=""/> */}
						{isLoading ? "Retrying..." : "Retry"}
					</button>
				</div>
			</div>
		);
	}

	return (
		<StepLayout
			onNext={handleNext}
			onMount={(setDisabled, setLoadingButton) => {
				disableAll = setDisabled;
				setButtonLoading = setLoadingButton;
			}}
			isPrefetching={isLoading}
			canProceed={true}
		>
			<div className="px-4 max-w-4xl mx-auto w-full min-h-svh py-20 h-full flex items-center justify-center">
				<div className="w-full py-4">
					<h1 className="font-[550] text-4xl animate-list-stagger">Review your listing</h1>
					<p className="py-3 text-base mb-2 text-black/70 animate-list-stagger">
						Here&apos;s what we&apos;ll show to guests. Make sure everything looks good.
					</p>

					<div className="flex flex-col md:flex-row">
						{/* Preview Card */}
						<div className="w-full md:w-[42%]">
							<div className="rounded-xl animate-list-stagger delay-[300ms] p-4 shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
								<div className="relative w-full aspect-square rounded-xl overflow-hidden">
									<Image
										src={listing?.coverImage || "/assets/photos/listing-placeholder.jpg"}
										alt={listing?.title || "Listing preview"}
										fill
										className="aspect-square object-cover"
									/>
									<div className="absolute top-4 left-4 bg-white text-sm p-1 rounded-md font-bold">Show preview</div>
								</div>

								<div className="flex gap-x-2 mt-4 justify-between">
									<div className="w-full max-w-[270px]">
										<div className="font-bold line-clamp-1 text-sm">{listing?.title || "Untitled listing"}</div>
										<div className="text-sm pt-1">
											<strong>₵{listing?.price || 0}</strong> / {formatPricingLabel(listing?.pricingType ?? PricingType.DAY)}
										</div>
									</div>
									<div className="whitespace-nowrap text-sm">New 󰀄</div>
								</div>
							</div>
						</div>

						{/* What's Next */}
						<div className="flex-1 pt-7 md:pt-0 md:pl-16">
							<h2 className="text-xl font-semibold pb-5">What&apos;s next?</h2>
							<div>
								{nextSteps.map((item, i) => (
									<div key={i} className="flex gap-x-5 mb-5 animate-list-stagger" style={{ animationDelay: `${600 + i * 10}ms` }}>
										<div>{item.icon()}</div>
										<div>
											<h2 className="font-semibold text-lg">{item.title}</h2>
											<p className="text-sm text-black/60">{item.description}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</StepLayout>
	);
};

export default Page;

// "use client";

// import Image from "next/image";
// import React, { useState } from "react";
// import { Icons } from "./_components/icons";
// import StepLayout from "../../_components/stepLayout";
// import { usePathname, useRouter } from "next/navigation";
// import { useStepNavigation } from "@/hooks/use-step-navigation";

// const next = [
// 	{
// 		title: "Confirm a few details and publish",
// 		description: "We’ll let you know if you need to verify your identity or register with the local government.",
// 		icon: Icons.confirm,
// 	},
// 	{
// 		title: "Set up your calendar",
// 		description: "Choose which dates your listing is available. It will be visible 24 hours after you publish.",
// 		icon: Icons.calendar,
// 	},
// 	{
// 		title: "Adjust your settings",
// 		description: "Set house rules, select a cancellation policy, choose how guests book, and more.",
// 		icon: Icons.adjust,
// 	},
// ];

// const Page = () => {
// 	const pathname = usePathname();
// 	const [isLoading, setIsLoading] = useState(false);
// 	const [isDisabled, setIsDisabled] = useState(true);
// 	const navigations = useStepNavigation();
// 	const router = useRouter();

// 	const handleNext = async () => {
// 		setIsLoading(true);
// 		setIsDisabled(true);
// 		try {
// 			console.log("inside", isLoading);

// 			if (navigations.next) {
// 				router.push(`/become-a-host/${pathname.split("/")[2]}/${navigations.next}`);
// 			}
// 		} catch (err) {
// 			console.log(err);
// 		} finally {
// 			// optional: only reset loading if navigation failed
// 		}
// 	};

// 	return (
// 		<StepLayout onNext={handleNext} isNextLoading={isLoading} isNextDisabled={isDisabled}>
// 			<div className=" px-4 max-w-4xl mx-auto w-full min-h-svh py-20 h-full flex items-center justify-center">
// 				<div className="w-full py-4">
// 					<h1 className="font-[550] text-4xl animate-list-stagger">Review your listing</h1>
// 					<p className="py-3 text-base mb-2 tex-black/70 animate-list-stagger">
// 						Here&apos;s what we&apos;ll show to guests. Make sure everything looks good.
// 					</p>
// 					<div className="flex flex-col md:flex-row">
// 						<div className=" w-full md:w-[42%]">
// 							<div className="rounded-xl  animate-list-stagger delay-[300ms] p-4 shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
// 								<div className="relative w-full aspect-square rounded-xl overflow-hidden">
// 									<Image src="/assets/photos/522414603-accra.jpg" alt={`522414603-accra.jpg`} fill className="aspect-square object-cover" />
// 									<div className="absolute top-4 left-4 bg-white text-sm p-1 rounded-md font-bold">Show preview</div>
// 								</div>
// 								<div className="flex gap-x-2 mt-4 justify-between">
// 									<div className="w-full max-w-[270px]">
// 										<div className="font-bold line-clamp-1 text-sm">Lorem ipsum dolor sit amet consec adipis elit. Alias, temporibus.</div>
// 										<div className="text-sm pt-1">
// 											<strong className="">₵139</strong> / month
// 										</div>
// 									</div>
// 									<div className="whitespace-nowrap text-sm">New 󰀄</div>
// 								</div>
// 							</div>
// 						</div>
// 						<div className=" flex-1 pt-7 md:pt-0 md:pl-16">
// 							<h2 className="text-xl font-semibold pb-5">What&apos;s next?</h2>
// 							<div>
// 								{next.map((item, i) => (
// 									<div key={i} className="flex gap-x-5 mb-5 animate-list-stagger" style={{ animationDelay: `${600 + i * 10}ms` }}>
// 										<div>{item.icon()}</div>
// 										<div>
// 											<h2 className="font-semibold text-lg">{item.title}</h2>
// 											<p className="text-sm tex-black/60">{item.description}</p>
// 										</div>
// 									</div>
// 								))}
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</StepLayout>
// 	);
// };

// export default Page;
// // py-16
