"use server";

import { getUserFromDb } from "@/lib/auth-service";
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
	const currUser = await getUserFromDb();

	revalidatePath("/");

	return { id, currUserId: currUser.id };
};
