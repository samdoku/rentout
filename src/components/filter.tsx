"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import React, { useEffect, useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Slider } from "./ui/slider";
import { cn } from "@/lib/utils";

export const Filter = ({ trigger }: { trigger: React.ReactNode }) => {
	const isMobile = useIsMobile();

	return isMobile ? (
		<Drawer>
			<DrawerTrigger asChild>{trigger}</DrawerTrigger>
			<DrawerContent className="max-h-[calc(100vh-200px)] overflow-hidden h-full">
				<DrawerHeader className="mark">
					<DrawerTitle>Filter</DrawerTitle>
				</DrawerHeader>
				<div>
					<FilterContent />
				</div>
			</DrawerContent>
		</Drawer>
	) : (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className="max-w-screen-md flex gap-0 flex-col p-0 overflow-hidden w-full max-h-[calc(100vh-100px)] h-full sm:rounded-xl">
				<DialogHeader className="mark-b h-14">
					<DialogTitle>wassup</DialogTitle>
				</DialogHeader>
				<div className="mark px-4 py-8">
					<FilterContent />
				</div>
			</DialogContent>
		</Dialog>
	);
};

// Fake prices from "database"
const fakePrices: number[] = [];

for (let i = 0; i < 700; i++) {
	let price: number;

	const rand = Math.random();

	if (rand < 0.5) {
		// 50% chance: cluster around 800–2500
		price = Math.floor(800 + Math.random() * 1700);
	} else if (rand < 0.8) {
		// 30% chance: mid-range 2500–4500
		price = Math.floor(2500 + Math.random() * 2000);
	} else {
		// 20% chance: higher-end 4500–7000
		price = Math.floor(4500 + Math.random() * 2500);
	}

	fakePrices.push(price);
}

// Histogram settings
const BUCKET_COUNT = 30; // number of bars in the histogram

const minPrice = 500;
const maxPrice = 7000;

function generateHistogram(prices: number[], min: number, max: number) {
	const buckets = new Array(BUCKET_COUNT).fill(0);
	const bucketSize = (max - min) / BUCKET_COUNT;

	for (const price of prices) {
		if (price < min || price > max) continue;
		const index = Math.min(Math.floor((price - min) / bucketSize), BUCKET_COUNT - 1);
		buckets[index]++;
	}

	return buckets;
}

export const FilterContent = () => {
	const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
	const [histogram, setHistogram] = useState<number[]>([]);

	useEffect(() => {
		// In real world, fetch prices from backend
		const histogramData = generateHistogram(fakePrices, minPrice, maxPrice);
		setHistogram(histogramData);
	}, []);

	return (
		<div>
			<h2 className="text-base font-semibold mb-4">Price Range</h2>

			<div className="relative mb-2 flex items-end gap-1">
				{histogram.map((count, i) => {
					const bucketMin = minPrice + ((maxPrice - minPrice) / BUCKET_COUNT) * i;
					const bucketMax = bucketMin + (maxPrice - minPrice) / BUCKET_COUNT;

					const isInRange = bucketMax >= priceRange[0] && bucketMin <= priceRange[1];
					return (
						<div
							style={{
								height: `${count * 3}px`, // control bar height
								backgroundColor: isInRange ? "#000000" : "#e2e8f0",
								borderRadius: "2px",
							}}
							key={i}
							className={cn("bg-black w-full")}
						></div>
					);
				})}
			</div>
			<Slider
				min={minPrice}
				max={maxPrice}
				step={100}
				value={priceRange}
				onValueChange={(val) => setPriceRange([val[0], val[1]])}
				className="w-full"
			/>

			<div className="flex justify-between text-sm mt-2 text-muted-foreground">
				<span>${priceRange[0]}</span>
				<span>${priceRange[1]}</span>
			</div>
		</div>
	);
};
