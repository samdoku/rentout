// /app/api/host/route.ts
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(_req: Request) {
	const user = await getCurrentUser();
	if (!user || !user.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, host] = await prisma.$transaction([
		prisma.user.update({
			where: { id: user.id },
			data: { isHost: true },
		}),
		prisma.host.upsert({
			where: { userId: user.id },
			update: {},
			create: { userId: user.id },
			select: { id: true },
		}),
	]);

	// mirror to Clerk for JWT claim
	const clerk = await clerkClient();
	const clerkUser = await clerk.users.getUser(user.externalId);
	await clerk.users.updateUserMetadata(clerkUser.id, {
		publicMetadata: { isHost: true },
	});

	return NextResponse.json({ ok: true, hostId: host.id });
}
