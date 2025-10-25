"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
// import Image from 'next/image';
import { usePathname } from "next/navigation";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "./ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type RouteItem = {
	title: string;
	url: string;
	icon?: React.ReactNode;
	activeIcon?: React.ReactNode;
	kind?: "normal" | "account"; // special render logic for the last item
};

const baseRoutes: RouteItem[] = [
	{
		title: "Explore",
		url: `/explore`,
		icon: Icons.explore(),
		activeIcon: Icons.exploreBlack(),
	},
	{
		title: "Wishlists",
		url: `/wishlists`,
		icon: Icons.wishlists(),
		activeIcon: Icons.wishlistsBlack(),
	},
	{
		title: "Categories",
		url: `/category`,
		icon: Icons.category({ style: { width: "24", height: "24" } }),
		activeIcon: Icons.cartBlack({ style: { width: "24", height: "24" } }),
	},
	{
		title: "Inbox",
		url: `/inbox`,
		icon: Icons.inbox(),
		activeIcon: Icons.inbox(),
	},
];

export const MobileFooterBar = () => {
	const pathname = usePathname();
	console.log(pathname);

	const { isLoaded, isSignedIn, user } = useUser();

	// Build the last item based on auth state
	const accountRoute: RouteItem = useMemo(() => {
		if (!isLoaded) {
			// Placeholder while loading; URL won’t be used, but keep structure consistent
			return {
				title: " ",
				url: "#",
				kind: "account",
			};
		}
		if (isSignedIn) {
			return {
				title: "Account",
				url: "/account-settings",
				kind: "account",
			};
		}
		return {
			title: "Log in",
			url: "/sign-in",
			icon: Icons.user(),
			activeIcon: Icons.userBlack(),
			kind: "account",
		};
	}, [isLoaded, isSignedIn]);

	const routes = [...baseRoutes, accountRoute];

	const matches = useIsMobile();
	const [isVisible, setIsVisible] = useState(true);

	let lastScrollY = 0;
	const handleScroll = () => {
		if (typeof window != "undefined") {
			if (window.scrollY > lastScrollY) {
				setIsVisible(false);
			} else {
				setIsVisible(true);
			}
		}
		lastScrollY = window.scrollY;
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	if (!matches) return null;

	const initials = (user?.firstName?.[0] ?? "") + (user?.lastName?.[0] ?? "");

	return (
		<footer
			className={`w-full h-[60px] flex border-t fixed bottom-0 z-20 bg-white left-0 right-0 transition-all duration-250 ease-in-out ${
				isVisible ? "translate-y-[0%]" : "translate-y-[100%]"
			}`}
		>
			<div className="flex max-w-[500px] w-full mx-auto items-center flex-nowrap">
				{routes.map((route, index) => {
					const isActive = pathname === route.url;
					return (
						<Link
							href={route.url}
							key={index}
							className={cn(
								"flex border-t-2 border-transparent h-full flex-col w-[25%] items-center justify-between py-1",
								isActive && "border-black"
							)}
						>
							{/* Icon/Avatar area */}
							{route.kind !== "account" ? (
								isActive ? (
									route.activeIcon
								) : (
									route.icon
								)
							) : !isLoaded ? (
								<Skeleton className="h-6 w-6 rounded-full" />
							) : isSignedIn ? (
								<Avatar className="h-6 w-6">
									<AvatarImage src={user?.imageUrl ?? ""} alt={user?.fullName ?? "Account"} />
									<AvatarFallback className="text-[9px]">{initials || "👤"}</AvatarFallback>
								</Avatar>
							) : isActive ? (
								Icons.userBlack()
							) : (
								Icons.user()
							)}

							<span className={cn("text-[11px] overflow-hidden text-black/80 text-ellipsis whitespace-nowrap", isActive && "font-bold text-black")}>
								{route.title}
							</span>
						</Link>
					);
				})}
			</div>
		</footer>
	);
};
