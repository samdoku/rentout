"use client";

import React, { useState, useEffect, useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./EmblaCarouselThumbsButton";
import "./embla.css";
// import { Icons } from "../icons";
import { Button } from "../button";

type PropType = {
	slides: number[];
	options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
	const { slides, options } = props;
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
	const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
		containScroll: "keepSnaps",
		dragFree: true,
	});

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

	const scrollPrev = useCallback(() => {
		if (emblaMainApi) emblaMainApi.scrollPrev();
	}, [emblaMainApi]);

	const scrollNext = useCallback(() => {
		if (emblaMainApi) emblaMainApi.scrollNext();
	}, [emblaMainApi]);

	return (
		<div className="embla w-full mark relative">
			<div className="embla__viewport" ref={emblaMainRef}>
				<div className="embla__container">
					{slides.map((index) => (
						<div className="embla__slide mark" key={index}>
							<div className="embla__slide__number">{index + 1}</div>
						</div>
					))}
				</div>
			</div>

			<Button variant="ghost" className="embla__prev absolute hover:bg-transparent top-1/2 z-10 left-0 -translate-y-1/2 h-full" onClick={scrollPrev}>
				{/* {Icons.leftArrow({style:{ display: "block", fill: "none", height: "16px", width: "16px", stroke: "currentcolor", strokeWidth: "4.33333", overflow: "visible" }})} */}
			</Button>
			<Button variant="ghost" className="embla__next absolute hover:bg-transparent top-1/2 z-10 right-0 -translate-y-1/2 h-full" onClick={scrollNext}>
				{/* {Icons.rightArrow({style:{ display: "block", fill: "none", height: "16px", width: "16px", stroke: "currentcolor", strokeWidth: "4.33333", overflow: "visible" }})} */}
			</Button>

			<div className="embla-thumbs mark-b absolute bottom-0 left-1/2 -translate-x-1/2">
				<div className="embla-thumbs__viewport max-w-xs" ref={emblaThumbsRef}>
					<div className="embla-thumbs__container flex-nowrap">
						{slides.map((index) => (
							<Thumb key={index} onClick={() => onThumbClick(index)} selected={index === selectedIndex} index={index} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default EmblaCarousel;
