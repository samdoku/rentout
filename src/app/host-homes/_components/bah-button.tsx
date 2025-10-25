"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { api } from "@/lib/axios-instance";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { toast } from "sonner";

interface BahButtonProps {
	isHost: boolean;
	isLoggedIn: boolean;
	className?: string;
}

export const BahButton = ({ isHost, isLoggedIn, className }: BahButtonProps) => {
	const router = useRouter();

	const [isPending, startTransition] = useTransition();
	// const [isLoading, setIsLoading] = React.useState(false);

	const handleClick = () => {
		startTransition(async () => {
			try {
				if (!isLoggedIn) {
					// not logged in → sign-in with redirect
					router.push("/sign-in?redirect_url=/host-homes");
					return;
				}

				if (isHost) {
					// already a host → go straight to host setup
					router.push("/become-a-host");
					return;
				}

				// not host yet → create host record then go
				await api.post("/host", {});
				router.push("/become-a-host");
			} catch (e) {
				console.error(e);
				toast.error("Something went wrong. Please try again.");
			}
		});
	};

	return (
		<Button
			onClick={handleClick}
			disabled={isPending}
			className={cn("h-9 relative rounded-full px-3 inline-flex items-center bg-black text-white text-sm hover:bg-black/90", className)}
		>
			<div className={cn(isPending && "flex invisible")}>Become a host</div>
			<div className={cn("absolute inset-0 flex items-center justify-center", !isPending && "opacity-0")}>
				<Loader className="bg-white" />
			</div>
		</Button>
	);
};
