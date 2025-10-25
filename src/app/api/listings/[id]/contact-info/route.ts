import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET: fetch contact info
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const contactInfo = await prisma.contactInfo.findUnique({
      where: { listingId: id },
    });

    if (!contactInfo) {
      return NextResponse.json(
        { error: "Contact info not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(contactInfo);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch contact info" },
      { status: 500 }
    );
  }
}

// POST: create or update contact info
export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await request.json();

  const { fullName, phone, email, alternatePhone } = body;

  if (!fullName || !phone || !email) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const contactInfo = await prisma.contactInfo.upsert({
      where: { listingId: id },
      create: {
        listingId: id,
        fullName,
        phone,
        email,
        alternatePhone,
      },
      update: {
        fullName,
        phone,
        email,
        alternatePhone,
      },
    });

    return NextResponse.json(contactInfo);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to save contact info" },
      { status: 500 }
    );
  }
}
