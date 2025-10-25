import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const locationSchema = z.object({
  country: z.string().min(1, "Country is required"),
  state: z.string().optional(),
  city: z.string().min(1, "City is required"),
  street: z.string().min(1, "Street address is required"),
  zipCode: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id:listingId } = await params;
    const body = await req.json();
    const parsed = locationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors.map(e => e.message).join(", ") },
        { status: 400 }
      );
    }

    const { country, state, city, street, zipCode, latitude, longitude } =
      parsed.data;

    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    // Step 1: Create Location without coordinates
    const location = await prisma.location.create({
      data: {
        address: street,
        city,
        state: state || "",
        country,
        postalCode: zipCode || "",
      },
    });

    // Step 2: If lat/lon provided, insert coordinates manually
    if (latitude && longitude) {
      await prisma.$executeRawUnsafe(`
        UPDATE "Location"
        SET "coordinates" = ST_GeogFromText('SRID=4326;POINT(${longitude} ${latitude})')
        WHERE id = '${location.id}'
      `);
    }

    // Step 3: Link location to listing
    const updatedListing = await prisma.listing.update({
      where: { id: listingId },
      data: { locationId: location.id },
      include: { location: true },
    });

    return NextResponse.json(updatedListing);
  } catch (error) {
    console.error("Error creating location:", error);
    return NextResponse.json(
      { error: "Something went wrong while saving location" },
      { status: 500 }
    );
  }
}
