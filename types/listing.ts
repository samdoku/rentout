// types/listing.ts

import { PricingType } from "@prisma/client";

export interface ListingPhoto {
	id: string;
	url: string;
	isCover: boolean;
	position: number;
}

export interface ListingLocation {
	id: string;
	address: string;
	city: string;
	state: string;
	country: string;
	postalCode: string;
}

export interface ListingHostUser {
	id: string;
	externalId: string;
	firstName: string;
}

export interface ListingHost {
	id: string;
	status: "Active" | "Suspended" | "Banned";
	user: ListingHostUser;
}

export interface Listing {
	id: string;
	title: string | null;
	price: number | null;
	pricingType:PricingType;
	averageRating: number | null;
	bedrooms: number;
	beds: number;
	baths: number;
	guests: number;
	photos: ListingPhoto[];
	location: ListingLocation | null;
	host: ListingHost;
}
