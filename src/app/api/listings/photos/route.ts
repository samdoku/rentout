import { NextResponse } from "next/server";
import { buildObjectUrl } from "@/lib/s3";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
	try {
		const user = await getCurrentUser();
		if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

		const body = await req.json();
		const { key, listingId } = body;
		if (!key || !listingId) return NextResponse.json({ error: "key and listingId required" }, { status: 400 });

		// verify that user is host and owner of listing
		const host = await prisma.host.findUnique({ where: { userId: user.id } });
		if (!host) return NextResponse.json({ error: "Not a host" }, { status: 403 });

		const listing = await prisma.listing.findUnique({ where: { id: listingId } });
		if (!listing || listing.hostId !== host.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

		const created = await prisma.$transaction(async (tx) => {
			const maxPos = await tx.photo.aggregate({
				where: { listingId },
				_max: { position: true },
			});

			const nextPos = (maxPos._max.position ?? -1) + 1;

			const url = buildObjectUrl(key);

			return await tx.photo.create({
				data: {
					listingId,
					key,
					url,
					position: nextPos,
					isCover: maxPos._max.position === null, // first photo gets cover
				},
			});
		});

		return NextResponse.json(created);
	} catch (err) {
		console.error(err);
		return NextResponse.json({ error: "Failed to save photo" }, { status: 500 });
	}
}

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const listingId = searchParams.get("listingId");

		if (!listingId) {
			return NextResponse.json({ error: "Missing listingId" }, { status: 400 });
		}

		const photos = await prisma.photo.findMany({
			where: { listingId },
			orderBy: { position: "asc" }, // maintain order
		});

		return NextResponse.json(photos);
	} catch (error) {
		console.error("Failed to fetch photos:", error);
		return NextResponse.json({ error: "Failed to fetch photos" }, { status: 500 });
	}
}
