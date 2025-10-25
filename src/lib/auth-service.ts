import { currentUser } from "@clerk/nextjs/server";
import prisma from "./prisma";

export const getUserFromDb = async () => {
	const currUser = await currentUser();
	if (!currUser) throw new Error("Unauthorized");

	try {
		const user = await prisma.user.findUnique({
			where: { externalId: currUser.id },
		});

		if (!user) throw new Error("User not found");
		return user;
	} catch (error) {
		console.log(error);

		throw new Error("Something went wrong!");
	}
};
