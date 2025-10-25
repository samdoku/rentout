import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Amenity, ListingStatus, PropertyType, ManagerStatus } from "@prisma/client";
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: Request) {
	const user = await getCurrentUser();
	if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const host = await prisma.host.findUnique({ where: { userId: user.id ?? "" } });
	if (!host) return NextResponse.json({ error: "Not a host" }, { status: 403 });

	const listing = await prisma.listing.create({
		data: {
			hostId: host.id,
			status: ListingStatus.Draft,
		},
	});

	return NextResponse.json(listing);
}

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);

		// Pagination
		const page = parseInt(searchParams.get("page") || "1");
		const limit = parseInt(searchParams.get("limit") || "20");
		const safePage = page > 0 ? page : 1;
		const safeLimit = limit > 0 && limit <= 100 ? limit : 20;
		const skip = (safePage - 1) * safeLimit;

		// Filters
		const city = searchParams.get("city");
		const country = searchParams.get("country");
		const minPrice = searchParams.get("minPrice");
		const maxPrice = searchParams.get("maxPrice");
		const propertyTypes = searchParams.get("propertyTypes")?.split(",") as PropertyType[] | undefined;
		const amenities = searchParams.get("amenities")?.split(",") as Amenity[] | undefined;

		const minBedrooms = searchParams.get("minBedrooms");
		const maxBedrooms = searchParams.get("maxBedrooms");
		const minGuests = searchParams.get("minGuests");
		const maxGuests = searchParams.get("maxGuests");
		const minBaths = searchParams.get("minBaths");
		const maxBaths = searchParams.get("maxBaths");

		// Sorting
		const sort = searchParams.get("sort") || "postedDate";
		const order = searchParams.get("order") === "asc" ? "asc" : "desc";

		// Validate sort field
		const allowedSortFields = ["price", "postedDate", "averageRating"];
		const sortField = allowedSortFields.includes(sort) ? sort : "postedDate";

		// Build Prisma where clause
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const where: any = {
			status: ListingStatus.Published,
			host: {
				status: ManagerStatus.Active,
			},
			...(minPrice || maxPrice
				? {
						price: {
							...(minPrice ? { gte: parseFloat(minPrice) } : {}),
							...(maxPrice ? { lte: parseFloat(maxPrice) } : {}),
						},
				  }
				: {}),
			...(propertyTypes?.length ? { propertyType: { in: propertyTypes } } : {}),
			...(amenities?.length ? { amenities: { hasSome: amenities } } : {}),

			// ✅ Bedrooms
			...(minBedrooms || maxBedrooms
				? {
						bedrooms: {
							...(minBedrooms ? { gte: parseInt(minBedrooms) } : {}),
							...(maxBedrooms ? { lte: parseInt(maxBedrooms) } : {}),
						},
				  }
				: {}),

			// ✅ Guests
			...(minGuests || maxGuests
				? {
						guests: {
							...(minGuests ? { gte: parseInt(minGuests) } : {}),
							...(maxGuests ? { lte: parseInt(maxGuests) } : {}),
						},
				  }
				: {}),

			// ✅ Baths
			...(minBaths || maxBaths
				? {
						baths: {
							...(minBaths ? { gte: parseFloat(minBaths) } : {}),
							...(maxBaths ? { lte: parseFloat(maxBaths) } : {}),
						},
				  }
				: {}),

			...(city || country
				? {
						location: {
							...(city ? { city: { equals: city, mode: "insensitive" } } : {}),
							...(country ? { country: { equals: country, mode: "insensitive" } } : {}),
						},
				  }
				: {}),
		};

		const [listings, total] = await Promise.all([
			prisma.listing.findMany({
				where,
				select: {
					id: true,
					title: true,
					price: true,
					pricingType:true,
					averageRating: true,
					bedrooms: true,
					baths: true,
					guests: true,
					photos: {
						orderBy: { position: "asc" },
						select: { id: true, url: true, isCover: true, position: true },
					},
					host: {
						select: {
							id: true,
							status: true,
							user: {
								select: {
									id: true,
									externalId: true,
									firstName: true,
								},
							},
						},
					},
					location: {
						select: {
							id: true,
							address: true,
							city: true,
							state: true,
							country: true,
							postalCode: true,
						},
					},
				},
				orderBy: { [sortField]: order },
				skip,
				take: safeLimit,
			}),
			prisma.listing.count({ where }),
		]);

		return NextResponse.json({
			listings,
			pagination: {
				page: safePage,
				limit: safeLimit,
				total,
				totalPages: Math.ceil(total / safeLimit),
				hasNextPage: safePage * safeLimit < total,
			},
		});
	} catch (error) {
		console.error("Error fetching published listings:", error);
		return NextResponse.json({ error: "Failed to fetch listings" }, { status: 500 });
	}
}
