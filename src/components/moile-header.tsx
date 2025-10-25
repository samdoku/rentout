"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Filter } from "./filter";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Input } from "./ui/input";

const placeholder = "Search by address, city, or neighbourhood";

export const MobileHeader = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [query, setQuery] = useState("");
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [open, setOpen] = useState(false);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const handleSearch = () => {
		console.log("Search for:", query);
		setOpen(false); // close dropdown
		// Update search params or navigate here
	};

	return (
		<header className="h-[70px]  w-full md:hidden max-w-screen-2xl 2xl:px-20 lg:px-10 md:px-8 px-4 mx-auto">
			<div className=" w-full  h-full flex flex-nowrap items-center justify-center">
				<Drawer>
					<DrawerTrigger asChild>
						<Button
							variant="outline"
							className="rounded-full  bg-transparent hover:bg-transparent overflow-hidden h-[48px] border-[#DDDDDD] border py-0 px-2 w-full justify-between shadow-[0_3px_10px_rgba(0,0,0,0.1)]"
							title="Search"
						>
							<div className="pl-2.5 ">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="32"
									height="32"
									viewBox="0 0 32 32"
									aria-hidden="true"
									role="presentation"
									focusable="false"
									style={{ display: "block", height: "16px", width: "16px", fill: "currentcolor" }}
								>
									<path
										d="M13 0a13 13 0 0 1 10.5 20.67l7.91 7.92-2.82 2.82-7.92-7.91A12.94 12.94 0 0 1 13 26a13 13 0 1 1 0-26zm0 4a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"
										fill="#222222"
									></path>
								</svg>
							</div>
							<div className="truncate font-semibold flex-1 text-left mr-4">{placeholder}</div>
						</Button>
					</DrawerTrigger>
					<DrawerContent className="max-h-svh overflow-hidden h-full rounded-t-[0px]">
						<DrawerHeader className="">
							<DrawerTitle>Search</DrawerTitle>
						</DrawerHeader>
						<div className="px-3">
							<div className="w-full flex gap-2  rounded-md items-center border-[#DDDDDD] border group group-focus-within::ring-1 group-focus-within:ring-ring">
								<div className="pl-2.5 ">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="32"
										height="32"
										viewBox="0 0 32 32"
										aria-hidden="true"
										role="presentation"
										focusable="false"
										style={{ display: "block", height: "16px", width: "16px", fill: "currentcolor" }}
									>
										<path
											d="M13 0a13 13 0 0 1 10.5 20.67l7.91 7.92-2.82 2.82-7.92-7.91A12.94 12.94 0 0 1 13 26a13 13 0 1 1 0-26zm0 4a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"
											fill="#222222"
										></path>
									</svg>
								</div>
								<Input
									placeholder={placeholder}
									className="w-full mr-4 border-none shadow-none focus-visible:ring-0 focus-visible:border-none focus-visible:shadow-none h-[48px] font-semibold rounded-none px-0 pr-2.5 flex-1"
								/>
							</div>
						</div>
					</DrawerContent>
				</Drawer>

				<Filter
					trigger={
						<Button
							variant="outline"
							className="rounded-full bg-transparent items-center justify-center hover:bg-transparent overflow-hidden ml-2 h-[48px] w-[48px] border-[#DDDDDD] border aspect-square shadow-[0_3px_10px_rgba(0,0,0,0.1)]"
							title="Filter"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								aria-hidden="true"
								role="presentation"
								focusable="false"
								style={{ display: "block", height: "16px", width: "16px", fill: "#2222222" }}
								width="16"
								height="16"
							>
								<path
									d="M5 8a3 3 0 0 1 2.83 2H14v2H7.83A3 3 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.83 4H2V4h6.17A3 3 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
									fill="#222222"
								></path>
							</svg>
						</Button>
					}
				/>
			</div>
		</header>
	);
};
