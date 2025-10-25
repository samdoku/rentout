"use client";

import { useState } from "react";
import { ExploreListingDrawer } from "@/components/explore-listing";
import { Button } from "@/components/ui/button";
import React from "react";

export const ListingDrawer = () => {
	const [open, setOpen] = useState(true);

	return (
		<>
			<Button
				onClick={() => {
					setOpen((val) => !val);
				}}
				className="fixed z-[100] bottom-0 mb-4 rounded-full left-1/2 -translate-x-1/2"
			>
				Map
			</Button>
			<div>
				<ExploreListingDrawer open={open} onOpenChange={setOpen} />
			</div>
		</>
	);
};
