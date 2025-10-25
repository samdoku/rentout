"use client";

import React, { useEffect, useState } from "react";
import StepLayout from "../../_components/stepLayout";
import { usePathname, useRouter } from "next/navigation";
import { useStepNavigation } from "@/hooks/use-step-navigation";
import { toast } from "sonner";
import { api } from "@/lib/axios-instance";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

type LocationForm = {
	country: string;
	state?: string;
	city: string;
	street: string;
	zipCode?: string;
	latitude?: string;
	longitude?: string;
};

const Page = () => {
	const pathname = usePathname();
	const navigations = useStepNavigation();
	const router = useRouter();
	const listingId = pathname.split("/")[2];

	let disableAll: (v: boolean) => void = () => { };
	let setButtonLoading: (b: "next" | "back" | "save" | null) => void = () => { };

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<LocationForm>({
		defaultValues: {
			country: "Ghana",
		},
	});

	// Watch for required fields
	const [canProceed, setCanProceed] = useState(false);
	const country = watch("country");
	const city = watch("city");
	const street = watch("street");

	useEffect(() => {
		setCanProceed(!!country && !!city && !!street);
	}, [country, city, street]);

	const onSubmit = async (data: LocationForm) => {
		if (!canProceed) {
			toast.error("Please fill out all required fields");
			return;
		}

		disableAll(true);
		setButtonLoading("next");

		try {
			await api.patch(`/listings/${listingId}/location`, {
				country: data.country,
				state: data.state || "",
				city: data.city,
				street: data.street,
				zipCode: data.zipCode || "",
				latitude: data.latitude,
				longitude: data.longitude,
			});

			await api.patch(`/listings/${listingId}`, {
				currentStep: navigations.next,
			});

			if (navigations.next) {
				router.push(`/become-a-host/${listingId}/${navigations.next}`);
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			console.log(err);
			toast.error(
				err?.response?.data?.error || err.message || "Oops, something went wrong"
			);
			setButtonLoading(null);
			disableAll(false);
		}
	};

	return (
		<StepLayout
			onNext={handleSubmit(onSubmit)}
			onMount={(setDisabled, setLoadingButton) => {
				disableAll = setDisabled;
				setButtonLoading = setLoadingButton;
			}}
			canProceed={canProceed}
		>
			<div className="w-full min-h-svh py-20 px-4">
				<div className="max-w-screen-sm w-full mx-auto pt-2">
					<h1 className="text-2xl md:text-3xl font-semibold">
						Where is your property located?
					</h1>

					<div className="mt-8 space-y-4">
						<div>
							<Label htmlFor="country">Country *</Label>
							<Input
								id="country"
								className="ring-2 ring-gray-200 focus:ring-2 focus:ring-black"
								{...register("country", { required: true })}
								placeholder="e.g. Ghana"
							/>
							{errors.country && (
								<p className="text-red-500 text-sm mt-1">
									Country is required
								</p>
							)}
						</div>

						<div>
							<Label htmlFor="state">State / Region</Label>
							<Input
								id="state"
								className="ring-2 ring-gray-200 focus:ring-2 focus:ring-black"
								{...register("state")}
								placeholder="e.g. Greater Accra"
							/>
						</div>

						<div>
							<Label htmlFor="city">City *</Label>
							<Input
								id="city"
								className="ring-2 ring-gray-200 focus:ring-2 focus:ring-black"
								{...register("city", { required: true })}
								placeholder="e.g. Accra"
							/>
							{errors.city && (
								<p className="text-red-500 text-sm mt-1">City is required</p>
							)}
						</div>

						<div>
							<Label htmlFor="street">Street Address *</Label>
							<Input
								id="street"
								className="ring-2 ring-gray-200 focus:ring-2 focus:ring-black"
								{...register("street", { required: true })}
								placeholder="e.g. 12 Oxford Street"
							/>
							{errors.street && (
								<p className="text-red-500 text-sm mt-1">
									Street address is required
								</p>
							)}
						</div>

						<div>
							<Label htmlFor="zipCode">Postal / ZIP Code</Label>
							<Input
								id="zipCode"
								className="ring-2 ring-gray-200 focus:ring-2 focus:ring-black"
								{...register("zipCode")}
								placeholder="e.g. GA-123-4567"
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<Label htmlFor="latitude">Latitude (optional)</Label>
								<Input
									id="latitude"
									type="number"
									step="any"
									className="ring-2 ring-gray-200 focus:ring-2 focus:ring-black"
									{...register("latitude")}
									placeholder="e.g. 5.6037"
								/>
							</div>

							<div>
								<Label htmlFor="longitude">Longitude (optional)</Label>
								<Input
									id="longitude"
									type="number"
									step="any"
									className="ring-2 ring-gray-200 focus:ring-2 focus:ring-black"
									{...register("longitude")}
									placeholder="e.g. -0.1870"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</StepLayout>
	);
};

export default Page;
