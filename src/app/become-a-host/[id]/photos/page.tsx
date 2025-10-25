"use client";

import { usePathname, useRouter } from "next/navigation";
import StepLayout from "../../_components/stepLayout";
import { Upload } from "./_components/upload";
import { useStepNavigation } from "@/hooks/use-step-navigation";
import { api } from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";


type Photo = {
	id: string;
	file?: File;
	key: string;
	url: string;
	isCover: boolean;
	progress?: number;
	uploading?: boolean;
	position:number;
};

const Page = () => {
	const pathname = usePathname();
	const navigations = useStepNavigation();
	const router = useRouter();
	const listingId = pathname.split("/")[2];

	const { data, isLoading } = useQuery({
		queryKey: ["listing-photos", listingId],
		queryFn: async () => {
			const res = await api.get(`/listings/photos?listingId=${listingId}`);
			return res.data;
		},
	});

	const [photos, setPhotos] = useState<Photo[]>(data ?? []);


	let disableAll: (v: boolean) => void = () => {};
	let setButtonLoading: (b: "next" | "back" | "save" | null) => void = () => {};

	const handleNext = async () => {
		if (photos.length < 5) {
			toast.error("You need at least 5 photos to continue");
			return;
		}
		
		disableAll(true);
		setButtonLoading("next");
		try {
			if (navigations.next) {
				router.push(`/become-a-host/${listingId}/${navigations.next}`);
			}
		} catch (err) {
			console.log(err);
			toast.error("Oops, something went wrong");
			setButtonLoading(null);
			disableAll(false);
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const handleImageUpload = async (file: File[]) => {};

	return (
		<StepLayout
			onNext={handleNext}
			onMount={(setDisabled, setLoadingButton) => {
				disableAll = setDisabled;
				setButtonLoading = setLoadingButton;
			}}
			isPrefetching={isLoading}
			canProceed={photos.length >= 5}
		>
			<div className="px-4 max-w-2xl mx-auto w-full min-h-svh py-20 h-full">
				<div className="w-full py-6">
					<div className="w-full pb-3 animate-list-stagger">
						<h1 className="font-semibold text-2xl md:text-3xl">Add some photos of your place</h1>
						<p className="text-base font-medium text-black/70 ">You&apos;ll need 5 photos to get started. You can add more or make changes later.</p>
					</div>
					<div className="w-full mt-2">
						<Upload listingId={listingId} photos={photos} setPhotos={setPhotos} />
					</div>
					{/* <div className=" animate-list-stagger delay-500">0/32</div> */}
				</div>
			</div>
		</StepLayout>
	);
};

export default Page;
