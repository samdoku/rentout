"use client";

import React, { useEffect, useState, useCallback } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";
import { properties } from "@/lib/constants";
import StepLayout from "../../_components/stepLayout";
import { useStepNavigation } from "@/hooks/use-step-navigation";
import { usePathname, useRouter } from "next/navigation";
import { api } from "@/lib/axios-instance";
import { toast } from "sonner";
import debounce from "lodash.debounce";
import { useQuery } from "@tanstack/react-query";
// import { AlertCircle } from "lucide-react";

const Page = () => {
	const [selected, setSelected] = useState<string>("");
	// const [isLoading, setIsLoading] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [formValid, setFormValid] = useState(false);

	const pathname = usePathname();
	const router = useRouter();
	const navigations = useStepNavigation();
	const listingId = pathname.split("/")[2];

	const { data, isLoading, isError, error, refetch } = useQuery({
		queryKey: ["listing-structure", listingId],
		queryFn: async () => {
			const res = await api.get(`/listings/${listingId}`);
			return res.data;
		},
		enabled: !!listingId,
	});

	console.log(data);
	
	useEffect(() => {
		if (data?.propertyType) {
			setSelected(data.propertyType);
		}
	}, [data]);

	useEffect(() => {
		if (isError) {
			console.error("Failed to fetch listing", error);
		}
	}, [isError, error]);

	useEffect(() => {
		setFormValid(!!selected);
	}, [selected]);

	// /**
	//  * ✅ Prefill: fetch listing data when component mounts
	//  */
	// useEffect(() => {
	// 	const fetchListing = async () => {
	// 		try {
	// 			const { data } = await api.get(`/listings/${listingId}`);
	// 			if (data?.propertyType) {
	// 				setSelected(data.propertyType);
	// 			}
	// 		} catch (err) {
	// 			console.error("Failed to fetch listing", err);
	// 		}
	// 	};
	// 	fetchListing();
	// }, [listingId]);

	/**
	 * ✅ Debounced autosave with dynamic currentStep
	 */
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedSave = useCallback(
		debounce(async (value: string, currentStep: string) => {
			if (!value) return;
			try {
				setIsSaving(true);
				await api.patch(`/listings/${listingId}`, {
					propertyType: value,
					currentStep,
				});
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (err: any) {
				console.error(err);
				toast.error(err?.response?.data?.error || "Autosave failed");
			} finally {
				setIsSaving(false);
			}
		}, 800),
		[listingId]
	);

	/**
	 * Trigger debounced save whenever selection changes
	 */
	useEffect(() => {
		if (selected) {
			debouncedSave(selected, navigations.current ?? "structure");
		}
		return () => {
			debouncedSave.cancel();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected, debouncedSave, navigations.current]);

	let disableAll: (v: boolean) => void = () => {};
	let setButtonLoading: (b: "next" | "back" | "save" | null) => void = () => {};


	const handleNext = async () => {
		if (!selected) {
			toast.error("Please select a property type");
			return;
		}

		disableAll(true);
		setButtonLoading("next");

		try {
			await api.patch(`/listings/${listingId}`, {
				propertyType: selected,
				currentStep: navigations.next,
			});

			if (navigations.next) {
				router.push(`/become-a-host/${listingId}/${navigations.next}`);
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			console.error(err);
			toast.error("Oops, something went wrong");
			setButtonLoading(null);
			disableAll(false);
		}
	};

	if (isError) {
		return (
			<div className="w-full min-h-svh h-full flex items-center">
				<div className="p-4 bg-red-50 text-red-700 rounded-xl text-center">
					<p className="text-sm font-medium">Failed to load listing.</p>
					<p className="text-xs">{error?.message ?? "Please try again."}</p>
					<button
						onClick={() => refetch()}
						className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
						disabled={isLoading}
					>
						{/* <AlertCircle className=""/> */}
						{isLoading ? "Retrying..." : "Retry"}
					</button>
				</div>
			</div>
		);
	}

	return (
		<StepLayout
			onNext={handleNext}
			onMount={(setDisabled, setLoadingButton) => {
				disableAll = setDisabled;
				setButtonLoading = setLoadingButton;
			}}
			isPrefetching={isLoading}
			canProceed={formValid}
		>
			<div className="w-full min-h-svh py-20 h-full px-4">
				<div className="max-w-screen-sm w-full mx-auto pt-2">
					<>
						<h1 className="text-2xl md:text-3xl font-semibold py-4 animate-list-stagger">Which of these best describe your place?</h1>

						<div className="mt-3 pb-4">
							<RadioGroup.Root
								className="grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] gap-4"
								onValueChange={(v) => setSelected(v)}
								value={selected}
							>
								{properties.map(({ value, icon, label }, i) => (
									<RadioGroup.Item
										key={value}
										value={value}
										className={cn(
											"w-full cursor-pointer animate-list-stagger flex flex-col justify-between items-start gap-1 p-4 rounded-xl",
											selected === value ? "bg-white box-shadow" : "bg-[#F7F7F7] text-black/70"
										)}
										style={{ animationDelay: `${600 + i * 20}ms` }}
									>
										<div>{icon}</div>
										<div className="text-left font-[550] text-sm whitespace-normal">{label}</div>
									</RadioGroup.Item>
								))}
							</RadioGroup.Root>
						</div>

						{/* ✅ Small saving indicator */}
						{isSaving && <p className="text-xs text-gray-500">Saving…</p>}
					</>
				</div>
			</div>
		</StepLayout>
	);
};

export default Page;

// "use client";

// import React, { useState } from "react";
// import * as RadioGroup from "@radix-ui/react-radio-group";
// import { cn } from "@/lib/utils";
// import { properties } from "@/lib/constants";
// import StepLayout from "../../_components/stepLayout";
// import { useStepNavigation } from "@/hooks/use-step-navigation";
// import { usePathname, useRouter } from "next/navigation";
// import { api } from "@/lib/axios-instance";
// import { toast } from "sonner";

// const Page = () => {
// 	const [selected, setSelected] = useState("");

// 	const pathname = usePathname();
// 	const [isLoading, setIsLoading] = useState(false);
// 	const navigations = useStepNavigation();
// 	const router = useRouter();

// 	const listingId = pathname.split("/")[2];

// 	const handleNext = async () => {
// 		if (!selected) {
// 			toast.error("Please select a property type");
// 			return;
// 		}

// 		console.log("data in structure page", {
// 			propertyType: selected,
// 			currentStep: navigations.next,
// 		});

// 		setIsLoading(true);

// 		try {
// 			await api.patch(`/listings/${listingId}`, {
// 				propertyType: selected,
// 				currentStep: navigations.next,
// 			});

// 			if (navigations.next) {
// 				router.push(`/become-a-host/${listingId}/${navigations.next}`);
// 			}
// 			// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 		} catch (err: any) {
// 			console.error(err);
// 			toast.error(err?.response?.data?.error || err.message || "Something went wrong");
// 		} finally {
// 			// optional: only reset loading if navigation failed
// 			setIsLoading(false);
// 		}
// 	};

// 	console.log(selected);

// 	return (
// 		<StepLayout onNext={handleNext} isNextLoading={isLoading}>
// 			<div className="w-full min-h-svh py-20 h-full px-4">
// 				<div className="max-w-screen-sm w-full mx-auto pt-2">
// 					<h1 className="text-2xl md:text-3xl font-semibold py-4 animate-list-stagger">Which of these best describe your place?</h1>
// 					<div className="mt-3 pb-4">
// 						<RadioGroup.Root className="grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] gap-4" onValueChange={(v) => setSelected(v)}>
// 							{properties.map(({ value, icon, label }, i) => (
// 								<RadioGroup.Item
// 									key={i}
// 									value={value}
// 									className={cn(
// 										"w-full cursor-pointer animate-list-stagger flex flex-col justify-between items-start gap-1 p-4 rounded-xl",
// 										selected === value ? "bg-white box-shadow" : "bg-[#F7F7F7] text-black/70"
// 									)}
// 									style={{ animationDelay: `${600 + i * 20}ms` }}
// 								>
// 									<div>{icon}</div>
// 									<div className="text-left font-[550] text-sm whitespace-normal">{label}</div>
// 								</RadioGroup.Item>
// 							))}
// 						</RadioGroup.Root>
// 					</div>
// 				</div>
// 			</div>
// 		</StepLayout>
// 	);
// };

// export default Page;
