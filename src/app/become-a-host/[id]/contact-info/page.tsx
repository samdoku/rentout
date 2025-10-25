"use client";

import React, { useEffect, useState } from "react";
import StepLayout from "../../_components/stepLayout";
import { usePathname, useRouter } from "next/navigation";
import { useStepNavigation } from "@/hooks/use-step-navigation";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { api } from "@/lib/axios-instance";

type ContactForm = {
    fullName: string;
    phone: string;
    email: string;
    alternatePhone?: string;
};

const ContactInfoPage = () => {
    const pathname = usePathname();
    const router = useRouter();
    const navigations = useStepNavigation();
    const listingId = pathname.split("/")[2];

    let disableAll: (v: boolean) => void = () => { };
    let setButtonLoading: (b: "next" | "back" | "save" | null) => void = () => { };

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<ContactForm>({
        mode: "onChange", // ensures validation updates as user types
    });

    const [canProceed, setCanProceed] = useState(false);
    const fullName = watch("fullName");
    const phone = watch("phone");
    const email = watch("email");

    useEffect(() => {
        setCanProceed(!!fullName && !!phone && !!email);
    }, [fullName, phone, email]);

    useEffect(() => {
        const fetchContactInfo = async () => {
            try {
                const res = await api.get(`/listings/${listingId}/contact-info`);
                if (res.data) reset(res.data);
            } catch {
                // ignore
            }
        };
        if (listingId) fetchContactInfo();
    }, [listingId, reset]);

    const onSubmit = async (data: ContactForm) => {
        disableAll(true);
        setButtonLoading("next");

        try {
            await api.post(`/listings/${listingId}/contact-info`, data);
            await api.patch(`/listings/${listingId}`, {
                currentStep: navigations.next,
            });

            if (navigations.next) {
                router.push(`/become-a-host/${listingId}/${navigations.next}`);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error(err);
            toast.error(err?.response?.data?.error || err.message || "Something went wrong");
            setButtonLoading(null);
            disableAll(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                            Host or Property Owner Contact Information
                        </h1>

                        <div className="mt-8 space-y-4">
                            <div>
                                <Label htmlFor="fullName">Full Name *</Label>
                                <Input
                                    id="fullName"
                                    {...register("fullName", { required: true })}
                                    className="ring-2 ring-gray-200 focus:ring-2 focus:ring-black"
                                    placeholder="e.g. John Doe"
                                />
                                {errors.fullName && (
                                    <p className="text-red-500 text-sm mt-1">
                                        Full name is required
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="email">Email *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    {...register("email", { required: true })}
                                    className="ring-2 ring-gray-200 focus:ring-2 focus:ring-black"
                                    placeholder="e.g. johndoe@example.com"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">
                                        Email is required
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="phone">Phone Number *</Label>
                                <Input
                                    id="phone"
                                    {...register("phone", { required: true })}
                                    className="ring-2 ring-gray-200 focus:ring-2 focus:ring-black"
                                    placeholder="e.g. +233 24 123 4567"
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm mt-1">
                                        Phone number is required
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="alternatePhone">
                                    Alternate Phone (optional)
                                </Label>
                                <Input
                                    id="alternatePhone"
                                    {...register("alternatePhone")}
                                    className="ring-2 ring-gray-200 focus:ring-2 focus:ring-black"
                                    placeholder="e.g. +233 55 987 6543"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </StepLayout>
        </form>
    );
};

export default ContactInfoPage;
