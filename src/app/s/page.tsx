"use client";

import { Categories } from "@/components/categories";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MobileFooterBar } from "@/components/mobile-footer-bar";
import { Button } from "@/components/ui/button";
import { ListingSkeleton } from "@/components/listing";
import ErrorBoundary from "@/components/map/error-boundary";
import { MapErrorFallback } from "@/components/map/map-error-fallback";
import { useState } from "react";
import Map from "@/components/map/index";

// import dynamic from "next/dynamic";

// const Map = dynamic(() => import("@/components/map"), { ssr: false });
const Page = () => {
	const [mapKey, setMapKey] = useState(0);
	return (
		<div className="min-h-svh w-full">
			<div className="w-full border-b shadow fixed left-0 right-0 top-0 bg-white z-[100]">
				<Header />
				<div className="w-full md:border-t">
					<div className="flex items-center w-full max-w-screen-3xl mx-auto 2xl:px-20 lg:px-10 md:px-8 px-0">
						<div className="flex-1 overflow-hidden">
							<Categories />
						</div>
						<div className="md:flex pl-6 hidden">
							<Button>Filter</Button>
							<Button>Filter</Button>
						</div>
					</div>
				</div>
			</div>

			<section className="w-full h-full min-h-svh mx-auto pt-[calc(70px_+_65px)] md:pt-[calc(80px_+_65px)] bg-white">
				<div className="w-full flex items-start h-full">
					<div className="md:w-[60%] w-full min-h-svh 2xl:px-20 lg:px-10 md:px-8 px-4 pt-10 pb-20">
						<div className="grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-6">
							{[...Array(16)].map((_, index) => (
								// <Suspense fallback={<ListingSkeleton />} key={index}>
								// 	<Listing />
								// </Suspense>

								<ListingSkeleton key={index} />
							))}
						</div>
					</div>
					<div className="w-[40%] h-[calc(100vh_-_(80px_+_65px))] sticky top-[calc(80px_+_65px)] hidden md:block bg-primary/10">
						<ErrorBoundary fallback={<MapErrorFallback onRetry={() => setMapKey((k) => k + 1)} />} resetKeys={[mapKey]}>
							<Map key={mapKey} />
						</ErrorBoundary>
					</div>
				</div>
			</section>

			<MobileFooterBar />
			<Footer />
		</div>
	);
};

export default Page;
