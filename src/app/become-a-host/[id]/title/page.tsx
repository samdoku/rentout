"use client";

import React, { useEffect, useState, useRef } from "react";
import StepLayout from "../../_components/stepLayout";
import { usePathname, useRouter } from "next/navigation";
import { useStepNavigation } from "@/hooks/use-step-navigation";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { api } from "@/lib/axios-instance";
import { toast } from "sonner";
import debounce from "lodash.debounce";
import { useListing } from "@/hooks/useListings";

type FormData = {
	title: string;
};

const MAX_LENGTH = 32;

const Page = () => {
	const pathname = usePathname();
	const listingId = pathname.split("/")[2];
	const router = useRouter();
	const navigations = useStepNavigation();

	const [isSaving, setIsSaving] = useState(false);
	const [formValid, setFormValid] = useState(false);

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: { title: "" },
	});

	const title = watch("title");
	const lastSavedTitle = useRef<string>(""); // Track last saved value
	const debouncedSave = useRef<ReturnType<typeof debounce> | null>(null);

	const { data, isLoading, isError, error, refetch } = useListing(listingId);

	// Prefill form
	useEffect(() => {
		if (data?.title) {
			reset({ title: data.title });
			lastSavedTitle.current = data.title;
		}
	}, [data, reset]);

	// Form validation
	useEffect(() => {
		setFormValid(Boolean(title?.trim()));
	}, [title]);

	// Debounced Autosave
	useEffect(() => {
		if (!listingId || title === undefined) return;

		// Initialize debounced save function once
		if (!debouncedSave.current) {
			debouncedSave.current = debounce(async (newTitle: string) => {
				if (!newTitle.trim()) return;
				if (newTitle === lastSavedTitle.current) return;

				try {
					setIsSaving(true);
					await api.patch(`/listings/${listingId}`, {
						title: newTitle,
						currentStep: navigations.current,
					});
					lastSavedTitle.current = newTitle;
				} catch (err) {
					console.error("[AUTOSAVE] Failed", err);
				} finally {
					setIsSaving(false);
				}
			}, 800);
		}

		// Cancel any running debounce and schedule a new one
		debouncedSave.current.cancel();
		debouncedSave.current(title);

		return () => debouncedSave.current?.cancel();
	}, [title, listingId, navigations]);

	let disableAll: (v: boolean) => void = () => {};
	let setButtonLoading: (b: "next" | "back" | "save" | null) => void = () => {};

	const onSubmit = async (data: FormData) => {
		disableAll(true);
		setButtonLoading("next");

		try {
			// cancel pending autosave to avoid double-save
			debouncedSave.current?.cancel();

			// Save only if changed since last save
			if (data.title && data.title !== lastSavedTitle.current) {
				await api.patch(`/listings/${listingId}`, {
					title: data.title,
					currentStep: navigations.current,
				});
				lastSavedTitle.current = data.title;
			}

			if (navigations.next) {
				router.push(`/become-a-host/${listingId}/${navigations.next}`);
			}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			console.error(err);
			toast.error(err?.response?.data?.error || err.message || "Oops, something went wrong");
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
						{isLoading ? "Retrying..." : "Retry"}
					</button>
				</div>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<StepLayout
				onNext={handleSubmit(onSubmit)}
				onMount={(setDisabled, setLoadingButton) => {
					disableAll = setDisabled;
					setButtonLoading = setLoadingButton;
				}}
				isPrefetching={isLoading}
				canProceed={formValid}
			>
				<div className="px-4 max-w-2xl mx-auto w-full min-h-svh py-20 h-full md:flex items-center justify-center">
					<div className="w-full py-6">
						<div className="w-full pb-3 animate-list-stagger">
							<h1 className="font-semibold text-2xl md:text-3xl">Now, let&apos;s give your place a title</h1>
							<p className="text-base font-medium text-black/70">Short titles work best. Have fun with it—you can always change it later.</p>
						</div>

						<div className="w-full mt-2 animate-list-stagger delay-200">
							<textarea
								{...register("title", {
									required: "Title is required",
									maxLength: {
										value: MAX_LENGTH,
										message: `Max ${MAX_LENGTH} characters`,
									},
								})}
								maxLength={MAX_LENGTH}
								className={cn(
									"outline-none border font-semibold text-base md:text-xl rounded-xl w-full min-h-44 p-3 md:p-4 transition",
									errors.title
										? "border-red-500 bg-red-50 focus-visible:shadow-[rgb(220,38,38)_0px_0px_0px_2px]"
										: "border-black bg-transparent focus-visible:shadow-[rgb(34,34,34)_0px_0px_0px_2px]"
								)}
							/>
							{errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
						</div>

						<div className={cn("animate-list-stagger delay-500 mt-1", errors.title ? "text-red-600" : "text-black/70")}>
							{title?.length || 0}/{MAX_LENGTH}
						</div>

						{/* Saving indicator */}
						{isSaving && <div className="text-sm text-gray-500 mt-2 animate-pulse">Saving...</div>}
					</div>
				</div>
			</StepLayout>
		</form>
	);
};

export default Page;




// "use client";

// import React, { useState } from "react";
// import StepLayout from "../../_components/stepLayout";
// import { usePathname, useRouter } from "next/navigation";
// import { useStepNavigation } from "@/hooks/use-step-navigation";
// import { api } from "@/lib/axios-instance";
// import { toast } from "sonner";

// const Page = () => {
// 	const pathname = usePathname();
// 	const listingId = pathname.split("/")[2];
// 	const [isLoading, setIsLoading] = useState(false);
// 	const navigations = useStepNavigation();
// 	const router = useRouter();

// 	const [title, setTitle] = useState("");

// 	const handleNext = async () => {
// 		if (!title.trim()) {
// 			toast.error("Please enter a title for your place");
// 			return;
// 		  }

// 		setIsLoading(true);
// 		try {
// 			await api.patch(`/listings/${listingId}`, {
// 				title,
// 							currentStep: navigations.next,
// 						});

// 			if (navigations.next) {
// 				router.push(`/become-a-host/${listingId}/${navigations.next}`);
// 			}
// 		// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 		} catch (err: any) {
// 			console.error(err);
//       toast.error(err?.response?.data?.error || err.message || "Something went wrong");
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};

// 	return (
// 		<StepLayout onNext={handleNext} isNextLoading={isLoading}>
// 			<div className=" px-4 max-w-2xl mx-auto w-full min-h-svh py-20 h-full md:flex items-center justify-center">
// 				<div className="w-full py-6">
// 					<div className="w-full pb-3 animate-list-stagger">
// 						<h1 className="font-semibold text-2xl md:text-3xl">Now, let&apos;s give your place a title</h1>
// 						<p className="text-base font-medium text-black/70 ">Short titles work best. Have fun with it--you can always change it later.</p>
// 					</div>
// 					<div className="w-full mt-2 animate-list-stagger delay-200">
// 						<textarea onChange={(e) => setTitle(e.target.value)} className="bg-transparent outline-none focus-visible:shadow-[rgb(34,34,34)_0px_0px_0px_2px] focus-visible:border-none border font-semibold text-base md:text-xl border-black rounded-xl w-full min-h-44 p-3 md:p-4"></textarea>
// 					</div>
// 					<div className=" animate-list-stagger delay-500">0/32</div>
// 				</div>
// 			</div>
// 		</StepLayout>
// 	);
// };

// export default Page;
