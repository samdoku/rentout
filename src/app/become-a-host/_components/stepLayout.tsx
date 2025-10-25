"use client";

import React, { useEffect, useState } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { useStepNavigation } from "@/hooks/use-step-navigation";
import { Loader } from "@/components/ui/loader";
import { LoadingButton } from "@/lib/constants/steps";


type StepLayoutProps = {
	children: React.ReactNode;
	onNext?: () => void;
	onBack?: () => void;
	onSaveExit?: () => void;
	isPrefetching?: boolean;
	canProceed?: boolean;
	onMount?: (setDisabled: (value: boolean) => void, setButtonLoading: (button: LoadingButton) => void) => void;
};

const StepLayout = ({ children, onNext, isPrefetching = false, canProceed = false, onMount }: StepLayoutProps) => {
	// const pathname = usePathname();
	// const currentSlug = pathname.split("/").pop() as string;
	const { back, next } = useStepNavigation();
	const [isDisabled, setIsDisabled] = useState(isPrefetching);
	const [loadingButton, setLoadingButton] = useState<LoadingButton>(null);

	useEffect(() => {
		setIsDisabled(isPrefetching);
	}, [isPrefetching]);

	useEffect(() => {
		if (onMount) onMount(setIsDisabled, setLoadingButton);
	}, [onMount]);

	return (
		<div className="w-full min-h-svh relative">
			<div className="w-full fixed top-0 px-3.5 lg:px-12 bg-white z-50">
				<Header isDisabled={isDisabled} loading={loadingButton === "save"} />
			</div>
			<main className="w-full min-h-svh h-full ">
				{isPrefetching ? (
					<div className="min-h-svh py-20 h-full w-full px-4 flex items-center justify-center">
						<Loader className="bg-black" />
					</div>
				) : (
					children
				)}
			</main>
			<div className="w-full fixed bottom-0 bg-white">
				<Footer onNext={onNext} isDisabled={isDisabled} backStep={back} nextStep={next} canProceed={canProceed} loadingButton={loadingButton} />
			</div>
		</div>
	);
};

export default StepLayout;
