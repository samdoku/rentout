// lib/clerk-event-handlers.ts

import prisma from "./prisma";

type ClerkEmail = {
	id: string;
	email_address: string;
	verification?: { status?: string | null } | null;
};

type ClerkPhone = {
	id: string;
	phone_number: string;
	verification?: { status?: string | null } | null;
};

type ClerkUserPayload = {
	id: string;
	first_name?: string | null;
	last_name?: string | null;
	image_url?: string | null;
	profile_image_url?: string | null;

	primary_email_address_id?: string | null;
	email_addresses?: ClerkEmail[];

	primary_phone_number_id?: string | null;
	phone_numbers?: ClerkPhone[];
};

function pickPrimaryEmail(p: ClerkUserPayload): string | null {
	const byId = p.email_addresses?.find((e) => e.id === p.primary_email_address_id) ?? null;
	if (byId?.email_address) return byId.email_address;

	const verified = p.email_addresses?.find((e) => e.verification?.status === "verified") ?? null;
	if (verified?.email_address) return verified.email_address;

	return p.email_addresses?.[0]?.email_address ?? null;
}

function isPrimaryEmailVerified(p: ClerkUserPayload): boolean {
	const primary = p.email_addresses?.find((e) => e.id === p.primary_email_address_id) ?? null;
	const candidate = primary ?? p.email_addresses?.find((e) => e.verification?.status === "verified") ?? null;
	return candidate?.verification?.status === "verified";
}

function pickPrimaryPhone(p: ClerkUserPayload): string | null {
	const byId = p.phone_numbers?.find((ph) => ph.id === p.primary_phone_number_id) ?? null;
	if (byId?.phone_number) return byId.phone_number;

	const verified = p.phone_numbers?.find((ph) => ph.verification?.status === "verified") ?? null;
	if (verified?.phone_number) return verified.phone_number;

	return p.phone_numbers?.[0]?.phone_number ?? null;
}

export async function upsertFromClerk(payload: ClerkUserPayload) {
	const email = pickPrimaryEmail(payload); // string | null
	const firstName = payload.first_name ?? "";
	const lastName = payload.last_name ?? "";
	const phoneNumber = pickPrimaryPhone(payload);
	const profilePhotoUrl = payload.profile_image_url ?? payload.image_url ?? null;
	const isVerified = !!email && isPrimaryEmailVerified(payload);

	await prisma.user.upsert({
		where: { externalId: payload.id },
		create: {
			externalId: payload.id,
			email, // null allowed
			firstName,
			lastName,
			phoneNumber: phoneNumber ?? null,
			profilePhotoUrl,
			isVerified,
		},
		update: {
			email, // will set to null if Clerk has no email
			firstName,
			lastName,
			phoneNumber: phoneNumber ?? null,
			profilePhotoUrl,
			isVerified,
		},
	});
}

export async function deleteFromClerk(clerkUserId: string) {
	await prisma.user.deleteMany({ where: { externalId: clerkUserId } });
}
