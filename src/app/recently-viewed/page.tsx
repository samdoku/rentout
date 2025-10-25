import React from "react";
import Link from "next/link";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileFooterBar } from "@/components/mobile-footer-bar";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import { RecentlyViewed } from "./_components/recently-viewed";

export const dynamic = "force-dynamic";


const RecentlyViewedPage = async () => {
	const user = await getCurrentUser();

	return (
		<div className="min-h-[100vh] w-full">
			<div className="w-full border-b shadow fixed hidden md:block top-0 bg-white z-40">
				<Header showSearch={false} />
			</div>

			<section className="w-full max-w-screen-xl mx-auto px-4 md:pt-[70px] pb-[70px]">
				<h1 className="text-2xl font-bold mb-6 pt-8 md:pt-12">Recently Viewed</h1>

				{user ? (
					<RecentlyViewed user={!!user} />
				) : (
					<>
						<p className="text-muted-foreground mb-4">Log in to see your recently viewed listings.</p>
						<Button asChild>
							<Link href="/sign-in">Log in</Link>
						</Button>
					</>
				)}
			</section>

			<MobileFooterBar />
			<div className="hidden md:block w-full">
				<Footer maxWidth="max-w-[1180px]" />
			</div>
		</div>
	);
};

export default RecentlyViewedPage;
