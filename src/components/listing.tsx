"use client";

import React, { Suspense, useMemo } from "react";
import EmblaCarousel from "./carousel/EmblaCarousel";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import { ListingFilters, useListings } from "@/hooks/useListings";
import { useSearchParams } from "next/navigation";
import { slugify } from "@/lib/slugify";
import { Listing } from "../../types/listing";
import { useUser } from "@clerk/nextjs";
import { formatPricingLabel } from "@/lib/constants";
import { PricingType } from "@prisma/client";

export const Listings = () => {
	const { user } = useUser();
	const searchParams = useSearchParams();

	const filters: ListingFilters = useMemo(() => {
		const params: ListingFilters = {};
		if (searchParams.get("propertyType")) params.propertyType = searchParams.get("propertyType")!;
		if (searchParams.get("amenities")) params.amenities = searchParams.get("amenities")!.split(",");
		if (searchParams.get("minPrice")) params.minPrice = Number(searchParams.get("minPrice")!);
		if (searchParams.get("maxPrice")) params.maxPrice = Number(searchParams.get("maxPrice")!);
		if (searchParams.get("minBedrooms")) params.minBedrooms = Number(searchParams.get("minBedrooms")!);
		if (searchParams.get("maxBedrooms")) params.maxBedrooms = Number(searchParams.get("maxBedrooms")!);
		if (searchParams.get("minGuests")) params.minGuests = Number(searchParams.get("minGuests")!);
		if (searchParams.get("maxGuests")) params.maxGuests = Number(searchParams.get("maxGuests")!);

		return params;
	}, [searchParams]);

	const page = Number(searchParams.get("page") ?? 1);
	const { data, isLoading, isError } = useListings(page, 20, filters);
	if (isLoading || isError) return <ListingsSkeleton />;

	console.log("explore page listings query data", data);

	if (data?.listings && data?.listings.length <= 0) {
		return <div className="text-center font-semibold text-sm">No listings yet</div>;
	}

	return (
		<div className="grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-6">
			{data?.listings?.map((listing: Listing) => (
				<Suspense fallback={<ListingSkeleton />} key={listing?.id}>
					<ListingCard listing={listing} userId={user?.id}/>
				</Suspense>
			))}
		</div>
	);
};

export const ListingCard = ({ listing, userId }: { listing: Listing, userId?: string }) => {
	console.log(listing)
	const slug = listing.title ? slugify(listing.title) : "listing";
	return (
		<Link href={`/${slug}/${listing.id}`} className="">
			<div className="">
				<div className="rounded-2xl overflow-hidden">
					<EmblaCarousel
						images={listing.photos.map((p) => p.url)}
						options={{ containScroll: "trimSnaps", dragFree: false, loop: false, align: "start" }}
						listing={{id: listing.id, hostId:listing.host.user.externalId}}
						currentUserId={userId}
					/>
				</div>
				<div className="text-[0.938rem] flex flex-col justify-between gap-1.5 pt-2">
					<div>
						<div className="flex gap-x-4 justify-between">
							<div className="font-bold line-clamp-1">{listing.title ?? "Untitled Listing"}</div>
							<div className="whitespace-nowrap">󰀄 New </div>
						</div>
						<div className="text-black/50 font-semibold">Hosted by <span className="capitalize">{listing.host.user.firstName}</span></div>
						<div className="text-black/50 font-semibold">2 beds</div>
					</div>
					<div className="text-black/50 font-semibold">
						<strong className="text-black">₵{listing.price!}</strong> / {formatPricingLabel(listing?.pricingType ?? PricingType.DAY)}
					</div>
				</div>
			</div>
		</Link>
	);
};

export const ListingsSkeleton = () => {
	return (
		<div className="grid  grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-6">
			{[...Array(16)].map((_, index) => (
				<ListingSkeleton key={index} />
			))}
		</div>
	);
};

export const ListingSkeleton = () => {
	return (
		<div className="">
			<Skeleton className="rounded-2xl w-full aspect-square" />
			<div className="text-[0.938rem] flex flex-col justify-between gap-1.5 pt-2">
				<div className="flex flex-col gap-1">
					<div className="flex gap-x-4 justify-between">
						<Skeleton className="h-4 w-[80%]" />
						<Skeleton className="h-4 w-12" />
					</div>
					<Skeleton className="h-3 w-32" />
					<Skeleton className="h-3 w-12" />
				</div>
				<Skeleton className="h-4 mt-1 w-20" />
			</div>
		</div>
	);
};
