import { getCurrentUser } from "@/lib/auth";
import { flatPages } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { listingPatchSchema, toPrismaUpdate } from "@/lib/schemas/listingPatch";
import { NextResponse } from "next/server";

function shouldUpdateStep(newStep?: string, currentStep?: string | null) {
	if (!newStep) return false;
	if (!currentStep) return true;
	const currentIndex = flatPages.indexOf(currentStep as (typeof flatPages)[number]);
	const newIndex = flatPages.indexOf(newStep as (typeof flatPages)[number]);
	return newIndex > currentIndex;
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

	// 1️⃣ Get current user and host
	const user = await getCurrentUser();
	if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const host = await prisma.host.findUnique({ where: { userId: user.id } });
	if (!host) return NextResponse.json({ error: "Not a host" }, { status: 403 });

	// 2️⃣ Validate request body
	const body = await req.json();
	console.log({ body });

	const parsed = listingPatchSchema.safeParse(body);
	console.log({ "body parsed": parsed });
	if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

	// 3️⃣ Find listing and check ownership
	const listing = await prisma.listing.findUnique({
		where: { id },
		include: { host: true, location: true },
	});
	if (!listing) return NextResponse.json({ error: "Not found" }, { status: 404 });
	if (listing.host.userId !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

	// 4️⃣ Convert validated payload into Prisma update data
	const { data, location } = toPrismaUpdate(parsed.data);

	let locationIdToSet: string | undefined;

	if (location) {
		// Update existing location
		if (listing.location) {
			locationIdToSet = listing.location.id;

			await prisma.location.update({
				where: { id: listing.location.id },
				data: {
					...(location.address ? { address: location.address } : {}),
					...(location.city ? { city: location.city } : {}),
					...(location.state ? { state: location.state } : {}),
					...(location.country ? { country: location.country } : {}),
					...(location.postalCode ? { postalCode: location.postalCode } : {}),
				},
			});
		} else {
			// Create new location
			const created = await prisma.location.create({
				data: {
					address: location.address ?? "",
					city: location.city ?? "",
					state: location.state ?? "",
					country: location.country ?? "",
					postalCode: location.postalCode ?? "",
				},
				select: { id: true },
			});
			locationIdToSet = created.id;
		}

		// Update PostGIS coordinates if lat/lng provided
		if (location.lat != null && location.lng != null && locationIdToSet) {
			await prisma.$executeRawUnsafe(`
        UPDATE "Location"
        SET "coordinates" = ST_SetSRID(ST_MakePoint(${location.lng}, ${location.lat}), 4326)::geography
        WHERE "id" = '${locationIdToSet}'
      `);
		}
	}

	const updateData = {
		...data,
		...(locationIdToSet ? { locationId: locationIdToSet } : {}),
	};

	if (shouldUpdateStep(data.currentStep as string | undefined, listing.currentStep)) {
		updateData.currentStep = data.currentStep;
	} else {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		delete (updateData as any).currentStep; // ✅ prevent regression
	}

	// 5️⃣ Update listing
	const updatedListing = await prisma.listing.update({
		where: { id },
		data: updateData,
		include: { location: true },
	});

	// 6️⃣ Fetch GeoJSON for frontend
	let locationWithGeo = null;
	if (updatedListing.location) {
		let geojson: { type: "Point"; coordinates: [number, number] } | null = null;
		if (updatedListing.location.id) {
			const raw = await prisma.$queryRaw<{ geojson: string }[]>`
        SELECT ST_AsGeoJSON(coordinates)::text AS geojson
        FROM "Location"
        WHERE id = ${updatedListing.location.id}
      `;
			if (raw[0]?.geojson) geojson = JSON.parse(raw[0].geojson);
		}

		locationWithGeo = {
			id: updatedListing.location.id,
			address: updatedListing.location.address,
			city: updatedListing.location.city,
			state: updatedListing.location.state,
			country: updatedListing.location.country,
			postalCode: updatedListing.location.postalCode,
			coordinates: geojson,
		};
	}

	return NextResponse.json({ ...updatedListing, location: locationWithGeo });
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	console.log("Inside api/listings/:id ", id);
	

	const user = await getCurrentUser();
	if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const listing = await prisma.listing.findUnique({
		where: { id },
		include: {
			host: {
				include: {
					user: true, 
				},
			},
			location: true,
			photos: true,
			ContactInfo: true
		},
	});
	if (!listing) return NextResponse.json({ error: "Not found" }, { status: 404 });
	if (listing.host.userId !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

	let locationWithGeo = null;
	if (listing.location) {
		let geojson: { type: "Point"; coordinates: [number, number] } | null = null;
		const raw = await prisma.$queryRaw<{ geojson: string }[]>`
		SELECT ST_AsGeoJSON(coordinates)::text AS geojson
		FROM "Location"
		WHERE id = ${listing.location.id}
	  `;
		if (raw[0]?.geojson) geojson = JSON.parse(raw[0].geojson);

		locationWithGeo = {
			id: listing.location.id,
			address: listing.location.address,
			city: listing.location.city,
			state: listing.location.state,
			country: listing.location.country,
			postalCode: listing.location.postalCode,
			coordinates: geojson,
		};
	}

	return NextResponse.json({ ...listing, location: locationWithGeo });
}

// import { prisma } from "@/lib/prisma";
// import { Prisma } from "@prisma/client";
// // ...
// const { data, location } = toPrismaUpdate(parsed.data);

// let locationIdToSet: string | undefined;

// if (location) {
//   // 1) Attach to an existing Location
//   if (location.id) {
//     locationIdToSet = location.id;

//     // Optional: if lat/lng provided, update the PostGIS point in that Location
//     if (location.lat != null && location.lng != null) {
//       await prisma.$executeRaw(
//         Prisma.sql`
//           UPDATE "Location"
//           SET "coordinates" = ST_SetSRID(ST_MakePoint(${location.lng}, ${location.lat}), 4326)::geography
//           WHERE "id" = ${location.id}
//         `
//       );
//     }

//     // Optional: also update address fields if provided
//     const addressFields = ["address","city","state","country","postalCode"] as const;
//     const hasAddressUpdates = addressFields.some(k => (location as any)[k] != null);
//     if (hasAddressUpdates) {
//       await prisma.location.update({
//         where: { id: location.id },
//         data: {
//           ...(location.address ? { address: location.address } : {}),
//           ...(location.city ? { city: location.city } : {}),
//           ...(location.state ? { state: location.state } : {}),
//           ...(location.country ? { country: location.country } : {}),
//           ...(location.postalCode ? { postalCode: location.postalCode } : {}),
//         },
//       });
//     }

//   } else {
//     // 2) Create a new Location first (address parts only)
//     const created = await prisma.location.create({
//       data: {
//         address: location.address,
//         city: location.city,
//         state: location.state,
//         country: location.country,
//         postalCode: location.postalCode,
//       },
//       select: { id: true },
//     });
//     locationIdToSet = created.id;

//     // 3) Write the PostGIS geography point if lat/lng provided
//     if (location.lat != null && location.lng != null) {
//       await prisma.$executeRaw(
//         Prisma.sql`
//           UPDATE "Location"
//           SET "coordinates" = ST_SetSRID(ST_MakePoint(${location.lng}, ${location.lat}), 4326)::geography
//           WHERE "id" = ${created.id}
//         `
//       );
//     }
//   }
// }

// // Finally update the listing, wiring in the new/attached location id
// const updated = await prisma.listing.update({
//   where: { id: params.id },
//   data: { ...data, ...(locationIdToSet ? { locationId: locationIdToSet } : {}) },
//   include: { location: true },
// });
// return NextResponse.json(updated);
