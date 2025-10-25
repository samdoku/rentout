import { NextResponse } from "next/server";
import { getPresignedPutUrl } from "@/lib/s3";
import crypto from "crypto";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { contentType } = body;
		if (!contentType) return NextResponse.json({ error: "contentType required" }, { status: 400 });

		// create a key, e.g. listings/{uuid}.{ext}
		const id = crypto.randomUUID();
		// try to infer extension
		const ext = (contentType.split("/")[1] || "bin").split("+")[0];
		const key = `listings/${id}.${ext}`;

		

		const uploadUrl = await getPresignedPutUrl(key, contentType, 360); // 6min expiry
		console.log({ uploadUrl, key });

		return NextResponse.json({ uploadUrl, key });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ error: "Failed to create presigned URL" }, { status: 500 });
	}
}
