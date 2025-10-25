"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios-instance";
import Link from "next/link";
import React from "react";

interface RecentlyViewed {
	id: string;
	viewedAt: string;
	listing: {
		id: string;
		title: string;
		imageUrl: string;
		price: number;
		location: string;
	};
}

export const RecentlyViewed = ({ user }: { user: boolean }) => {
	const { data: recentlyViewed, isLoading } = useQuery<RecentlyViewed[]>({
		queryKey: ["recentlyViewed"],
		queryFn: async () => {
			const res = await api.get("/recently-viewed");
			return res.data;
		},
		enabled: user,
	});

	return (
		<>
			{isLoading ? (
				<div className="text-center text-muted-foreground py-20">Loading your recently viewed listings...</div>
			) : !recentlyViewed?.length ? (
				<div className="text-center text-muted-foreground py-20">You haven’t viewed any listings yet.</div>
			) : (
				<div className="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4 md:gap-6">
					{recentlyViewed.map((item) => (
						<Link key={item.id} href={`/listings/${item.listing.id}`} className="block group">
							<div className="relative aspect-square rounded-2xl overflow-hidden">
								<Image
									src={item.listing.imageUrl}
									alt={item.listing.title}
									fill
									className="object-cover group-hover:scale-105 transition-transform duration-300"
									sizes="(max-width: 768px) 50vw, 25vw"
								/>
							</div>
							<div className="mt-2">
								<h3 className="font-semibold text-sm truncate">{item.listing.title}</h3>
								<p className="text-black/60 text-xs font-medium">
									Viewed{" "}
									{new Date(item.viewedAt).toLocaleDateString(undefined, {
										month: "short",
										day: "numeric",
									})}
								</p>
							</div>
						</Link>
					))}
				</div>
			)}
		</>
	);
};
