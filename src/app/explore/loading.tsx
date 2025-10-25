import { Loader } from "@/components/ui/loader";
import React from "react";

const Loading = () => {
	return (
		<div className="w-full h-full flex items-center justify-center">
			<Loader />
		</div>
	);
};

export default Loading;
