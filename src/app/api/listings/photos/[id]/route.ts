import { NextResponse } from "next/server";
import { deleteS3Object } from "@/lib/s3";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	try {
		const user = await getCurrentUser();
		if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

		const photo = await prisma.photo.findUnique({ where: { id } });
		if (!photo) return NextResponse.json({ error: "Not found" }, { status: 404 });

		const host = await prisma.host.findUnique({ where: { userId: user.id } });
		if (!host) return NextResponse.json({ error: "Not a host" }, { status: 403 });

		const listing = await prisma.listing.findUnique({ where: { id: photo.listingId } });
		if (!listing || listing.hostId !== host.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

		// delete from S3 (best-effort)
		try {
			await deleteS3Object(photo.key);
		} catch (err) {
			console.warn("Failed to delete S3 object (continuing to delete DB record):", err);
		}

		await prisma.photo.delete({ where: { id } });

		// Optional: re-normalize positions (shift down positions of later photos)
		await prisma.$executeRawUnsafe(
			`
      UPDATE "Photo"
      SET "position" = "position" - 1
      WHERE "listingId" = $1 AND "position" > $2
    `,
			photo.listingId,
			photo.position
		);

		return NextResponse.json({ success: true });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ error: "Failed to delete photo" }, { status: 500 });
	}
}
