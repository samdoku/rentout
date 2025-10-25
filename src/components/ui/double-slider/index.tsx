"use client";

import React from "react";
// import "./style.css";

export const DoubleSlider = () => {
	return (
		<div className="relative h-1.5 bg-gray-400 w-full">
			<span className="absolute h-full bg-red-400"></span>
			<input
				type="range"
				name="min"
				className="absolute range-input w-full [background:none] top-1/2 -translate-y-1/2 pointer-events-none appearance-none"
			/>
			<input
				type="range"
				name="max"
				className="absolute range-input w-full [background:none] top-1/2 -translate-y-1/2 pointer-events-none appearance-none"
			/>
		</div>
	);
};
