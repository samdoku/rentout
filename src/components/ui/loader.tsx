import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

export const Loader = ({ className }: props) => {
	return (
		<div className="flex flex-nowrap items-center flex-row">
			<div className={cn("w-2 h-2 bg-black inline-block aspect-square mr-1 rounded-full animate-[loadingAnim_0.8s_-0.3s_infinite]", className)}></div>
			<div
				className={cn("w-2 h-2 bg-black inline-block aspect-square mr-1 rounded-full animate-[loadingAnim_0.8s_-0.15s_infinite]", className)}
			></div>
			<div className={cn("w-2 h-2 bg-black inline-block aspect-square mr-1 rounded-full animate-[loadingAnim_0.8s_infinite]", className)}></div>
		</div>
	);
};

type props = HTMLAttributes<HTMLDivElement>;
