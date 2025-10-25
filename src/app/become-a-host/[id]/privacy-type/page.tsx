"use client";

import React, { useEffect, useState, useCallback } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";
import { Icons } from "./_components/icons";
import StepLayout from "../../_components/stepLayout";
import { usePathname, useRouter } from "next/navigation";
import { useStepNavigation } from "@/hooks/use-step-navigation";
import { api } from "@/lib/axios-instance";
import { toast } from "sonner";
import debounce from "lodash.debounce";
import { useListing } from "@/hooks/useListings";

const privacyOptions = [
	{
		value: "EntirePlace",
		label: "An entire place",
		description: "Guests have the whole place to themselves.",
		icon: Icons.house,
	},
	{
		value: "Room",
		label: "A room",
		description: "Guests have their own room in a home, plus access to shared spaces.",
		icon: Icons.room,
	},
	{
		value: "SharedRoom",
		label: "A shared room",
		description: "Guests sleep in a room or common area that may be shared with you or others.",
		icon: Icons.shared,
	},
] as const;

const Page = () => {
	const [selected, setSelected] = useState<string>("");
	// const [isLoading, setIsLoading] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [formValid, setFormValid] = useState(false);

	const pathname = usePathname();
	const router = useRouter();
	const navigations = useStepNavigation();
	const listingId = pathname.split("/")[2];

	const { data, isLoading, isError, error, refetch } = useListing(listingId)

	useEffect(() => {
		if (data?.privacyType) {
			setSelected(data.privacyType);
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
	//  * Prefill: fetch listing data
	//  */
	// useEffect(() => {
	// 	const fetchListing = async () => {
	// 		try {
	// 			const { data } = await api.get(`/listings/${listingId}`);
	// 			if (data?.privacyType) {
	// 				setSelected(data.privacyType);
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
					privacyType: value,
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

	useEffect(() => {
		if (selected) {
			debouncedSave(selected, navigations.current ?? "privacy-type");
		}

		return () => {
			debouncedSave.cancel(); // cleanup on unmount or re-run
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected, debouncedSave, navigations.current]);

	let disableAll: (v: boolean) => void = () => {};
	let setButtonLoading: (b: "next" | "back" | "save" | null) => void = () => {};

	/**
	 * Handle "Next" button
	 */
	const handleNext = async () => {
		if (!selected) {
			toast.error("Please select a privacy type");
			return;
		}

		disableAll(true);
		setButtonLoading("next");

		try {
			await api.patch(`/listings/${listingId}`, {
				privacyType: selected,
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
					<h1 className="text-2xl md:text-3xl font-[550] py-4 animate-list-stagger">Which type of place will guests have?</h1>

					<div className="mt-3 pb-6">
						<RadioGroup.Root className="grid grid-cols-1 gap-3" onValueChange={(v) => setSelected(v)} value={selected}>
							{privacyOptions.map((option, i) => (
								<RadioGroup.Item
									key={option.value}
									value={option.value}
									className={cn(
										"w-full cursor-pointer flex gap-3 justify-between items-start p-5 md:p-6 rounded-xl animate-list-stagger",
										selected === option.value ? "bg-white box-shadow" : "bg-[#F7F7F7] text-black/70"
									)}
									style={{ animationDelay: `${500 + i * 20}ms` }}
								>
									<div className="w-full max-w-sm">
										<div className="text-left font-semibold text-base pb-1">{option.label}</div>
										<p className="text-sm text-left">{option.description}</p>
									</div>
									<div className="flex items-center justify-center">{option.icon()}</div>
								</RadioGroup.Item>
							))}
						</RadioGroup.Root>
					</div>

					{/* ✅ Small saving indicator */}
					{isSaving && <p className="text-xs text-gray-500">Saving…</p>}
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
// import { Icons } from "./_components/icons";
// import StepLayout from "../../_components/stepLayout";
// import { usePathname, useRouter } from "next/navigation";
// import { useStepNavigation } from "@/hooks/use-step-navigation";

// const privacyOptions = [
// 	{ title: "An entire place", description: "Guests have the whole place to themselves.", icon: Icons.house },
// 	{ title: "A room", description: "Guests have their own room in a home, plus access to shared spaces.", icon: Icons.room },
// 	{ title: "A shared room", description: "Guests sleep in a room or common area that may be shared with you or others.", icon: Icons.shared },
// ];

// const Page = () => {
// 	const [selected, setSelected] = useState("");

// 	const pathname = usePathname();
// 	const [isLoading, setIsLoading] = useState(false);
// 	const [isDisabled, setIsDisabled] = useState(false);
// 	const navigations = useStepNavigation();
// 	const router = useRouter();

// 	const handleNext = async () => {
// 		setIsLoading(true);
// 		setIsDisabled(true);

// 		try {
// 			console.log("inside", isLoading);

// 			if (navigations.next) {
// 				router.push(`/become-a-host/${pathname.split("/")[2]}/${navigations.next}`);
// 			}
// 		} catch (err) {
// 			console.log(err);
// 		} finally {
// 			// optional: only reset loading if navigation failed
// 		}
// 	};

// 	console.log(selected);

// 	return (
// 		<StepLayout onNext={handleNext} isNextLoading={isLoading} isNextDisabled={isDisabled}>
// 			<div className="w-full min-h-svh py-20 h-full px-4">
// 				<div className="max-w-screen-sm w-full mx-auto pt-2">
// 					<h1 className="text-2xl md:text-3xl font-[550] py-4 animate-list-stagger">Which type of place will guests have?</h1>
// 					<div className="mt-3 pb-6">
// 						<RadioGroup.Root className="grid grid-cols-1 gap-3" onValueChange={(v) => setSelected(v)}>
// 							{privacyOptions.map((option, i) => (
// 								<RadioGroup.Item
// 									key={i}
// 									value={option.title}
// 									className={cn(
// 										"w-full cursor-pointer flex gap-3 justify-between items-start p-5 md:p-6 rounded-xl animate-list-stagger",
// 										selected === option.title ? "bg-white box-shadow" : "bg-[#F7F7F7] text-black/70"
// 									)}
// 									style={{ animationDelay: `${500 + i * 20}ms` }}
// 								>
// 									<div className="w-full max-w-sm">
// 										<div className="text-left font-semibold text-base pb-1">{option.title}</div>
// 										<p className="text-sm  text-left">{option.description}</p>
// 									</div>
// 									<div className="flex items-center justify-center">{option.icon()}</div>
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
