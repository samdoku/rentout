import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MobileFooterBar } from "@/components/mobile-footer-bar";
import { WishlistClient, WishlistClientSkeleton } from "./_components/wishlist-client";
import { getCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

export const dynamic = "force-dynamic";


const Page = async () => {
	const user = await getCurrentUser();

	return (
		<div className="min-h-[100vh] w-full">
			{/* Header */}
			<div className="w-full border-b shadow fixed hidden md:block top-0 bg-white z-40">
				<Header showSearch={false} />
			</div>

			<section className="w-full h-full min-h-[100vh] max-w-screen-xl mx-auto px-4 md:pt-[70px] pb-[70px]">
				<div className="py-7">
					<h1 className="text-2xl font-bold mb-4 md:mt-8">Wishlists</h1>
					{!user ? (
						<div className="flex flex-col items-center justify-center py-10 text-center">
							<p className="text-lg text-muted-foreground mb-4 font-semibold text-left">Log in to view your wishlists and recently viewed listings.</p>
							<Button asChild>
								<Link href="/sign-in">Log in</Link>
							</Button>
						</div>
					) : (
						<Suspense fallback={<WishlistClientSkeleton />}>
							<WishlistClient user={!!user} />
						</Suspense>
					)}
				</div>
			</section>

			<MobileFooterBar />
			<div className="hidden md:block w-full">
				<Footer maxWidth="max-w-[1180px]" />
			</div>
		</div>
	);
};

export default Page;
