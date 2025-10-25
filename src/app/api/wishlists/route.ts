import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth"; // your auth helper
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const wishlists = await prisma.wishlist.findMany({
      where: { userId: user.id },
      include: {
        items: {
          include: {
            listing: true, // so we can display listing details
          },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(wishlists);
  } catch (error) {
    console.error("GET /api/wishlists error:", error);
    return NextResponse.json({ error: "Failed to fetch wishlists" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { name } = await req.json();
    if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

    const wishlist = await prisma.wishlist.create({
      data: { name, userId: user.id },
    });

    return NextResponse.json(wishlist);
  } catch (error) {
    console.error("POST /api/wishlists error:", error);
    return NextResponse.json({ error: "Failed to create wishlist" }, { status: 500 });
  }
}
