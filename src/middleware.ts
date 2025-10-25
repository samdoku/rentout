import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
	"/",
	"/api/webhooks(.*)",
	"/explore(.*)",
	"/host-homes",
	"/:slug/:id",
	"/wishlist(.*)",
	"/sign-in(.*)",
	"/sign-up(.*)",
]);

const isHostOnlyRoute = createRouteMatcher(["/become-a-host(.*)"]);

export default clerkMiddleware(async (auth, req) => {
	if (!isPublicRoute(req)) {
		await auth.protect();
	}

	if (isHostOnlyRoute(req)) {
		const { sessionClaims } = await auth();
		console.log("sessionClaims", sessionClaims);
		console.log("sessionClaims.metadata.isHost", sessionClaims?.metadata.isHost);
		const isHost = sessionClaims?.metadata.isHost === true;

		if (!isHost) {
			return NextResponse.redirect(new URL("/host-homes", req.url));
		}
	}
});

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
};
