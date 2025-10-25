"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState, useMemo } from "react";
import StepLayout from "../../_components/stepLayout";
import { usePathname, useRouter } from "next/navigation";
import { useStepNavigation } from "@/hooks/use-step-navigation";
import debounce from "lodash.debounce";
import { api } from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

interface FloorPlan {
  guests: number;
  bedrooms: number;
  beds: number;
}

type CounterType = keyof FloorPlan;

interface CounterConfig {
  type: CounterType;
  label: string;
  minValue: number;
  maxValue: number;
}

const counterConfig: CounterConfig[] = [
  { type: "guests", label: "Guests", minValue: 1, maxValue: 25 },
  { type: "bedrooms", label: "Bedrooms", minValue: 0, maxValue: 50 },
  { type: "beds", label: "Beds", minValue: 0, maxValue: 50 },
];

const Page = () => {
  const pathname = usePathname();
  const router = useRouter();
  const {current, next} = useStepNavigation();
  const listingId = pathname.split("/")[2];

  const [counts, setCounts] = useState<FloorPlan>({
    guests: 1,
    bedrooms: 0,
    beds: 0,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isPrefilled, setIsPrefilled] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["listing", listingId],
    queryFn: async () => {
      const res = await api.get(`/listings/${listingId}`);
      return res.data;
    },
    enabled: !!listingId,
  });

  useEffect(() => {
    if (data && !isPrefilled) {
      setCounts({
        guests: data?.guests ?? 1,
        bedrooms: data?.bedrooms ?? 0,
        beds: data?.beds ?? 0,
      });
      setIsPrefilled(true);
    }
  }, [data, isPrefilled]);

  const debouncedSave = useMemo(
	() =>
	  debounce(async (newCounts: FloorPlan) => {
		try {
		  setIsSaving(true);
		  await api.patch(`/listings/${listingId}`, {
			...newCounts,
			currentStep: current,
		  });
		} catch (err) {
		  console.error("Autosave failed:", err);
		} finally {
		  setIsSaving(false);
		}
	  }, 500),
	[listingId, current]
  );

  useEffect(() => {
    if (!listingId || !isPrefilled || !hasUserInteracted) return;
    debouncedSave(counts);
    return () => debouncedSave.cancel();
  }, [counts, listingId, isPrefilled, hasUserInteracted, debouncedSave]);

  const updateCounts = (updater: (prev: FloorPlan) => FloorPlan) => {
    setHasUserInteracted(true);
    setCounts((prev) => updater(prev));
  };

  let disableAll: (v: boolean) => void = () => {};
  let setButtonLoading: (b: "next" | "back" | "save" | null) => void = () => {};

  const handleNext = async () => {
    debouncedSave.cancel(); // cancel pending autosaves before manual save
    disableAll(true);
    setButtonLoading("next");

    try {
      await api.patch(`/listings/${listingId}`, {
        ...counts,
        currentStep: current,
      });

      if (next) {
        router.push(`/become-a-host/${listingId}/${next}`);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.error || err.message || "Oops, something went wrong");
    } finally {
      setButtonLoading(null);
      disableAll(false);
    }
  };

  // ✅ Increment / Decrement
  const increment = (type: CounterType, maxValue: number) => {
    updateCounts((prev) => {
      if (prev[type] >= maxValue) return prev;
      return { ...prev, [type]: prev[type] + 1 };
    });
  };

  const decrement = (type: CounterType, minValue: number) => {
    updateCounts((prev) => {
      if (prev[type] <= minValue) return prev;
      return { ...prev, [type]: prev[type] - 1 };
    });
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
    <StepLayout
      onNext={handleNext}
      onMount={(setDisabled, setLoadingButton) => {
        disableAll = setDisabled;
        setButtonLoading = setLoadingButton;
      }}
      isPrefetching={isLoading}
      canProceed={true}
    >
      <div className="px-4 max-w-2xl mx-auto w-full min-h-svh py-20 h-full md:flex items-center justify-center">
        <div className="w-full py-6">
          <div className="w-full pb-2 md:pb-3">
            <h1 className="font-semibold text-2xl animate-list-stagger md:text-3xl">
              Let&apos;s start with the basics
            </h1>
          </div>

          <div className="w-full md:mt-4">
            <h3 className="font-semibold animate-list-stagger text-lg py-2">
              How many people can stay here?
            </h3>
            <div className="mt-2 md:mt-0">
              {counterConfig.map(({ type, label, minValue, maxValue }, i) => (
                <div
                  className="flex justify-between items-center flex-nowrap gap-x-3 text-base border-b last:border-b-0 py-4 animate-list-stagger"
                  key={type}
                  style={{ animationDelay: `${500 + i * 20}ms` }}
                >
                  <div>{label}</div>
                  <div className="flex items-center basis-[120px]">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full disabled:cursor-not-allowed"
                      disabled={counts[type] === minValue}
                      onClick={() => decrement(type, minValue)}
                    >
                      {Icons.minus()}
                    </Button>
                    <div className="flex-1 text-center">{counts[type]}</div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full disabled:cursor-not-allowed"
                      disabled={counts[type] === maxValue}
                      onClick={() => increment(type, maxValue)}
                    >
                      {Icons.plus()}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isSaving && (
            <div className="text-sm text-gray-500 mt-4 animate-pulse">
              Saving...
            </div>
          )}
        </div>
      </div>
    </StepLayout>
  );
};

export default Page;



// "use client";

// import { Icons } from "@/components/icons";
// import { Button } from "@/components/ui/button";
// import React, { useState } from "react";
// import StepLayout from "../../_components/stepLayout";
// import { usePathname, useRouter } from "next/navigation";
// import { useStepNavigation } from "@/hooks/use-step-navigation";

// interface FloorPlan {
// 	guests: number;
// 	bedrooms: number;
// 	beds: number;
// }

// type CounterType = keyof FloorPlan;

// interface CounterConfig {
// 	type: CounterType;
// 	label: string;
// 	minValue: number;
// 	maxValue: number;
// }

// const Page = () => {
// 	const pathname = usePathname();
// 	const [isLoading, setIsLoading] = useState(false);
// 	const navigations = useStepNavigation();
// 	const router = useRouter();

// 	const handleNext = async () => {
// 		setIsLoading(true);
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

// 	const [counts, setCounts] = useState<FloorPlan>({ guests: 1, bedrooms: 0, beds: 0 });

// 	const counterConfig: CounterConfig[] = [
// 		{ type: "guests", label: "Guests", minValue: 1, maxValue: 25 },
// 		{ type: "bedrooms", label: "Bedrooms", minValue: 0, maxValue: 50 },
// 		{ type: "beds", label: "Beds", minValue: 0, maxValue: 50 },
// 	];

// 	const increment = (type: CounterType, maxValue: number) => {
// 		if (counts[type] >= maxValue) return;

// 		setCounts((prev) => ({
// 			...prev,
// 			[type]: prev[type] + 1,
// 		}));
// 	};

// 	const decrement = (type: CounterType, minValue: number) => {
// 		if (counts[type] <= minValue) return;

// 		setCounts((prev) => ({
// 			...prev,
// 			[type]: prev[type] - 1,
// 		}));
// 	};

// 	console.log(counts);

// 	return (
// 		<StepLayout onNext={handleNext} isNextLoading={isLoading}>
// 			<div className=" px-4 max-w-2xl mx-auto w-full min-h-svh py-20 h-full md:flex items-center justify-center">
// 				<div className="w-full py-6">
// 					<div className="w-full pb-2 md:pb-3">
// 						<h1 className="font-semibold text-2xl animate-list-stagger md:text-3xl">Let&apos;s start with the basics </h1>
// 					</div>
// 					<div className="w-full md:mt-4">
// 						<h3 className="font-semibold animate-list-stagger text-lg py-2">How many people can stay here?</h3>
// 						<div className="mt-2 md:mt-0">
// 							{counterConfig.map(({ type, label, minValue, maxValue }, i) => (
// 								<div
// 									className="flex justify-between items-center flex-nowrap gap-x-3 text-base border-b last:border-b-0 py-4 animate-list-stagger"
// 									key={type}
// 									style={{ animationDelay: `${500 + i * 20}ms` }}
// 								>
// 									<div>{label}</div>
// 									<div className="flex items-center basis-[120px]">
// 										<Button
// 											variant="outline"
// 											size="icon"
// 											className="rounded-full disabled:cursor-not-allowed"
// 											disabled={counts[type] === minValue}
// 											onClick={() => decrement(type, minValue)}
// 										>
// 											{Icons.minus()}
// 										</Button>
// 										<div className="flex-1 text-center">{counts[type]}</div>
// 										<Button variant="outline" size="icon" className="rounded-full" onClick={() => increment(type, maxValue)}>
// 											{Icons.plus()}
// 										</Button>
// 									</div>
// 								</div>
// 							))}
// 						</div>
// 					</div>
// 					{/* <div className="w-full mt-4">
// 					<h3 className="font-semibold text-lg py-2">Does every bedroom have a lock?</h3>
// 				</div> */}
// 				</div>
// 			</div>
// 		</StepLayout>
// 	);
// };

// export default Page;
