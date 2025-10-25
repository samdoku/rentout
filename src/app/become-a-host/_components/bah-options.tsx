"use client";

import { Loader } from "@/components/ui/loader";
import { api } from "@/lib/axios-instance";
import { cn } from "@/lib/utils";
import { Listing } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const BahOptions = () => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const queryClient = useQueryClient();

	const createNewListing = () => {
		startTransition(async () => {
			try {
				const res = await api.post<Listing>("/listings", {});
				const listing = res.data;
				router.push(`/become-a-host/${listing.id}/overview`);
				queryClient.invalidateQueries({ queryKey: ["incomplete-listings"] });
			} catch {
				toast.error("Something went wrong");
			}
		});
	};

	return (
		<div className="start-new-listings w-full">
			<h2 className="ucl-header font-semibold text-[22px] mt-[10px] mb-4 text-left text-neutral-700">Start a new listing</h2>

			<div className="snl-options-container mb-[10px]">
				<div className="snl-option flex items-center gap-3 py-6 border-b border-gray-300">
					<div className="snl-option-svg flex items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 32 32"
							aria-hidden="true"
							role="presentation"
							focusable="false"
							className="snl-option-real-svg block h-[26px] w-[26px] md:h-8 md:w-8 fill-current"
						>
							<path
								d="M31.7 15.3 29 12.58 18.12 1.7a3.07 3.07 0 0 0-4.24 0L3 12.59l-2.7 2.7 1.4 1.42L3 15.4V28a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V15.41l1.3 1.3ZM27 28H5V13.41L15.3 3.12a1 1 0 0 1 1.4 0L27 13.42ZM17 12v5h5v2h-5v5h-2v-5h-5v-2h5v-5Z"
								fill="#222222"
							></path>
						</svg>
					</div>
					<button
						disabled={isPending}
						className="snl-option-type relative flex items-center justify-between py-1 w-full cursor-pointer"
						onClick={createNewListing}
					>
						<div className={cn(isPending && "invisible", "snl-opt-desc text-[16px] font-medium text-neutral-700")}>Create a new listing</div>
						<div className={cn("absolute inset-0 flex items-center justify-center opacity-0", isPending && "opacity-100")}>
							<Loader className="bg-black" />
						</div>
						<div className="snl-opt-desc-svg flex items-center justify-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 32 32"
								aria-hidden="true"
								role="presentation"
								focusable="false"
								style={{
									display: "block",
									fill: "none",
									height: "16px",
									width: "16px",
									stroke: "currentcolor",
									strokeWidth: "4",
									overflow: "visible",
								}}
								width="32"
								height="32"
							>
								<path fill="none" d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28" stroke="#222222" strokeWidth="4px"></path>
							</svg>
						</div>
					</button>
				</div>

				<div className="snl-option flex items-center gap-3 py-6 border-b border-gray-300">
					<div className="snl-option-svg flex items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 32 32"
							aria-hidden="true"
							role="presentation"
							focusable="false"
							className="snl-option-real-svg block h-[26px] w-[26px] md:h-8 md:w-8 fill-current"
						>
							<path
								d="M25 5a4 4 0 0 1 4 4v17a5 5 0 0 1-5 5H12a5 5 0 0 1-5-5V10a5 5 0 0 1 5-5h13zm0 2H12a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V9a2 2 0 0 0-2-2zm-3-6v2H11a6 6 0 0 0-6 5.78V22H3V9a8 8 0 0 1 7.75-8H22z"
								fill="#222222"
							></path>
						</svg>
					</div>
					<button className="snl-option-type flex items-center justify-between py-1 w-full cursor-pointer">
						<div className="snl-opt-desc text-[16px] font-medium text-neutral-700">Duplicate an existing listing</div>
						<div className="snl-opt-desc-svg flex items-center justify-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 32 32"
								aria-hidden="true"
								role="presentation"
								focusable="false"
								style={{
									display: "block",
									fill: "none",
									height: "16px",
									width: "16px",
									stroke: "currentcolor",
									strokeWidth: "4",
									overflow: "visible",
								}}
								width="32"
								height="32"
							>
								<path fill="none" d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28" stroke="#222222" strokeWidth="4px"></path>
							</svg>
						</div>
					</button>
				</div>
			</div>
		</div>
	);
};
