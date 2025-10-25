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
// 	description: string;
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
// 		{
// 			type: "guests",
// 			label: "Private and attached",
// 			description: "It's connected to the guest's room and is just for them.",
// 			minValue: 1,
// 			maxValue: 25,
// 		},
// 		{
// 			type: "bedrooms",
// 			label: "Dedicated",
// 			description: "It's private, but accessed via a shared space, like a hallway.",
// 			minValue: 0,
// 			maxValue: 50,
// 		},
// 		{ type: "beds", label: "Shared", description: "It's shared with other people.", minValue: 0, maxValue: 50 },
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
// 		<StepLayout onNext={handleNext}>
// 			<div className=" px-4 max-w-2xl mx-auto w-full min-h-svh py-20 h-full flex items-center justify-center">
// 				<div className="w-full py-6">
// 					<div className="w-full pb-3">
// 						<h1 className="font-semibold text-2xl animate-list-stagger md:text-3xl">What kind of bathrooms are available to guests?</h1>
// 					</div>
// 					<div className="w-full mt-4">
// 						<div>
// 							{counterConfig.map(({ type, label, minValue, maxValue, description }, i) => (
// 								<div
// 									className="flex justify-between animate-list-stagger items-center flex-nowrap gap-x-3 text-base border-b last:border-b-0 py-4"
// 									key={type}
// 									style={{ animationDelay: `${500 + i * 20}ms` }}
// 								>
// 									<div className="flex-1">
// 										<h3 className="font-semibold">{label}</h3>
// 										<p className="text-sm text-black/70">{description}</p>
// 									</div>
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
// 				</div>
// 			</div>
// 		</StepLayout>
// 	);
// };

// export default Page;



import React from 'react'

const Page = () => {
  return (
	<div>page</div>
  )
}

export default Page