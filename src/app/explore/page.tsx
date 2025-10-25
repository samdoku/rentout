import { Categories, CategoriesSkeleton } from "@/components/categories";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MobileFooterBar } from "@/components/mobile-footer-bar";
import { Button } from "@/components/ui/button";
import { Listings, ListingsSkeleton } from "@/components/listing";
import { Suspense } from "react";
import { Filter } from "@/components/filter";
// import { Drawer } from "./_components/drawer";
// import { Filter } from "@/components/filter";

const Page = () => {
	return (
		<div className="min-h-svh w-full relative">
			<div className="w-full border-b left-0 right-0 shadow fixed top-0 bg-white z-[100]">
				<Header />
				<div className="w-full md:border-t">
					<div className="flex items-center w-full max-w-screen-3xl mx-auto 2xl:px-20 lg:px-10 md:px-8 px-0">
						<div className="flex-1 overflow-hidden">
							<Suspense fallback={<CategoriesSkeleton />}>
								<Categories />
							</Suspense>
						</div>
						<div className="md:flex pl-10 hidden">
							<Filter trigger={<Button className="rounded-xlh-10 font-semibold text-sm shadow-none">Filter</Button>} />
						</div>
					</div>
				</div>
			</div>

			<section className="w-full relative 2xl:px-20 lg:px-10 md:px-8 px-4 h-full min-h-svh max-w-screen-3xl mx-auto pt-[calc(70px_+_65px)] md:pt-[calc(80px_+_65px)] pb-[130px] bg-white">
				<div className="mt-4 md:mt-6">
					<Suspense fallback={<ListingsSkeleton />}>
						<Listings />
					</Suspense>
				</div>
				{/* 
				<div className="mt-8">
					<div className="w-52 mt-8 aspect-square rounded-lg shadow-[rgba(60,64,67,0.3)_0px_1px_2px_0px,rgba(60,64,67,0.15)_0px_2px_6px_2px]"></div>
					<div className="w-52 mt-8 aspect-square rounded-lg shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px]"></div>
					<div className="w-52 mt-8 aspect-square rounded-lg shadow-[rgba(0,0,0,0.18)_0px_2px_4px]"></div>
					<div className="w-52 mt-8 aspect-square rounded-lg shadow-[rgba(0,0,0,0.15)_0px_2px_8px]"></div>
					<div className="w-52 mt-8 aspect-square rounded-lg shadow-[rgba(0,0,0,0.25)_0px_0.0625em_0.0625em,rgba(0,0,0,0.25)_0px_0_125em_0.5em,rgba(255,255,255,0.1)_0px_0px_0px_1px_inset]"></div>
					<div className="w-52 mt-8 aspect-square rounded-lg shadow-[0_3px_15px_7px_rgba(0,0,0,0.15)]"></div>
				</div> */}

				{/* <ListingDrawer /> */}
			</section>

			{/* <Drawer /> */}

			<MobileFooterBar />
			<Footer />
		</div>
	);
};

export default Page;
