"use server";

import { getCurrentUser } from "@/lib/auth";
import { clerkClient } from "@clerk/nextjs/server";

export async function setRole() {
	const client = await clerkClient();
	const user = await getCurrentUser();
	if (!user) return { message: "Not Authorized" };

	if (user.isHost) {
		return { message: "Already a isHost" };
	}

	try {
		const res = await client.users.updateUserMetadata(user.externalId, {
			publicMetadata: { isHost: true },
		});

		return { message: res.publicMetadata };
	} catch (err) {
		return { message: err };
	}
}

export async function removeRole(formData: FormData) {
	const client = await clerkClient();

	try {
		const res = await client.users.updateUserMetadata(formData.get("id") as string, {
			publicMetadata: { role: null },
		});
		return { message: res.publicMetadata };
	} catch (err) {
		return { message: err };
	}
}
