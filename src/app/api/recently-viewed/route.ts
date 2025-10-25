import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const items = await prisma.recentlyViewed.findMany({
      where: { userId: user.id },
      orderBy: { viewedAt: "desc" },
      take: 10,
      include: { listing: true },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("GET /api/recently-viewed error:", error);
    return NextResponse.json(
      { error: "Failed to fetch recently viewed" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { listingId } = await req.json();
    if (!listingId)
      return NextResponse.json(
        { error: "listingId is required" },
        { status: 400 }
      );

    // Upsert to ensure unique per user
    const item = await prisma.recentlyViewed.upsert({
      where: {
        userId_listingId: {
          userId: user.id,
          listingId,
        },
      },
      create: { userId: user.id, listingId },
      update: { viewedAt: new Date() },
      include: { listing: true },
    });

    // ✅ Fire-and-forget cleanup: we don't await this
    prisma.recentlyViewed
      .findMany({
        where: { userId: user.id },
        orderBy: { viewedAt: "desc" },
        skip: 10,
      })
      .then((oldItems) => {
        if (oldItems.length > 0) {
          prisma.recentlyViewed.deleteMany({
            where: { id: { in: oldItems.map((i) => i.id) } },
          }).catch((err) => console.error("Cleanup failed:", err));
        }
      })
      .catch((err) => console.error("Fetch old recently viewed failed:", err));

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("POST /api/recently-viewed error:", error);
    return NextResponse.json(
      { error: "Failed to add recently viewed" },
      { status: 500 }
    );
  }
}
