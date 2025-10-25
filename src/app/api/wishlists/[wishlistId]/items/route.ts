import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface Params {
	params: Promise<{ wishlistId: string }>;
}

export async function POST(req: Request, { params }: Params) {
	const { wishlistId } = await params;

	try {
		const user = await getCurrentUser();
		if (!user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { listingId, note } = await req.json();
		if (!listingId) {
			return NextResponse.json({ error: "ListingId is required" }, { status: 400 });
		}

		// Check if listing exists and get its host
		const listing = await prisma.listing.findUnique({
			where: { id: listingId },
			select: { host: { select: { userId: true } } },
		});

		if (!listing) {
			return NextResponse.json({ error: "Listing not found" }, { status: 404 });
		}

		// Prevent user from adding their own listing
		if (listing.host.userId === user.id) {
			return NextResponse.json({ error: "You cannot add your own listing to a wishlist" }, { status: 403 });
		}

		// Ensure wishlist belongs to the user
		const wishlist = await prisma.wishlist.findFirst({
			where: { id: wishlistId, userId: user.id },
		});

		if (!wishlist) {
			return NextResponse.json({ error: "Wishlist not found" }, { status: 404 });
		}

		// Create wishlist item
		const item = await prisma.wishlistItem.create({
			data: {
				wishlistId,
				listingId,
				note,
			},
			include: { listing: true },
		});

		return NextResponse.json(item);
	} catch (error) {
		console.error("POST /api/wishlists/[wishlistId]/items error:", error);

		if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
			return NextResponse.json({ error: "This listing is already in the wishlist" }, { status: 409 });
		}

		return NextResponse.json({ error: "Failed to add item" }, { status: 500 });
	}
}

export async function DELETE(req: Request, { params }: Params) {
	const { wishlistId } = await params;

	try {
		const user = await getCurrentUser();
		if (!user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { listingId } = await req.json();
		if (!listingId) {
			return NextResponse.json({ error: "ListingId is required" }, { status: 400 });
		}

		// Check if wishlist belongs to user
		const wishlist = await prisma.wishlist.findFirst({
			where: { id: wishlistId, userId: user.id },
		});

		if (!wishlist) {
			return NextResponse.json({ error: "Wishlist not found" }, { status: 404 });
		}

		// Find the wishlist item
		const wishlistItem = await prisma.wishlistItem.findFirst({
			where: {
				wishlistId,
				listingId,
			},
			include: {
				listing: {
					select: { host: { select: { userId: true } } },
				},
			},
		});

		if (!wishlistItem) {
			return NextResponse.json({ error: "Wishlist item not found" }, { status: 404 });
		}

		// Prevent removing if user owns this listing (optional safeguard)
		if (wishlistItem.listing.host.userId === user.id) {
			return NextResponse.json({ error: "You cannot remove your own listing from a wishlist" }, { status: 403 });
		}

		await prisma.wishlistItem.delete({
			where: { id: wishlistItem.id },
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("DELETE /api/wishlists/[wishlistId]/items error:", error);
		return NextResponse.json({ error: "Failed to remove item" }, { status: 500 });
	}
}
