"use client"

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { api } from "@/lib/axios-instance";
import { Skeleton } from "@/components/ui/skeleton";

interface Wishlist {
	id: string;
	name: string;
	createdAt: string;
	items: {
		listing: { id: string; imageUrl: string; title: string };
	}[];
}

interface RecentlyViewed {
	id: string;
	viewedAt: string;
	listing: {
		id: string;
		imageUrl: string;
		title: string;
	};
}

export const WishlistClient = ({ user }: { user: boolean }) => {
	const {
		data: wishlists,
		isLoading: wishlistLoading,
		isError: wishlistError,
	} = useQuery<Wishlist[]>({
		queryKey: ["wishlists"],
		queryFn: async () => {
			const res = await api.get("/wishlists");
			return res.data;
		},
		enabled: user,
	});

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { data: recentlyViewed, isLoading: rvLoading } = useQuery<RecentlyViewed[]>({
		queryKey: ["recentlyViewed"],
		queryFn: async () => {
			const res = await api.get("/recently-viewed");
			return res.data;
		},
		enabled: !!user,
	});

	const hasWishlists = (wishlists?.length ?? 0) > 0;
	const hasRecentlyViewed = (recentlyViewed?.length ?? 0) > 0;

	if (wishlistLoading || wishlistError) return <WishlistClientSkeleton />;

	return (
		<>
			{/* No wishlists */}
			{!wishlistLoading && !hasWishlists && (
				<div className="text-muted-foreground text-center py-8">You don’t have any wishlists yet. This is where your wishlists will appear.</div>
			)}

			{/* Wishlist grid */}
			{hasWishlists && (
				<div className="mt-8">
					<div className="grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4 md:gap-6">
						{/* Recently Viewed */}
						{recentlyViewed && hasRecentlyViewed && (
							<Link href="/recently-viewed" className="mark block">
								<div className="w-full grid grid-cols-2 grid-rows-2 aspect-square rounded-3xl overflow-hidden gap-1.5">
									{Array.from({ length: 4 }).map((_, index) => {
										const item = recentlyViewed[index];
										return item ? (
											<div key={item.id} className="relative">
												<Image
													src={item.listing.imageUrl}
													alt={item.listing.title}
													fill
													className="object-cover"
													sizes="(max-width: 768px) 50vw, 25vw"
												/>
											</div>
										) : (
											<div key={`empty-${index}`} className="bg-primary/10" />
										);
									})}
								</div>

								<div className="mt-2">
									<h3 className="font-semibold text-sm">Recently viewed</h3>
									<div className="text-black/60 font-semibold">{new Date(recentlyViewed[0].viewedAt).toLocaleDateString()}</div>
								</div>
							</Link>
						)}

						{/* ✅ Wishlist Cards */}
						{wishlists?.map((wishlist) => (
							<Link key={wishlist.id} href={`/wishlists/${wishlist.id}`} className="block">
								<div className="w-full grid grid-cols-2 grid-rows-2 aspect-square rounded-3xl overflow-hidden gap-1.5 bg-primary/10">
									{wishlist.items[0]?.listing ? (
										<div className="relative col-span-2 row-span-2">
											<Image
												src={wishlist.items[0].listing.imageUrl}
												alt={wishlist.items[0].listing.title}
												fill
												className="object-cover"
												sizes="(max-width: 768px) 50vw, 25vw"
											/>
										</div>
									) : (
										<div className="col-span-2 row-span-2 bg-primary/10" />
									)}
								</div>

								<div className="mt-2">
									<h3 className="font-semibold text-sm">{wishlist.name}</h3>
									<div className="text-black/60 font-semibold">{new Date(wishlist.createdAt).toLocaleDateString()}</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export const WishlistClientSkeleton = () => {
	return (
		<div className="mt-8">
			<div className="grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4 md:gap-6">
				{/* Recently Viewed */}

				{/* Wishlist Cards */}
				{[...Array(4)].map((_, index) => (
					<div key={index} className="">
						<Skeleton className="w-full rounded-3xl" />

						<div className="mt-2">
							<Skeleton className="w-full max-w-16 h-5" />
							<Skeleton className="w-full max-w-16 h-5" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export const RecentlyViewedSkeleton = () => {
	return (
		<div className="">
			<div className="w-full grid grid-cols-2 grid-rows-2 aspect-square rounded-3xl overflow-hidden gap-1.5">
				{[...Array(4)].map((_, index) => (
					<Skeleton className="w-full rounded-3xl" key={index} />
				))}
			</div>

			<div className="mt-2">
				<Skeleton className="w-full max-w-16 h-5" />
				<Skeleton className="w-full max-w-16 h-5" />
			</div>
		</div>
	);
};
