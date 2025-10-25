"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type StepHeaderProps = {
	onSaveExit?: () => void;
	loading?: boolean;
	isDisabled?: boolean;
};

export const Header = ({ onSaveExit, loading, isDisabled }: StepHeaderProps) => {
	const pathname = usePathname();

	return (
		<header className=" pt-5 pb-1 mx-auto  w-full">
			<div className="flex items-center justify-between ">
				<div>
					<Link href="/explore" className=" flex">
						<div className="flex items-center justify-center">{Icons.house({ style: { width: "35px", height: "35px" } })}</div>
					</Link>
				</div>
				<div className="flex items-center  flex-nowrap gap-x-2">
					{pathname === "/become-a-host" && (
						<Button variant="secondary" className="rounded-full font-semibold">
							Questions?
						</Button>
					)}

					<Button variant="outline" className="rounded-full font-semibold">
						Exit
					</Button>
					{pathname !== "/become-a-host" && (
						<Button disabled={isDisabled || loading} onClick={onSaveExit} variant="outline" className="rounded-full font-semibold">
							Save & Exit
						</Button>
					)}
				</div>
			</div>
		</header>
	);
};
