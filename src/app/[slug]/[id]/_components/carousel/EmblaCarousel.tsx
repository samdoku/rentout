"use client";

import React, { useState, useEffect, useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./EmblaCarouselThumbsButton";
import "./embla.css";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";
import { WishlistHeart } from "@/components/wishlist-heart";

type PropType = {
	images: string[];
	options?: EmblaOptionsType;
	listing: {
		id: string;
		hostId: string;
	};
	currentUserId?: string;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
	const router = useRouter();

	const { images, options, listing, currentUserId } = props;
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
	const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
		containScroll: "keepSnaps",
		dragFree: true,
	});

	const [canScrollPrev, setCanScrollPrev] = useState(false);
	const [canScrollNext, setCanScrollNext] = useState(true);

	const onThumbClick = useCallback(
		(index: number) => {
			if (!emblaMainApi || !emblaThumbsApi) return;
			emblaMainApi.scrollTo(index);
		},
		[emblaMainApi, emblaThumbsApi]
	);

	const onSelect = useCallback(() => {
		if (!emblaMainApi || !emblaThumbsApi) return;
		setSelectedIndex(emblaMainApi.selectedScrollSnap());
		emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
	}, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

	useEffect(() => {
		if (!emblaMainApi) return;
		onSelect();

		emblaMainApi.on("select", onSelect).on("reInit", onSelect);
	}, [emblaMainApi, onSelect]);

	const scrollPrev = useCallback(
		(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			e.preventDefault();

			if (!emblaMainApi) return;
			emblaMainApi.scrollPrev();

			setCanScrollNext(emblaMainApi?.canScrollNext());
			setCanScrollPrev(emblaMainApi?.canScrollPrev());
		},
		[emblaMainApi]
	);

	const scrollNext = useCallback(
		(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			e.preventDefault();

			if (!emblaMainApi) return;
			emblaMainApi.scrollNext();

			setCanScrollNext(emblaMainApi?.canScrollNext());
			setCanScrollPrev(emblaMainApi?.canScrollPrev());
		},
		[emblaMainApi]
	);

	const goBack = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();

		router.push("/explore");
	};

	return (
		<div className="embla rounded-2xl w-full group relative">
			<div className="embla__viewport w-full" ref={emblaMainRef}>
				<div className="embla__container w-full rounded-2xl">
					{images.map((url, index) => (
						<div className="embla__slide relative w-full h-full gap-0" key={index}>
							<Image
								src={url}
								alt={`Listing image ${index + 1}`}
								className="aspect-square object-cover w-full"
								width={400}
								height={400}
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							/>
						</div>
					))}
				</div>
				<div className="absolute top-0 left-0 w-fit mt-2 ml-4">
					<Button className="rounded-full aspect-square p-1 bg-white hover:bg-white shadow-md" onClick={goBack}>
						{Icons.leftArrow({
							style: {
								display: "block",
								fill: "none",
								height: "16px",
								width: "16px",
								stroke: "#000000",
								strokeWidth: "4.33333",
								overflow: "visible",
							},
						})}
					</Button>
					<div className="absolute top-0 right-0 m-4 mt-2 mr-4">
						<WishlistHeart listingId={listing.id} hostId={listing.hostId} currentUserId={currentUserId} />
					</div>
				</div>
			</div>

			{canScrollPrev && (
				<Button
					variant="ghost"
					size="sm"
					className="embla__prev bg-white shadow-md absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 duration-300 hover:bg-white top-1/2 z-10 left-2 -translate-y-1/2 rounded-full p-0 aspect-square"
					onClick={scrollPrev}
				>
					{Icons.leftArrow({
						style: {
							display: "block",
							fill: "none",
							height: "16px",
							width: "16px",
							stroke: "currentcolor",
							strokeWidth: "4.33333",
							overflow: "visible",
						},
					})}
				</Button>
			)}

			{canScrollNext && (
				<Button
					variant="ghost"
					size="sm"
					className="embla__next bg-white shadow-md absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 duration-300 hover:bg-white top-1/2 z-10 right-2 -translate-y-1/2 rounded-full p-0 aspect-square"
					onClick={scrollNext}
				>
					{Icons.rightArrow({
						style: {
							display: "block",
							fill: "none",
							height: "16px",
							width: "16px",
							stroke: "currentcolor",
							strokeWidth: "4.33333",
							overflow: "visible",
						},
					})}
				</Button>
			)}

			<div className="text-white font-semibold bg-black/35 absolute bottom-0 right-0 m-4 py-2 px-3 rounded-lg">1/2</div>
			<div className="embla-thumbs absolute bottom-2 left-1/2 -translate-x-1/2">
				<div className="embla-thumbs__viewport w-full max-w-16" ref={emblaThumbsRef}>
					<div className="embla-thumbs__container flex-nowrap">
						{images.map((_, index) => (
							<Thumb key={index} onClick={() => onThumbClick(index)} selected={index === selectedIndex} index={index} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default EmblaCarousel;
