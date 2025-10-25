"use client";

import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";

export function MapErrorFallback({ onRetry }: { onRetry: () => void }) {
	const [retrying, setRetrying] = useState(false);

	return (
		<div className="w-full h-full relative">
			{/* Static background to keep layout stable */}
			<Skeleton className="w-full h-full rounded-none" />

			{retrying ? (
				<div className="absolute rounded-3xl bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-2 px-4 shadow-[rgba(0,0,0,0.15)_0px_2px_8px]">
					<Loader className="w-1.5 h-1.5" />
				</div>
			) : (
				<div className="absolute rounded-3xl bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-3 px-4 shadow-[rgba(0,0,0,0.15)_0px_2px_8px] flex items-center gap-3">
					<span className="text-sm">Couldn’t load the map.</span>

					<Button
						size="sm"
						disabled={retrying}
						onClick={() => {
							// let the button render its spinner before we trigger the remount
							setRetrying(true);
							requestAnimationFrame(() => onRetry());
						}}
					>
						Retry
					</Button>
				</div>
			)}
		</div>
	);
}
