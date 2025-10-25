// app/api/listings/incomplete/route.ts
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ListingStatus, PropertyType } from "@prisma/client";
import { NextResponse } from "next/server";

export type IncompleteListingDTO = {
	id: string;
	photos: { id: string; url: string; isCover: boolean }[];
	postedDate: string; // ISO string for client
	propertyType: PropertyType | null;
	currentStep: string | null;
	title: string | null;
};

export async function GET() {
	const user = await getCurrentUser();
	if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	// If you already looked up host by userId, use host.id below (cheapest & clearest)
	const host = await prisma.host.findUnique({ where: { userId: user.id } });
	if (!host) return NextResponse.json({ error: "Not a host" }, { status: 403 });

	const listings = await prisma.listing.findMany({
		where: {
			status: ListingStatus.Draft,
			hostId: host.id,
		},
		orderBy: { postedDate: "desc" },
		select: {
			id: true,
			postedDate: true,
			propertyType: true,
			currentStep: true,
			title:true,
			photos: {
				select: {
				  id: true,
				  url: true,
				  isCover: true,
				},
				orderBy: { position: "asc" }, // maintain photo order if you added an `order` column
			  },
		},
	});

	// Normalize dates to ISO strings for the client
	const dto: IncompleteListingDTO[] = listings.map((l) => ({
		id: l.id,
		photos: l.photos,
		postedDate: l.postedDate.toISOString(),
		propertyType: l.propertyType,
		currentStep: l.currentStep ?? null,
		title: l.title ?? null,
	}));

	return NextResponse.json(dto);
}
