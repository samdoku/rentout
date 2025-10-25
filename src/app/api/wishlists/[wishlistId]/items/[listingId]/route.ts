import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

interface Params {
  params: Promise<{ wishlistId: string; listingId: string }>;
}

export async function DELETE(req: Request, { params }: Params) {
    const { wishlistId,  listingId} = await params;
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const wishlist = await prisma.wishlist.findFirst({
      where: { id: wishlistId, userId: user.id },
    });
    if (!wishlist) return NextResponse.json({ error: "Wishlist not found" }, { status: 404 });

    await prisma.wishlistItem.deleteMany({
      where: {
        wishlistId: wishlistId,
        listingId: listingId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/wishlists/[wishlistId]/items/[listingId] error:", error);
    return NextResponse.json({ error: "Failed to remove item" }, { status: 500 });
  }
}
