import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

export const Banner = () => {
	return (
		<div className="relative h-[300px] md:h-[70vh] ">
			<Image src="/assets/photos/banner.jpeg" fill className="object-cover" alt="banner" />

			<div className="absolute inset-0 bg-black opacity-5"></div>

			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center  w-full px-5">
				<p className="text-lg text-center font-semibold">Not sure where to stay? Perfect.</p>
				<Link href="/explore" className=" my-3">
					<Button
						size="lg"
						className="rounded-full text-purple-500 bg-white hover:bg-white shadow-md font-bold  hover:shadow-xl active:scale-90 transition-all duration-200"
					>
						Browse places
					</Button>
				</Link>
			</div>
		</div>
	);
};

export const BannerSkeleton = () => {
	return <Skeleton className="w-full h-[300px] md:h-[70vh]" />;
};
