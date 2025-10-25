"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import React from "react";

export const MobileFooter = () => {
	const matches = useIsMobile();

	if (!matches) return null;

	return (
		<footer className="w-full h-[70px] flex border-t fixed bottom-0 z-20 bg-white left-0 right-0">
			<div></div>
		</footer>
	);
};
