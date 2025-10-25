"use client";

import Image from "next/image";
import StepLayout from "../../_components/stepLayout";
import { usePathname, useRouter } from "next/navigation";
import { useStepNavigation } from "@/hooks/use-step-navigation";
import { api } from "@/lib/axios-instance";
import { toast } from "sonner";

const overview = [
	{
		title: "Tell us about your place",
		description: "Share some basic info, like where it is and how many guests can stay.",
		image: "/assets/photos/bed.webp",
	},
	{
		title: "Make it stand out",
		description: "Add 5 or more photos plus a title and description—we'll help you out.",
		image: "/assets/photos/decor.webp",
	},
	{
		title: "Finish up and publish",
		description: "Choose if you would like to start with an experienced guest, set a starting price, and publish your listing.",
		image: "/assets/photos/door.webp",
	},
];

const Page = () => {
	const pathname = usePathname();
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
			setButtonLoading(null);
			disableAll(false);
			toast.error("Oops, something went wrong");
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
			<div className=" px-4 max-w-7xl mx-auto w-full min-h-svh py-20 h-full md:flex items-center justify-center">
				<div className="flex flex-col md:flex-row py-4 md:gap-4">
					<div className="font-[550] flex-1 flex flex-col justify-center items-start">
						<h1 className=" lg:text-5xl md:text-4xl py-4 text-2xl  md:max-w-lg w-full">It’s easy to get started on nestQuest</h1>
					</div>
					<div className="flex-1">
						{overview.map((item, i) => (
							<div key={i} className="flex flex-nowrap border-b last:border-b-0 py-5 md:py-8 gap-x-3">
								<div className="flex items-baseline gap-x-3 flex-nowrap">
									<div className="font-semibold text-lg md:text-xl">{i + 1}</div>
									<div className="flex-1">
										<h3 className="font-semibold text-lg md:text-xl">{item.title}</h3>
										<p className="text-sm md:text-base pt-1 text-black/70">{item.description}</p>
									</div>
								</div>
								<div className="relative aspect-square w-20 h-20 md:w-32 md:h-32">
									<Image src={item.image} alt={item.title} className="object-cover" fill />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</StepLayout>
	);
};

export default Page;
