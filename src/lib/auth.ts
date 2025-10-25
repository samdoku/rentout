import { currentUser } from "@clerk/nextjs/server";
import prisma from "./prisma";
import { User } from "@prisma/client";


export async function getCurrentUser(): Promise<User | null> {
	try {
		const cu = await currentUser();
		if (!cu) throw new Error("Unauthorized");

		// const email =
		// 	cu.emailAddresses.find((e) => e.id === cu.primaryEmailAddressId)?.emailAddress ??
		// 	cu.emailAddresses[0]?.emailAddress ??
		// 	`no-email+${cu.id}@example.invalid`; // RFC 2606 “.invalid” TLD

		const appUser = await prisma.user.findUnique({
			where: { externalId: cu.id },
		});

		if (!appUser) throw new Error("User not found");
		return appUser;
	} catch (error) {
		console.log(error);
		return null;
	}
}
