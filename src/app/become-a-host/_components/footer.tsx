// "use client";

// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import { usePathname, useRouter } from "next/navigation";
// import React from "react";

// const startPages = ["overview", "about-your-place", "stand-out", "finish-setup"];

// const steps = [
// 	["about-your-place", "structure", "privacy-type", "location", "floor-plan", "bathrooms", "occupancy"], // Step 0
// 	["stand-out", "amenities", "photos", "title", "description"], // Step 1
// 	["finish-setup", "instant-book", "pricing", "review", "publish"], // Step 2
// ];

// export const Footer = () => {
// 	const pathname = usePathname();
// 	const router = useRouter();
// 	const pathSegments = pathname.split("/").filter(Boolean);
// 	console.log(pathSegments);
// 	const id = pathSegments[1];
// 	const currentSlug = pathSegments[pathSegments.length - 1];
// 	console.log(currentSlug);

// 	console.log(pathname);

// 	let currentStep = 0;
// 	let pageIndex = 0;

// 	steps.forEach((step, i) => {
// 		const idx = step.indexOf(currentSlug);
// 		// console.log({ idx });

// 		if (idx !== -1) {
// 			currentStep = i;
// 			pageIndex = idx;
// 		}
// 	});

// 	console.log("currentStep", currentStep);
// 	console.log("pageIndex", pageIndex);

// 	// [0, 0, 0]
// 	const progressValues = steps.map((step, i) => {
// 		if (currentSlug === "overview") {
// 			return 0;
// 		}

// 		// For previous steps, progress is full
// 		if (i < currentStep) return 100;
// 		// For current step:
// 		if (i === currentStep) {
// 			// If on the step start page, progress is 0 (step not started)
// 			if (currentSlug === startPages[i]) return 0;
// 			// Otherwise, calculate progress based on page position in step
// 			const pageIndex = step.indexOf(currentSlug);
// 			if (pageIndex === -1) return 0; // safety fallback
// 			return (pageIndex / (step.length - 1)) * 100;
// 		}
// 		// For future steps, progress is 0
// 		return 0;
// 	});

// 	console.log("progressValues", progressValues);

// 	const flatPages = ["overview", ...steps.flat()];
// 	const currentFlatIndex = flatPages.indexOf(currentSlug);

// 	console.log(flatPages);
// 	console.log(currentFlatIndex);

// 	const buildPath = (slug: string) => `/become-a-host/${id}/${slug}`;

// 	const goBack = () => {
// 		if (currentFlatIndex > 0) {
// 			router.push(buildPath(flatPages[currentFlatIndex - 1]));
// 		}
// 	};
// 	const goNext = () => {
// 		if (currentFlatIndex < flatPages.length - 1) {
// 			router.push(buildPath(flatPages[currentFlatIndex + 1]));
// 		}
// 	};

// 	return (
// 		<footer className="flex mx-auto h-[80px] px-3.5 lg:px-12 w-full">
// 			<div className="w-full absolute top-0 left-0 flex items-center gap-x-1 right-0">
// 				{progressValues.map((value, i) => (
// 					<Progress value={value} className="w-full rounded-none h-1.5 transition-all duration-1000" key={i} />
// 				))}
// 			</div>
// 			<div className="flex items-center justify-between w-full mt-1.5">
// 				<div>
// 					{currentSlug !== startPages[0] && (
// 						<Button variant="ghost" className="underline font-bold rounded-xl" onClick={goBack}>
// 							Back
// 						</Button>
// 					)}
// 				</div>
// 				<div className="flex items-center gap-x-2">
// 					<Button size="lg" className="font-bold h-12 rounded-xl" onClick={goNext}>
// 						{currentSlug === "overview" ? "Get started" : "Next"}
// 					</Button>
// 				</div>
// 			</div>
// 		</footer>
// 	);
// };

// "use client";

