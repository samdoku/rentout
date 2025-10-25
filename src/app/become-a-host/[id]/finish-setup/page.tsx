"use client";

import StepLayout from "../../_components/stepLayout";
import { usePathname, useRouter } from "next/navigation";
import { useStepNavigation } from "@/hooks/use-step-navigation";
import { api } from "@/lib/axios-instance";
import { toast } from "sonner";

const Page = () => {
	const pathname = usePathname();
	// const [isLoading, setIsLoading] = useState(false);
	// const [isDisabled, setIsDisabled] = useState(false);
	const navigations = useStepNavigation();
	const router = useRouter();
	const listingId = pathname.split("/")[2];

	let disableAll: (v: boolean) => void = () => {};
	let setButtonLoading: (b: "next" | "back" | "save" | null) => void = () => {};

	const handleNext = async () => {
		disableAll(true);
		setButtonLoading("next");

		try {
			await api.patch(`/listings/${listingId}`, {
				currentStep: navigations.next,
			});

			if (navigations.next) {
				router.push(`/become-a-host/${listingId}/${navigations.next}`);
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			console.log(err);
			toast.error("Oops, something went wrong");
			setButtonLoading(null);
			disableAll(false);
		}
	};

	return (
		<StepLayout
			onNext={handleNext}
			onMount={(setDisabled, setLoadingButton) => {
				disableAll = setDisabled;
				setButtonLoading = setLoadingButton;
			}}
			canProceed={true}
		>
			<div className=" px-4 max-w-6xl mx-auto w-full min-h-svh py-20 h-full flex items-center justify-center">
				<div className="flex flex-col-reverse md:flex-row py-4">
					<div className=" font-[550] text-sm md:text-base flex-1 flex flex-col justify-center items-start">
						<h3>Step 3</h3>
						<h1 className="md:text-4xl py-4 text-2xl">Finish up and publish</h1>
						<p className="font-medium">Finally, you&apos;ll choose booking settings, set up pricing, and publish your listing.</p>
					</div>
					<div className=" flex-1">
						<video
							className="w-full h-full"
							autoPlay
							muted
							playsInline
							loop={false}
							controls={false}
							src="/assets/videos/KeNKUpa01dRaT5g00SSBV95FqXYkqf01DJdzn01F1aT00vCI.mp4"
						></video>
					</div>
				</div>
			</div>
		</StepLayout>
	);
};

export default Page;
