import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type PropType = {
	selected: boolean;
	index: number;
	onClick: () => void;
};

export const Thumb: React.FC<PropType> = (props) => {
	const { selected, onClick } = props;

	return (
		<div className={"embla-thumbs__slide flex overflow-hidden".concat(selected ? " embla-thumbs__slide--selected " : "")}>
			<Button
				variant="ghost"
				onClick={onClick}
				className={cn("h-2 w-2 p-0 rounded-full transition-all duration-500 bg-white/60", selected && "w-4 bg-white")}
			></Button>
			{/* <button onClick={onClick} type="button" className="embla-thumbs__slide__number w-12 h-12">
			</button> */}
		</div>
	);
};
