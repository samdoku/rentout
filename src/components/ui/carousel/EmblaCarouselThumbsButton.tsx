import React from "react";

type PropType = {
	selected: boolean;
	index: number;
	onClick: () => void;
};

export const Thumb: React.FC<PropType> = (props) => {
	const { selected, onClick } = props;

	return (
		<div
			className={"embla-thumbs__slide mark rounded-lg overflow-hidden".concat(
				selected ? " embla-thumbs__slide--selected" : ""
			)}
		>
			<button
				onClick={onClick}
				type="button"
				className="embla-thumbs__slide__number w-full h-full aspect-square relative"
			>
				{/* <Image src='/assets/watch.jpg' fill alt='' className='object-cover aspect-square' /> */}
			</button>
		</div>
	);
};
