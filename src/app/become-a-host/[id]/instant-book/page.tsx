"use client";

import { useEffect, useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";
import { Icons } from "./_components/icons";
import StepLayout from "../../_components/stepLayout";
import { usePathname, useRouter } from "next/navigation";
import { useStepNavigation } from "@/hooks/use-step-navigation";
import { api } from "@/lib/axios-instance";
import { toast } from "sonner";
import { useListing } from "@/hooks/useListings";

type BookingType = "REQUEST" | "INSTANT";

const bookOptions = [
	{
		value: "REQUEST" as BookingType,
		title: "Approve or decline requests",
		description: "Guests must ask if they can book or rent.",
		icon: Icons.request,
	},
	{
		value: "INSTANT" as BookingType,
		title: "Use instant Book",
		description: "Guests can book automatically.",
		icon: Icons.instant,
	},
];

const Page = () => {
	const pathname = usePathname();
	const listingId = pathname.split("/")[2];
	// const [isLoading, setIsLoading] = useState(false);
	// const [isDisabled, setIsDisabled] = useState(false);
	const navigations = useStepNavigation();
	const router = useRouter();
	const [formValid, setFormValid] = useState(false);

	const [selected, setSelected] = useState<BookingType | null>(null);

	const { data, isLoading, isError, error, refetch } = useListing(listingId);

	useEffect(() => {
		if (data?.bookingType) {
			setSelected(data.bookingType);
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

	// // Prefill existing bookingType
	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const res = await api.get(`/listings/${listingId}`);
	// 			if (res.data?.bookingType) {
	// 				setSelected(res.data.bookingType);
	// 			}
	// 		} catch (err) {
	// 			console.error("Error fetching bookingType", err);
	// 		}
	// 	};
	// 	fetchData();
	// }, [listingId]);

	// Autosave on change
	const handleChange = async (value: BookingType) => {
		setSelected(value);
		try {
			await api.patch(`/listings/${listingId}`, { bookingType: value });
		} catch (err) {
			console.error("Error saving bookingType", err);
		}
	};

	let disableAll: (v: boolean) => void = () => {};
	let setButtonLoading: (b: "next" | "back" | "save" | null) => void = () => {};

	const handleNext = async () => {
		if (!selected) {
			toast.error("Please select a booking type");
			return;
		}

		disableAll(true);
		setButtonLoading("next");

		try {
			await api.patch(`/listings/${listingId}`, {
				bookingType: selected,
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
			<div className="w-full min-h-svh py-20 h-full px-4 flex items-center justify-center">
				<div className="max-w-screen-sm w-full mx-auto pt-2">
					<h1 className="text-2xl md:text-3xl font-[550] py-4 animate-list-stagger">Decide how you&apos;ll confirm reservations</h1>
					<div className="mt-3 pb-4">
						<RadioGroup.Root value={selected ?? ""} onValueChange={(v) => handleChange(v as BookingType)} className="grid grid-cols-1 gap-3">
							{bookOptions.map((option, i) => (
								<RadioGroup.Item
									key={i}
									value={option.value}
									className={cn(
										"w-full cursor-pointer animate-list-stagger flex gap-3 justify-between items-start p-5 md:p-6 rounded-xl",
										selected === option.value ? "bg-white box-shadow" : "bg-[#F7F7F7] text-black/70"
									)}
									style={{ animationDelay: `${500 + i * 20}ms` }}
								>
									<div className="w-full max-w-sm">
										<div className="text-left font-semibold text-base pb-1">{option.title}</div>
										<p className="text-sm text-left">{option.description}</p>
									</div>
									<div className="flex items-center justify-center">{option.icon()}</div>
								</RadioGroup.Item>
							))}
						</RadioGroup.Root>
					</div>
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

// const bookOptions = [
// 	{ title: "Approve or decline requests", description: "Guests must ask if they can book  or rent.", icon: Icons.request },
// 	{ title: "Use instant Book", description: "Guests can book automatically.", icon: Icons.instant },
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
// 			<div className="w-full min-h-svh py-20 h-full px-4 flex items-center justify-center">
// 				<div className="max-w-screen-sm w-full mx-auto pt-2">
// 					<h1 className="text-2xl md:text-3xl font-[550] py-4 animate-list-stagger">Decide how you&apos;ll confirm reservations</h1>
// 					<div className="mt-3 pb-4">
// 						<RadioGroup.Root className="grid grid-cols-1 gap-3" onValueChange={(v) => setSelected(v)}>
// 							{bookOptions.map((option, i) => (
// 								<RadioGroup.Item
// 									key={i}
// 									value={option.title}
// 									className={cn(
// 										"w-full cursor-pointer  animate-list-stagger flex gap-3 justify-between items-start p-5 md:p-6 rounded-xl",
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
