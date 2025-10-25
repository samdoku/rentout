"use client";

import * as React from "react";
import { useUser, useClerk } from "@clerk/nextjs";

type NavItem = { label: string; href: string } | { label: string; onClick: () => void };

export function useNavLinks(): NavItem[] {
	const { isSignedIn, user } = useUser();
	const { signOut } = useClerk();

	return React.useMemo(() => {
		if (isSignedIn && user) {
			const name = user.fullName ?? user.username ?? user.primaryEmailAddress?.emailAddress?.split("@")[0] ?? "Account";

			return [
				{ label: `${name} • Account`, href: "/account-settings" },
				{ label: "Become a host", href: "/become-a-host" },
				{ label: "Wishlist", href: "/wishlists" },
				{ label: "Log out", onClick: () => signOut({ redirectUrl: "/" }) },
			];
		}

		return [
			{ label: "Sign up", href: "/sign-up" },
			{ label: "Become a host", href: "/become-a-host" },
			{ label: "Sign in", href: "/sign-in" },
			// { label: "Wishlist", href: "/wishlist" },
		];
	}, [isSignedIn, user, signOut]);
}
