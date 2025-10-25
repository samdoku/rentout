// /lib/schemas/listingPatch.ts
import { z } from "zod";
import {
	Amenity as PrismaAmenity,
	Highlight as PrismaHighlight,
	PropertyType as PrismaPropertyType,
	OccupancyType as PrismaOccupancyType,
	PrivacyType as PrismaPrivacyType,
	BookingType as PrismaBookingType,
	PricingType as PrismaPricingType
} from "@prisma/client";

//
// 1) Literal value lists that mirror what your client sends
//
export const PROPERTY_TYPE_VALUES = ["House", "Hotel", "GuestHouse", "Apartment", "EarthHome", "Dome", "BedAndBreakfast"] as const;

export const AMENITY_VALUES = [
	"wifi",
	"tv",
	"kitchen",
	"washer",
	"freeParkingOnPremises",
	"paidParkingOnPremises",
	"airConditioning",
	"dedicatedWorkspace",
	"pool",
	"hotTub",
	"outdoorDiningArea",
	"firePit",
	"poolTable",
	"indoorFireplace",
	"piano",
	"exerciseEquipment",
	"lakeAccess",
	"beachAccess",
	"outdoorShower",
	"smokeAlarm",
	"firstAidKit",
	"fireExtinguisher",
	"carbonMonoxideAlarm",
] as const;

export const OCCUPANCY_SLUGS = ["me", "roommates", "family", "otherGuests"] as const;

//
// 2) Zod enums built from those values (no JSX here)
//
export const ZPropertyType = z.enum(PROPERTY_TYPE_VALUES);
export const ZAmenity = z.enum(AMENITY_VALUES);
export const ZOccupancyClient = z.enum(OCCUPANCY_SLUGS);
export const ZListingStatus = z.enum(["Draft", "Published", "Archived"] as const);
export const ZBookingType = z.enum(["REQUEST", "INSTANT"] as const);
export const ZPrivacyType = z.enum(["EntirePlace", "Room", "SharedRoom"] as const);
export const ZPricingType = z.enum(["DAY", "WEEK", "MONTH", "YEAR"] as const);

//
// 3) The PATCH schema
//
export const listingPatchSchema = z.object({
	title: z.string().min(1).optional(),
	description: z.string().optional(),
	price: z.number().positive().optional(),
	pricingType:ZPricingType.optional(),
	securityDeposit: z.number().nonnegative().optional(),
	applicationFee: z.number().nonnegative().optional(),
	// photoUrls: z.array(z.string().url()).optional(),

	propertyType: ZPropertyType.optional(),
	privacyType: ZPrivacyType.optional(),
	amenities: z.array(ZAmenity).optional(),
	occupancy: z.array(ZOccupancyClient).optional(),
	highlights: z.array(z.nativeEnum(PrismaHighlight)).optional(),

	isPetsAllowed: z.boolean().optional(),
	isParkingIncluded: z.boolean().optional(),
	guests: z.number().min(1).max(25).default(1),
	bedrooms: z.number().min(0).max(50).default(0),
	beds: z.number().min(0).max(50).default(0),
	baths: z.number().positive().optional(),
	squareFeet: z.number().int().positive().optional(),
	status: ZListingStatus.optional(),

	bookingType: ZBookingType.optional(),
	currentStep: z.string().optional(),

	// optional inline location (keep if you support it)
	location: z
		.object({
			id: z.string().optional(),
			address: z.string(),
			city: z.string(),
			state: z.string(),
			country: z.string(),
			postalCode: z.string(),
			lat: z.number().optional(),
			lng: z.number().optional(),
		})
		.optional(),
});

export type ListingPatchInput = z.infer<typeof listingPatchSchema>;
export type OccupancyClient = z.infer<typeof ZOccupancyClient>;

//
// 4) Map the only mismatched enum: occupancy slugs -> Prisma enum
//
export const OCC_MAP: Record<OccupancyClient, PrismaOccupancyType> = {
	me: PrismaOccupancyType.Me,
	roommates: PrismaOccupancyType.Roommates,
	family: PrismaOccupancyType.Family,
	otherGuests: PrismaOccupancyType.OtherGuests,
};

//
// 5) Helper to transform validated input into Prisma update data
//
export function toPrismaUpdate(parsed: ListingPatchInput) {
	const { occupancy, propertyType,pricingType, privacyType, bookingType, amenities, highlights, location, ...rest } = parsed;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const data: any = { ...rest };

	if (propertyType) data.propertyType = propertyType as PrismaPropertyType;
	if (pricingType) data.pricingType = pricingType as PrismaPricingType;
	if (privacyType) data.privacyType = privacyType as PrismaPrivacyType;
	if (amenities) data.amenities = amenities as unknown as PrismaAmenity[];
	if (occupancy) data.occupancy = occupancy.map((o) => OCC_MAP[o]);
	if (highlights) data.highlights = highlights;
	if (bookingType) data.bookingType = bookingType as PrismaBookingType;

	// Return both: update data + (optional) location payload for your own handler
	return { data, location };
}
