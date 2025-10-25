"use client";

import Link from "next/link";
import React from "react";
import { BahButton } from "./bah-button";

export const Header = ({ isHost, isLoggedIn }: { isHost: boolean; isLoggedIn: boolean }) => {
	const [showHeader, setShowHeader] = React.useState(true);
	const lastScrollY = React.useRef(0);

	React.useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
				// scrolling down
				setShowHeader(false);
			} else {
				// scrolling up
				setShowHeader(true);
			}

			lastScrollY.current = currentScrollY;
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={`fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/90 backdrop-blur transition-transform duration-300 ${
				showHeader ? "translate-y-0" : "translate-y-full"
			}`}
		>
			{" "}
			<div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-3 sm:px-4">
				<div className="hidden md:flex items-center gap-2 font-extrabold lowercase">
					{/* <span className="inline-block h-6 w-6 rounded-md bg-black" /> */}
					rentout
					<span className="hidden lg:inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100/60 px-2 py-0.5 text-xs text-neutral-600">
						Ghana &amp; Africa
					</span>
				</div>

				{/* Nav: plain Links so text never disappears */}
				<nav className="ml-auto flex items-center gap-2">
					<Link
						href="/explore"
						className="h-9 rounded-full px-3 inline-flex items-center border border-neutral-300 bg-white text-sm text-neutral-900 hover:bg-neutral-100"
					>
						Explore
					</Link>
					<Link
						href="/help"
						className="h-9 rounded-full px-3 inline-flex items-center border border-neutral-300 bg-white text-sm text-neutral-900 hover:bg-neutral-100"
					>
						Help
					</Link>
					<BahButton isHost={isHost} isLoggedIn={isLoggedIn} />
				</nav>
			</div>
		</header>
	);
};
