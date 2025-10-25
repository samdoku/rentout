"use client";

import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { Suspense, useCallback, useState } from "react";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { useCategories } from "@/hooks/use-categories";
import { Category } from "@prisma/client";
import { usePathname, useSearchParams } from "next/navigation";


// const categoriesOptions: Category[] = [
// 	// {
// 	// 	image: "/assets/photos/categories/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
// 	// 	name: "Trending",
// 	// },
// 	{
// 		image: "/assets/photos/categories/5ed8f7c7-2e1f-43a8-9a39-4edfc81a3325.jpg",
// 		name: "Bed & breakfasts",
// 	},
// 	// {
// 	// 	image: "/assets/photos/categories/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg",
// 	// 	name: "OMG!",
// 	// },
// 	// {
// 	// 	image: "/assets/photos/categories/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg",
// 	// 	name: "Countryside",
// 	// },
// 	// {
// 	// 	image: "/assets/photos/categories/c0fa9598-4e37-40f3-b734-4bd0e2377add.jpg",
// 	// 	name: "New",
// 	// },
// 	// {
// 	// 	image: "/assets/photos/categories/3fb523a0-b622-4368-8142-b5e03df7549b.jpg",
// 	// 	name: "Amazing pools",
// 	// },
// 	// {
// 	// 	image: "/assets/photos/categories/4221e293-4770-4ea8-a4fa-9972158d4004.jpg",
// 	// 	name: "Caves",
// 	// },
// 	// {
// 	// 	image: "/assets/photos/categories/78ba8486-6ba6-4a43-a56d-f556189193da.jpg",
// 	// 	name: "Mansions",
// 	// },
// 	{
// 		image: "/assets/photos/categories/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg",
// 		name: "Rooms",
// 	},
// 	{
// 		image: "/assets/photos/categories/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg",
// 		name: "Amazing views",
// 	},
// 	// {
// 	// 	image: "/assets/photos/categories/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg",
// 	// 	name: "Beach",
// 	// },
// 	{
// 		image: "/assets/photos/categories/35919456-df89-4024-ad50-5fcb7a472df9.jpg",
// 		name: "Tiny houses",
// 	},
// 	{
// 		image: "/assets/photos/categories/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg",
// 		name: "Design",
// 	},
// 	// {
// 	// 	image: "/assets/photos/categories/8b44f770-7156-4c7b-b4d3-d92549c8652f.jpg",
// 	// 	name: "Arctic",
// 	// },
// 	// {
// 	// 	image: "/assets/photos/categories/c0a24c04-ce1f-490c-833f-987613930eca.jpg",
// 	// 	name: "National park",
// 	// },
// 	{
// 		image: "/assets/photos/categories/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg",
// 		name: "Castles",
// 	},
// 	// {
// 	// 	image: "/assets/photos/categories/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg",
// 	// 	name: "Beachfront",
// 	// },
// 	// {
// 	// 	image: "/assets/photos/categories/8e507f16-4943-4be9-b707-59bd38d56309.jpg",
// 	// 	name: "Islands",
// 	// },
// 	// {
// 	// 	image: "/assets/photos/categories/f0c5ca0f-5aa0-4fe5-b38d-654264bacddf.jpg",
// 	// 	name: "Play",
// 	// },
// 	{
// 		image: "/assets/photos/categories/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg",
// 		name: "Farms",
// 	},
// 	// {
// 	// 	image: "/assets/photos/categories/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg",
// 	// 	name: "Luxe",
// 	// },
// 	{
// 		image: "/assets/photos/categories/ed8b9e47-609b-44c2-9768-33e6a22eccb2.jpg",
// 		name: "Iconic cities",
// 	},
// 	// {
// 	// 	image: "/assets/photos/categories/ee9e2a40-ffac-4db9-9080-b351efc3cfc4.jpg",
// 	// 	name: "Tropical",
// 	// },
// 	// {
// 	// 	image: "/assets/photos/categories/687a8682-68b3-4f21-8d71-3c3aef6c1110.jpg",
// 	// 	name: "Boats",
// 	// },
// 	// {
// 	// 	image: "/assets/photos/categories/0ff9740e-52a2-4cd5-ae5a-94e1bfb560d6.jpg",
// 	// 	name: "Containers",
// 	// },
// 	// {
// 	// 	image: "/assets/photos/categories/957f8022-dfd7-426c-99fd-77ed792f6d7a.jpg",
// 	// 	name: "Surfing",
// 	// },
// 	// {
// 	// 	image: "/assets/photos/categories/6b639c8d-cf9b-41fb-91a0-91af9d7677cc.jpg",
// 	// 	name: "Golfing",
// 	// },
// 	// {
// 	// 	image: "/assets/photos/categories/51f5cf64-5821-400c-8033-8a10c7787d69.jpg",
// 	// 	name: "Hanoks",
// 	// },
// 	// {
// 	// 	image: "/assets/photos/categories/48b55f09-f51c-4ff5-b2c6-7f6bd4d1e049.jpg",
// 	// 	name: "Minsus",
// 	// },
// 	// {
// 	// 	image: "/assets/photos/categories/5cdb8451-8f75-4c5f-a17d-33ee228e3db8.jpg",
// 	// 	name: "Windmills",
// 	// },
// 	// {
// 	// 	image: "/assets/photos/categories/4d4a4eba-c7e4-43eb-9ce2-95e1d200d10e.jpg",
// 	// 	name: "Treehouses",
// 	// },
// 	// {
// 	// 	image: "/assets/photos/categories/e22b0816-f0f3-42a0-a5db-e0f1fa93292b.jpg",
// 	// 	name: "Adapted",
// 	// },
// 	// {
// 	// 	image: "/assets/photos/categories/a6dd2bae-5fd0-4b28-b123-206783b5de1d.jpg",
// 	// 	name: "Desert",
// 	// },
// 	// {
// 	// 	image: "/assets/photos/categories/a4634ca6-1407-4864-ab97-6e141967d782.jpg",
// 	// 	name: "Lake",
// 	// },
// 	{
// 		image: "/assets/photos/categories/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg",
// 		name: "Farms",
// 	},
// 	// {
// 	// 	image: "/assets/photos/categories/4759a0a7-96a8-4dcd-9490-ed785af6df14.jpg",
// 	// 	name: "Yurts",
// 	// },
// 	// {
// 	// 	image: "/assets/photos/categories/60ff02ae-d4a2-4d18-a120-0dd274a95925.jpg",
// 	// 	name: "Vineyards",
// 	// },
// 	// {
// 	// 	image: "/assets/photos/categories/31c1d523-cc46-45b3-957a-da76c30c85f9.jpg",
// 	// 	name: "Campers",
// 	// },
// 	{
// 		image: "/assets/photos/categories/33dd714a-7b4a-4654-aaf0-f58ea887a688.jpg",
// 		name: "Historical homes",
// 	},
// 	{
// 		image: "/assets/photos/categories/d721318f-4752-417d-b4fa-77da3cbc3269.jpg",
// 		name: "Towers",
// 	},
// 	// {
// 	// 	image: "/assets/photos/categories/8a43b8c6-7eb4-421c-b3a9-1bd9fcb26622.jpg",
// 	// 	name: "Creative spaces",
// 	// },
// 	{
// 		image: "/assets/photos/categories/89faf9ae-bbbc-4bc4-aecd-cc15bf36cbca.jpg",
// 		name: "Domes",
// 	},
// 	// {
// 	// 	image: "/assets/photos/categories/ddd13204-a5ae-4532-898c-2e595b1bb15f.jpg",
// 	// 	name: "Chef's kitchen",
// 	// },
// 	{
// 		image: "/assets/photos/categories/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg",
// 		name: "Cabins",
// 	},
// 	{
// 		image: "/assets/photos/categories/c027ff1a-b89c-4331-ae04-f8dee1cdc287.jpg",
// 		name: "Houseboats",
// 	},
// 	{
// 		image: "/assets/photos/categories/33848f9e-8dd6-4777-b905-ed38342bacb9.jpg",
// 		name: "Trulli",
// 	},
// 	// {
// 	// 	image: "/assets/photos/categories/757deeaa-c78f-488f-992b-d3b1ecc06fc9.jpg",
// 	// 	name: "Ski-in/out",
// 	// },
// ];

