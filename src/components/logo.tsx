import Link from "next/link";
import React from "react";
import { Icons } from "./icons";

export const Logo = () => {
	return (
		<div>
			<Link href="/" className="inline-flex items-center gap-1 text-[#b14077]">
				{Icons.house()} adVantage
			</Link>
		</div>
	);
};
