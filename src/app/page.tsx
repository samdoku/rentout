import { Banner, BannerSkeleton } from "@/components/banner";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Suspense } from "react";

const liveAnywhere = [
	{
		img: "/assets/photos/2f13349d-879d-43c6-83e3-8e5679291d53.jpeg",
		title: "Outdoor getaways",
	},
	{
		img: "/assets/photos/36f53e61-db8d-403c-9122-5b761c0e4264.jpeg",
		title: "Unique stays",
	},
	{
		img: "/assets/photos/7d82ca14-56e5-4465-8218-dcfa7d69b6ac.jpeg",
		title: "Entire homes",
	},
	{
		img: "/assets/photos/10a638e1-6aff-4313-8033-1275cec83987.jpeg",
		title: "Pet allowed",
	},
];

const explore = [
	{
		img: "/assets/photos/522414603-accra.jpg",
		location: "Accra",
	},
	{
		img: "/assets/photos/Johannesburg-Spark-Cover-1440x720.png-johannesburg.webp",
		location: "Johannesburg",
	},
	{
		img: "/assets/photos/490790293-abuja.jpg",
		location: "Abuja",
	},
	{
		img: "/assets/photos/essential-cairo-travel-tips-hints-trips-in-egypt.jpg",
		location: "Cairo",
	},
	{
		img: "/assets/photos/baskent-cezayir-populer-sehirler-algiers.webp",
		location: "Algiers",
	},
	{
		img: "/assets/photos/196257845_431934084860157_7029370151857605625_n-addis.jpg",
		location: "Addis Ababa",
	},
	{
		img: "/assets/photos/Casablanca.webp",
		location: "Casablanca",
	},
	{
		img: "/assets/photos/nairobi.jpg",
		location: "Nairobi",
	},
];

export default function Home() {
	return (
		<div className="min-h-[100vh] w-full">
			<div className="w-full fixed left-0 right-0 top-0 bg-transparent z-50">
				<Header />
			</div>
			<div className="min-h-svh h-full pb-20">
				<Suspense fallback={<BannerSkeleton />}>
					<Banner />
				</Suspense>

				<main className="max-w-screen-lg  mx-auto ">
					<section className="pt-8 px-4">
						<h2 className="text-2xl md:text-3xl font-semibold pb-4 md:pb-5">Explore Nearby</h2>

						<div className="grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-1 md:gap-3">
							{explore.map((item, i) => (
								<div
									key={i}
									className="flex items-center flex-nowrap  p-2 cursor-pointer hover:bg-gray-100 rounded-xl hover:scale-105 transition-all duration-300 ease-out space-x-3"
								>
									<div className="relative h-20 w-20 aspect-square">
										<Image src={item.img} alt={`${item.location} image`} className="rounded-xl h-20 w-20 aspect-square object-cover" fill />
									</div>
									<div>
										<h2 className="font-semibold text-sm">{item.location}</h2>
										<h3>45-min drive</h3>
									</div>
								</div>
							))}
						</div>
					</section>

					<section className="pt-8 mt-6 px-4">
						<h2 className="text-2xl md:text-3xl font-semibold pb-5">Live Anywhere</h2>

						<div className="flex flex-nowrap gap-x-6 overflow-auto no-scrollbar">
							{liveAnywhere.map((item, i) => (
								<div key={i} className="flex flex-col cursor-pointer  group hover:bg-gray-100 rounded-xl transition-all duration-300 ease-out">
									<div className="relative h-80 w-80 overflow-hidden rounded-xl">
										<Image
											src={item.img}
											alt={item.title}
											className="rounded-xl aspect-square object-cover group-hover:scale-105 transition-all duration-300 ease-out"
											fill
										/>
									</div>
									<div className="py-2">
										<h2 className="font-semibold text-lg">{item.title}</h2>
									</div>
								</div>
							))}
						</div>
					</section>

					<section className="mt-24 mb-4  md:mx-4 relative">
						<div className="relative  h-96">
							<Image src="/assets/photos/2da67c1c-0c61-4629-8798-1d4de1ac9291.jpeg" alt="something" className="md:rounded-xl object-cover" fill />
						</div>
						<div className="absolute inset-0 md:rounded-xl bg-black opacity-5"></div>
						<div className="absolute top-1/4 left-10">
							<h2 className="text-2xl md:text-4xl font-semibold mb-3">The Greatest Outdoors</h2>
							<p>Whislists curated by Nestquest</p>
							<Button className="rounded-lg font-bold my-2 transition-all duration-200">Get inspired</Button>
						</div>
					</section>
				</main>
			</div>

			<Footer />
		</div>
	);
}

// [{"img":"https://links.papareact.com/2io","title":"Outdoor getaways"},{"img":"https://links.papareact.com/q7j","title":"Unique stays"},{"img":"https://links.papareact.com/s03","title":"Entire homes"},{"img":"https://links.papareact.com/8ix","title":"Pet allowed"}]
