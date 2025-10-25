import { useQuery } from "@tanstack/react-query";
import { Listing } from "../../types/listing";
import { api } from "@/lib/axios-instance";

import { Prisma } from "@prisma/client";

type ListingWithRelations = Prisma.ListingGetPayload<{
	include: {
		host: {
			include: { user: true };
		};
		photos: true;
		location: true;
		ContactInfo:true;
	};
}> & {
	location: {
		id: string;
		address: string;
		city: string;
		state: string;
		country: string;
		postalCode: string;
		coordinates: { type: "Point"; coordinates: [number, number] } | null;
	} | null;
};

export type ListingFilters = {
	propertyType?: string;
	amenities?: string[];
	minPrice?: number;
	maxPrice?: number;
	minBedrooms?: number;
	maxBedrooms?: number;
	minGuests?: number;
	maxGuests?: number;
};

export const useListings = (page = 1, limit = 20, filters: ListingFilters = {}) => {
	return useQuery<{ listings: Listing[] }>({
		queryKey: ["listings", page, limit, filters],
		queryFn: async () => {
			const params = new URLSearchParams({
				page: String(page),
				limit: String(limit),
			});

			if (filters.propertyType) params.append("propertyTypes", filters.propertyType);
			if (filters.amenities?.length) params.append("amenities", filters.amenities.join(","));
			if (filters.minPrice) params.append("minPrice", filters.minPrice.toString());
			if (filters.maxPrice) params.append("maxPrice", filters.maxPrice.toString());
			if (filters.minBedrooms) params.append("minBedrooms", filters.minBedrooms.toString());
			if (filters.maxBedrooms) params.append("maxBedrooms", filters.maxBedrooms.toString());
			if (filters.minGuests) params.append("minGuests", filters.minGuests.toString());
			if (filters.maxGuests) params.append("maxGuests", filters.maxGuests.toString());

			const res = await fetch(`/api/listings?${params}`);
			if (!res.ok) throw new Error("Failed to fetch listings");
			return res.json();
		},
	});
};

export function useListing(listingId?: string) {
	return useQuery({
		queryKey: ["listing", listingId],
		queryFn: async () => {
			const res = await api.get<ListingWithRelations>(`/listings/${listingId}`);
			return res.data;
		},
		enabled: !!listingId,
	});
}
