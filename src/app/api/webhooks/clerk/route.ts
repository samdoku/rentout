import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from "next/server";
import { deleteFromClerk, upsertFromClerk } from "../../../../lib/clerk-event-handlers";
import { clerkClient } from "@clerk/nextjs/server";
// import type { WebhookEvent } from "@clerk/backend";
// import { Webhook } from "svix";

export async function POST(req: NextRequest) {
	try {
		const evt = await verifyWebhook(req);

		const { id } = evt.data;
		const clerkUserId = evt.data.id!;
		const eventType = evt.type;

		switch (eventType) {
			case "user.created": {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				await upsertFromClerk(evt.data as any);
				const clerk = await clerkClient();
				const user = await clerk.users.getUser(clerkUserId);
				await clerk.users.updateUserMetadata(user.id, {
					publicMetadata: { isHost: true },
				});

				break;
			}

			case "user.updated": {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				await upsertFromClerk(evt.data as any);
				break;
			}

			case "user.deleted": {
				const clerkUserId = id!;
				await deleteFromClerk(clerkUserId);
				break;
			}
			default:
				console.log("Ignored Clerk webhook event", eventType);
		}

		console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
		console.log("Webhook payload:", evt.data);

		return new Response("Webhook received", { status: 200 });
	} catch (err) {
		console.error("Error verifying webhook:", err);
		return new Response("Error verifying webhook", { status: 400 });
	}
}

// async function validateRequest(req: Request): Promise<WebhookEvent | null> {
// 	const payloadString = await req.text();
// 	const svixHeaders = {
// 	  "svix-id": req.headers.get("svix-id")!,
// 	  "svix-timestamp": req.headers.get("svix-timestamp")!,
// 	  "svix-signature": req.headers.get("svix-signature")!,
// 	};
// 	const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
// 	try {
// 	  return wh.verify(payloadString, svixHeaders) as unknown as WebhookEvent;
// 	} catch (error) {
// 	  console.error("Error verifying webhook event", error);
// 	  return null;
// 	}
//   }