export const Categories = () => {
	const { data: categories, isLoading, isError } = useCategories();

	const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true, loop: false, containScroll: "trimSnaps", align: "center", slidesToScroll: 3 });

	const [canScrollPrev, setCanScrollPrev] = useState(false);
	const [canScrollNext, setCanScrollNext] = useState(true);

	const scrollPrev = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.scrollPrev();

		setCanScrollNext(emblaApi?.canScrollNext());
		setCanScrollPrev(emblaApi?.canScrollPrev());
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.scrollNext();

		setCanScrollNext(emblaApi?.canScrollNext());
		setCanScrollPrev(emblaApi?.canScrollPrev());
	}, [emblaApi]);

	if (isLoading || isError) return <CategoriesSkeleton />;

	if (categories && categories.length <= 0) return null;

	return (
		<div className="">
			<div className="embla relative h-[65px]">
				<div className="embla__viewport h-full w-full" ref={emblaRef}>
					<div className="flex flex-nowrap h-full gap-6 md:gap-10">
						{categories?.map((category, i) => (
							// <CategorySkeleton key={i} />
							<Suspense fallback={<CategoryCardSkeleton />} key={i}>
								<CategoryCard category={category} />
							</Suspense>
						))}
					</div>
				</div>

				{canScrollPrev && (
					<div className="absolute z-20 left-0 top-0 bottom-0 bg-gradient-to-l from-transparent via-white to-white pr-4 flex items-center">
						<Button
							variant="ghost"
							className="embla__prev rounded-full aspect-square w-fit h-fit p-2 bg-white shadow-md hover:bg-white"
							onClick={scrollPrev}
							title="Prev"
						>
							{Icons.leftArrow({
								style: {
									display: "block",
									fill: "none",
									height: "12px",
									width: "12px",
									stroke: "currentcolor",
									strokeWidth: "5.33333",
									overflow: "visible",
								},
							})}
						</Button>
					</div>
				)}

				{canScrollNext && (
					<div className="absolute z-20 right-0 top-0 bottom-0 bg-gradient-to-r from-transparent via-white to-white pl-4 flex items-center">
						<Button
							variant="ghost"
							className="embla__next rounded-full aspect-square w-fit h-fit p-2 bg-white shadow-md hover:bg-white"
							onClick={scrollNext}
							title="Next"
						>
							{Icons.rightArrow({
								style: {
									display: "block",
									fill: "none",
									height: "12px",
									width: "12px",
									stroke: "currentcolor",
									strokeWidth: "5.33333",
									overflow: "visible",
								},
							})}
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export const CategoriesSkeleton = () => {
	return (
		<div className="">
			<div className="embla relative h-[65px]">
				<div className="embla__viewport h-full w-full">
					<div className="flex flex-nowrap h-full gap-6 md:gap-10">
						{[...Array(16)].map((_, i) => (
							<CategoryCardSkeleton key={i} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export const CategoryCard = ({ category }: { category: Category }) => {
	const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPropertyType = searchParams?.get("propertyType");
	const isActive = currentPropertyType === category.value;
	console.log("category isActive", isActive);
	
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const params = new URLSearchParams(searchParams as any);
	params.set("propertyType", category.value);
	console.log("category params", params);
	
	return (
		<Link href={`${pathname}?${params.toString()}`} className="flex-grow-0 flex text-sm shrink-0 basis-auto max-w-[100%] min-w-0">
			<Button
				className={cn(
					"w-full flex-col px-0 gap-1 select-none justify-between font-semibold text-black transition-all rounded-none duration-200 ease-in-out hover:bg-transparent h-full py-2.5",
					isActive ? "border-x-0 border-t-0 border-b-2 border-black" : "border-none opacity-70 hover:opacity-100"
				)}
				size="sm"
				variant="outline"
			>
				<div className="relative w-[22px] aspect-square">
					<Image src={category.image} alt={category.name} fill className="" />
				</div>
				<div>{category.name}</div>
			</Button>
		</Link>
	);
};

export const CategoryCardSkeleton = () => {
	return (
		<div className="flex-grow-0 text-sm flex shrink-0 basis-auto max-w-[100%] min-w-0">
			<div
				className={cn(
					"w-full flex-col gap-1 justify-between items-center flex px-0 select-none h-full py-2.5"
					// category.name === "Countryside" ? "border-x-0 border-t-0 border-b-2 border-black" : "border-none opacity-70 hover:opacity-100"
				)}
			>
				<Skeleton className="w-[29px] rounded-full aspect-square" />

				<Skeleton className="w-[50px] h-2" />
			</div>
		</div>
	);
};