// import { Button } from "@/components/ui/button";
// import { Loader } from "@/components/ui/loader";
// import { Progress } from "@/components/ui/progress";
// import { steps } from "@/lib/constants";
// import { cn } from "@/lib/utils";
// import { usePathname, useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";

// const startPages = ["overview", "about-your-place", "stand-out", "finish-setup"];

// type StepFooterProps = {
// 	onNext?: () => void;
// 	isNextDisabled?: boolean;
// 	isNextLoading?: boolean;
// 	backStep?: string;
// 	nextStep?: string;
// };

// export const Footer = ({ onNext, isNextDisabled, isNextLoading, backStep }: StepFooterProps) => {
// 	const pathname = usePathname();
// 	const router = useRouter();
// 	const pathSegments = pathname.split("/").filter(Boolean);
// 	const id = pathSegments[1];
// 	const currentSlug = pathSegments[pathSegments.length - 1];

// 	let currentStep = 0;
// 	let pageIndex = 0;

// 	steps.forEach((step, i) => {
// 		const idx = step.indexOf(currentSlug);

// 		if (idx !== -1) {
// 			currentStep = i;
// 			pageIndex = idx;
// 		}
// 	});

// 	// [0, 0, 0]
// 	const rawProgress = steps.map((step, i) => {
// 		if (currentSlug === "overview") {
// 			return 0;
// 		}

// 		// For previous steps, progress is full
// 		if (i < currentStep) return 100;
// 		// For current step:
// 		if (i === currentStep) {
// 			const pageIndex = step.indexOf(currentSlug);
// 			if (pageIndex === -1) return 0; // safety fallback
// 			return (pageIndex / (step.length - 1)) * 100;
// 		}
// 		return 0;
// 	});

// 	const prevProgressRef = React.useRef<number[]>(rawProgress);

// 	const [progressValues, setProgressValues] = useState(() => {
// 		return steps.map((_, i) => (i === currentStep ? 0 : rawProgress[i]));
// 	});

// 	console.log(progressValues);

// 	useEffect(() => {
// 		const timeout = setTimeout(() => {
// 			setProgressValues(newProgress);
// 			prevProgressRef.current = newProgress;
// 		}, 50);

// 		return () => clearTimeout(timeout);
// 	}, []);

// 	const buildPath = (slug: string) => `/become-a-host/${id}/${slug}`;

// 	return (
// 		<footer className="flex mx-auto h-[80px] px-3.5 lg:px-12 w-full">
// 			<div className="w-full absolute top-0 left-0 flex items-center gap-x-1 right-0">
// 				{progressValues.map((value, i) => (
// 					<Progress value={value} className="w-full rounded-none h-1.5 transition-all duration-1000" key={i} />
// 				))}
// 			</div>
// 			<div className="flex items-center justify-between w-full mt-1.5">
// 				<div>
// 					{currentSlug !== startPages[0] && (
// 						<Button variant="ghost" className="underline font-bold rounded-xl" onClick={() => backStep && router.push(buildPath(backStep))}>
// 							Back
// 						</Button>
// 					)}
// 				</div>
// 				<div className="flex items-center gap-x-2">
// 					<Button disabled={isNextDisabled} size="lg" className="font-bold relative h-12 rounded-xl disabled:cursor-not-allowed" onClick={onNext}>
// 						<div className={cn(isNextLoading && "flex invisible")}>{currentSlug === "overview" ? "Get started" : "Next"}</div>
// 						<div className={cn("absolute inset-0 flex items-center justify-center", !isNextLoading && "opacity-0")}>
// 							<Loader className="bg-white" />
// 						</div>
// 					</Button>
// 				</div>
// 			</div>
// 		</footer>
// 	);
// };

"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { Progress } from "@/components/ui/progress";
import { steps } from "@/lib/constants";
import { LoadingButton } from "@/lib/constants/steps";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const startPages = ["overview", "about-your-place", "stand-out", "finish-setup"];

type StepFooterProps = {
	onNext?: () => void;
	backStep?: string;
	nextStep?: string;
	isDisabled?: boolean;
	canProceed?: boolean;
	loadingButton?: LoadingButton;
};

