"use client";

import React, { useEffect, useRef, useState } from "react";
import StepLayout from "../../_components/stepLayout";
import { useStepNavigation } from "@/hooks/use-step-navigation";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { api } from "@/lib/axios-instance";
import { toast } from "sonner";
import debounce from "lodash.debounce";
import { useListing } from "@/hooks/useListings";

type FormData = {
	description: string;
};

const MAX_LENGTH = 500;

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
		defaultValues: { description: "" },
	});

	const description = watch("description");
	const lastSavedDescription = useRef<string>("");
	const debouncedSave = useRef<ReturnType<typeof debounce> | null>(null);

	// ✅ Fetch listing using react-query
	const { data, isLoading, isError, error, refetch } = useListing(listingId);

	// ✅ Prefill form when data is loaded
	useEffect(() => {
		if (data?.description) {
			reset({ description: data.description });
			lastSavedDescription.current = data.description;
		}
	}, [data, reset]);

	// ✅ Validate form
	useEffect(() => {
		setFormValid(Boolean(description?.trim()));
	}, [description]);

	// ✅ Debounced autosave
	useEffect(() => {
		if (!listingId || description === undefined) return;

		if (!debouncedSave.current) {
			debouncedSave.current = debounce(async (newDescription: string) => {
				if (!newDescription.trim()) return;
				if (newDescription === lastSavedDescription.current) return;

				try {
					setIsSaving(true);
					await api.patch(`/listings/${listingId}`, {
						description: newDescription,
						currentStep: navigations.current,
					});
					lastSavedDescription.current = newDescription;
				} catch (err) {
					console.error("[AUTOSAVE] Failed", err);
				} finally {
					setIsSaving(false);
				}
			}, 800);
		}

		debouncedSave.current.cancel();
		debouncedSave.current(description);

		return () => debouncedSave.current?.cancel();
	}, [description, listingId, navigations]);

	let disableAll: (v: boolean) => void = () => {};
	let setButtonLoading: (b: "next" | "back" | "save" | null) => void = () => {};

	const onSubmit = async (data: FormData) => {
		disableAll(true);
		setButtonLoading("next");

		try {
			// cancel pending autosave to avoid double-save
			debouncedSave.current?.cancel();

			if (data.description && data.description !== lastSavedDescription.current) {
				await api.patch(`/listings/${listingId}`, {
					description: data.description,
					currentStep: navigations.current,
				});
				lastSavedDescription.current = data.description;
			}

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
							<h1 className="font-semibold text-2xl md:text-3xl">Create your description</h1>
							<p className="text-base font-medium text-black/70">Share what makes your place special.</p>
						</div>

						<div className="w-full mt-2 animate-list-stagger delay-200">
							<textarea
								{...register("description", {
									required: "Description is required",
									maxLength: {
										value: MAX_LENGTH,
										message: `Max ${MAX_LENGTH} characters`,
									},
								})}
								maxLength={MAX_LENGTH}
								className={cn(
									"outline-none border font-medium text-sm md:text-base rounded-xl w-full min-h-60 p-3 md:p-4 transition",
									errors.description
										? "border-red-500 bg-red-50 focus-visible:shadow-[rgb(220,38,38)_0px_0px_0px_2px]"
										: "border-black bg-transparent focus-visible:shadow-[rgb(34,34,34)_0px_0px_0px_2px]"
								)}
								placeholder="Describe your place..."
							/>
							{errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
						</div>

						<div
							className={cn(
								"animate-list-stagger delay-500 mt-1",
								errors.description ? "text-red-600" : "text-black/70"
							)}
						>
							{description?.length || 0}/{MAX_LENGTH}
						</div>

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
// import { useStepNavigation } from "@/hooks/use-step-navigation";
// import { usePathname, useRouter } from "next/navigation";

// const Page = () => {
// 	const pathname = usePathname();
// 	const [isLoading, setIsLoading] = useState(false);
// 	const [isDisabled, setIsDisabled] = useState(false);
// 	const navigations = useStepNavigation();
// 	const router = useRouter();

// 	const handleNext = async () => {
// 		setIsLoading(true);
// 		setIsDisabled(true);

// 		try {
// 			if (navigations.next) {
// 				router.push(`/become-a-host/${pathname.split("/")[2]}/${navigations.next}`);
// 			}
// 		} catch (err) {
// 			console.log(err);
// 		} finally {
// 			// optional: only reset loading if navigation failed
// 		}
// 	};

// 	return (
// 		<StepLayout onNext={handleNext} isNextLoading={isLoading} isNextDisabled={isDisabled}>
// 			<div className=" px-4 max-w-2xl mx-auto w-full min-h-svh py-20 h-full md:flex items-center justify-center">
// 				<div className="w-full py-6">
// 					<div className="w-full pb-3">
// 						<h1 className="font-semibold text-2xl md:text-3xl">Create your description</h1>
// 						<p className="text-base font-medium text-black/70 ">Share what makes your place special.</p>
// 					</div>
// 					<div className="w-full mt-2 animate-list-stagger delay-200">
// 						<textarea
// 							className="bg-transparent outline-none focus-visible:shadow-[rgb(34,34,34)_0px_0px_0px_2px] focus-visible:border-none border font-medium text-sm md:text-base border-black rounded-xl w-full min-h-60 p-3 md:p-4"
// 							autoCorrect="false"
// 						></textarea>
// 					</div>
// 					<div className="animate-list-stagger delay-500">0/500</div>
// 				</div>
// 			</div>
// 		</StepLayout>
// 	);
// };

// export default Page;
