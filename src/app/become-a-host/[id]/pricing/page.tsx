"use client";

import React, { useEffect, useRef, useState } from "react";
import StepLayout from "../../_components/stepLayout";
import { usePathname, useRouter } from "next/navigation";
import { useStepNavigation } from "@/hooks/use-step-navigation";
import { Button } from "@/components/ui/button";
import debounce from "lodash.debounce";
import { api } from "@/lib/axios-instance";
import { toast } from "sonner";
import { useListing } from "@/hooks/useListings";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Page = () => {
	const pathname = usePathname();
	const listingId = pathname.split("/")[2];
	const router = useRouter();
	const { current, next } = useStepNavigation();

	const [price, setPrice] = useState<string>("0");
	const [pricingType, setPricingType] = useState<string>("DAY");
	const lastSavedPrice = useRef<string>("");
	const lastSavedType = useRef<string>("DAY");
	const debouncedSave = useRef<ReturnType<typeof debounce> | null>(null);

	const [formValid, setFormValid] = useState(false);
	// const [isSaving, setIsSaving] = useState(false);

	let disableAll: (v: boolean) => void = () => {};
	let setButtonLoading: (b: "next" | "back" | "save" | null) => void = () => {};

	const { data, isLoading, isError, refetch } = useListing(listingId);

	console.log(data);

	useEffect(() => {
		if (data?.price) {
			setPrice(String(data.price));
			lastSavedPrice.current = String(data.price);
		}
		if (data?.pricingType) {
			setPricingType(data.pricingType);
			lastSavedType.current = data.pricingType;
		}
	}, [data]);

	useEffect(() => {
		setFormValid(Boolean(price && !isNaN(Number(price)) && Number(price) > 0));
	}, [price]);

	useEffect(() => {
		if (!listingId || price === undefined || !pricingType) return;

		if (!debouncedSave.current) {
			debouncedSave.current = debounce(async (newPrice: string, newType: string) => {
				const sameAsBefore = newPrice === lastSavedPrice.current && newType === lastSavedType.current;
				if (!newPrice.trim() || sameAsBefore) return;
				try {
					// setIsSaving(true);
					await api.patch(`/listings/${listingId}`, {
						price: Number(newPrice),
						pricingType: newType,
						currentStep: current,
					});
					lastSavedPrice.current = newPrice;
					lastSavedType.current = newType;
				} catch (err) {
					console.error("[AUTOSAVE] Failed", err);
				} finally {
					// setIsSaving(false);
				}
			}, 800);
		}

		debouncedSave.current.cancel();
		debouncedSave.current(price, pricingType);

		return () => debouncedSave.current?.cancel();
	}, [price, pricingType, listingId, current]);

	const handleNext = async () => {
		disableAll(true);
		setButtonLoading("next");

		try {
			debouncedSave.current?.cancel();

			const changed = price !== lastSavedPrice.current || pricingType !== lastSavedType.current;

			if (changed) {
				await api.patch(`/listings/${listingId}`, {
					price: Number(price),
					pricingType,
					currentStep: current,
				});
				lastSavedPrice.current = price;
				lastSavedType.current = pricingType;
			}

			if (next) {
				router.push(`/become-a-host/${listingId}/${next}`);
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setButtonLoading(null);
			disableAll(false);
			console.error(err);
			toast.error("Oops, something went wrong");
		}
	};

	const inputRef = useRef<HTMLInputElement>(null);
	const [showButton, setShowButton] = useState(true);

	const handleButtonClick = () => {
		setShowButton(false);
		inputRef.current?.focus();
	};

	const handleFocus = () => setShowButton(false);
	const handleBlur = () => setShowButton(true);

	const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			if (formValid) {
				await handleNext();
			}
		}
	};

	if (isError) {
		return (
			<div className="w-full min-h-svh h-full flex items-center justify-center bg-white">
				<div className="p-4 bg-red-50 text-red-700 rounded-xl text-center">
					<p className="text-base font-semibold">{"Oops, something went wrong"}</p>
					<button
						onClick={() => refetch()}
						className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
						disabled={isLoading}
					>
						{isLoading ? "Retrying..." : "Please try again"}
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
			<div className="h-[100vh] py-20 px-4 min-h-svh">
				<div className="max-w-2xl mx-auto w-full h-full">
					<div className="w-full h-full my-auto max-h-[300px] flex flex-col justify-between">
						<div>
							<h1 className="font-semibold text-2xl md:text-3xl">Now, set a base price</h1>
							<p className="text-base font-[550] text-black/60">Tip: ₵40. You’ll set a pricing type next.</p>
						</div>

						{/* Price input */}
						<div className="flex items-center justify-center">
							<div className="inline-block relative">
								<div className="font-bold text-7xl md:text-9xl relative">
									<div className="flex items-center flex-nowrap text-inherit">
										<span>₵</span>
										<span className="invisible">{price || "0"}</span>
									</div>
									<input
										type="text"
										className="w-full bg-transparent h-full top-0 text-right absolute border-none outline-none"
										value={price}
										onChange={(e) => setPrice(e.target.value)}
										ref={inputRef}
										onBlur={handleBlur}
										onFocus={handleFocus}
										onKeyDown={handleKeyDown}
									/>
								</div>

								{showButton && (
									<div className="absolute bottom-0 -right-8">
										<Button variant="outline" className="rounded-full p-0 aspect-square h-8 w-8" onClick={handleButtonClick}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 32 32"
												aria-label="Edit"
												role="img"
												focusable="false"
												style={{ display: "block", height: "16px", width: "16px" }}
											>
												<path d="m18.23 7.35 6.42 6.42L10 28.4c-.38.38-.88.59-1.41.59H3v-5.59c0-.52.21-1.04.59-1.41L18.23 7.35zm9.98-3.56a4.54 4.54 0 0 0-6.42 0l-1.44 1.44 6.42 6.42 1.44-1.44a4.54 4.54 0 0 0 0-6.42z"></path>
											</svg>
										</Button>
									</div>
								)}
							</div>
						</div>

						<div className="mt-6">
							<label className="font-semibold text-xl block mb-2">Pricing type</label>
							<Select value={pricingType} onValueChange={setPricingType}>
								<SelectTrigger className="w-full font-semibold h-10 focus:ring-2 shadow-none">
									<SelectValue placeholder="Select pricing type" />
								</SelectTrigger>
								<SelectContent className="font-semibold">
									<SelectItem value="DAY">Per day</SelectItem>
									<SelectItem value="WEEK">Per week</SelectItem>
									<SelectItem value="MONTH">Per month</SelectItem>
									<SelectItem value="YEAR">Per year</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{/* Saving state */}
						{/* {isSaving && <div className="text-sm text-gray-500 mt-2 animate-pulse text-center">Saving...</div>} */}
					</div>
				</div>
			</div>
		</StepLayout>
	);
};

export default Page;