const getNextButtonText = (slug: string) => {
	if (slug === "overview") return "Get started";
	if (slug === "review") return "Publish";
	return "Next";
};

export const Footer = ({ onNext, backStep, loadingButton, canProceed, isDisabled }: StepFooterProps) => {
	const pathname = usePathname();
	const router = useRouter();
	const pathSegments = pathname.split("/").filter(Boolean);
	const id = pathSegments[1];
	const currentSlug = pathSegments[pathSegments.length - 1];

	let currentStep = 0;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let pageIndex = 0;

	steps.forEach((step, i) => {
		const idx = step.indexOf(currentSlug);

		if (idx !== -1) {
			currentStep = i;
			pageIndex = idx;
		}
	});

	// Track previous slug to determine direction
	const prevSlugRef = useRef<string>(currentSlug);
	console.log("prevSlugRef", prevSlugRef.current);

	const [progressValues, setProgressValues] = useState(() => {
		return steps.map((step, i) => {
			if (currentSlug === "overview") return 0;

			// Previous steps = 100% progress
			if (i < currentStep) return 100;

			if (i === currentStep) {
				const pageIndex = step.indexOf(currentSlug);
				if (pageIndex === -1) return 0; // Fallback

				const stepProgress = ((pageIndex + 1) / step.length) * 100;
				const singleStepProgress = (1 / step.length) * 100; // "x"

				return stepProgress - singleStepProgress;
			}
			return 0;
		});
	});

	useEffect(() => {
		const timeout = setTimeout(() => {
			// [0, 0, 0]
			const rawProgress = steps.map((step, i) => {
				if (currentSlug === "overview") {
					return 0;
				}

				// For previous steps, progress is full
				if (i < currentStep) return 100;
				// For current step:
				if (i === currentStep) {
					const pageIndex = step.indexOf(currentSlug);

					if (pageIndex === -1) return 0; // safety fallback

					return ((pageIndex + 1) / step.length) * 100;
				}
				return 0;
			});

			setProgressValues(rawProgress);
		}, 1000);

		return () => clearTimeout(timeout);
	}, [currentSlug, currentStep]);

	const buildPath = (slug: string) => `/become-a-host/${id}/${slug}`;

	if (pathname === "/become-a-host") return null;

	return (
		<footer className="flex mx-auto h-[80px] px-3.5 lg:px-12 w-full">
			<div className="w-full absolute top-0 left-0 flex items-center gap-x-1 right-0">
				{progressValues.map((value, i) => (
					<Progress value={value} className="w-full rounded-none h-1.5 transition-all duration-1000" key={i} />
				))}
			</div>
			<div className="flex items-center justify-between w-full mt-1.5">
				<div>
					{currentSlug !== startPages[0] && (
						<Button
							disabled={isDisabled || loadingButton === "back"}
							variant="ghost"
							className="underline font-bold rounded-xl"
							onClick={() => backStep && router.push(buildPath(backStep))}
						>
							<div className={cn(loadingButton === "back" && "flex invisible")}>Back</div>
							<div className={cn("absolute inset-0 flex items-center justify-center", loadingButton !== "back" && "opacity-0")}>
								<Loader className="bg-black" />
							</div>
						</Button>
					)}
				</div>
				<div className="flex items-center gap-x-2">
					<Button
						disabled={!canProceed || isDisabled || loadingButton === "next"}
						size="lg"
						className="font-bold relative h-12 rounded-xl disabled:cursor-not-allowed"
						onClick={onNext}
					>
						<div className={cn(loadingButton === "next" && "flex invisible")}>{getNextButtonText(currentSlug)}</div>
						<div className={cn("absolute inset-0 flex items-center justify-center", loadingButton !== "next" && "opacity-0")}>
							<Loader className="bg-white" />
						</div>
					</Button>
				</div>
			</div>
		</footer>
	);
};
