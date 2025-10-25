"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icons } from "./icons";
import { Filter } from "./filter";
import { useNavLinks } from "@/hooks/use-nav-links";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "./ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MobileHeader } from "./moile-header";

const placeholder = "Search by address, city, or neighbourhood";

export const Header = ({ showSearch = true, maxWidth = "max-w-screen-3xl" }: { showSearch?: boolean; maxWidth?: string }) => {
	// const { isLoaded, isSignedIn, sessionClaims, } = useAuth();

	const headerRef = useRef<HTMLElement>(null);
	const headerSearchRef = useRef<HTMLDivElement>(null);
	const searchBtnRef = useRef<HTMLButtonElement>(null);

	const [open, setOpen] = useState<boolean>(false);

	let lastScroll = 0;
	const handleWindowScroll = () => {
		console.log("scollY", window.scrollY);
		if (window.scrollY > lastScroll) {
			setOpen(false);
		}

		lastScroll = window.scrollY;
	};

	useEffect(() => {
		window.addEventListener("scroll", handleWindowScroll);

		return () => window.addEventListener("scroll", handleWindowScroll);
	}, []);

	return (
		<>
			<header className={cn("h-[80px] w-full hidden md:block max-w-screen-3xl 2xl:px-20 lg:px-10 md:px-8 px-4 mx-auto", maxWidth)} ref={headerRef}>
				<div className=" flex  items-center w-full h-full">
					<div className=" lg:flex-1 flex">
						<Link href="/" className="inline-flex items-center  gap-1 text-black font-semibold text-base">
							{Icons.house()} rentOut
						</Link>
					</div>

					{showSearch && (
						<div
							className="px-2 w-full max-w-[350px] data-[state=notOpen]:opacity-100 data-[state=isOpen]:opacity-0 data-[state=notOpen]:visible data-[state=isOpen]:invisible transition-all duration-150"
							data-state={open ? "isOpen" : "notOpen"}
						>
							<Button
								variant="outline"
								className="rounded-full bg-transparent hover:bg-transparent overflow-hidden h-[48px] border-black/40 py-0 px-2 w-full justify-between shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.18)]"
								title="Search"
								onClick={() => setOpen(true)}
							>
								<div className="pl-6 truncate font-semibold">{placeholder}</div>
								<div className="bg-black w-[32px] h-[32px] aspect-square rounded-full flex items-center justify-center">
									<svg
										viewBox="0 0 32 32"
										xmlns="http://www.w3.org/2000/svg"
										width="12"
										height="12"
										aria-hidden="true"
										role="presentation"
										focusable="false"
									>
										<g fill="none" stroke="#FFFFFF" strokeWidth="5.33333px">
											<path
												d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"
												stroke="#FFFFFF"
												fill="none"
												strokeWidth="5.33333px"
											></path>
										</g>
									</svg>
								</div>
							</Button>
						</div>
					)}

					<RightSide />
				</div>

				<div
					ref={headerSearchRef}
					data-state={open ? "isOpen" : "notOpen"}
					className="bg-white py-2 border-b shadow absolute left-0 right-0 w-full z-50 data-[state=notOpen]:opacity-0 data-[state=notOpen]:scale-x-0 data-[state=notOpen]:-translate-y-full data-[state=isOpen]:translate-y-0 data-[state=isOpen]:scale-x-100 data-[state=isOpen]:opacity-100 transition-all duration-200"
				>
					<div className="px-4 w-full  max-w-screen-md mx-auto ">
						<div className="flex bg-gray-300 rounded-full">
							<div className="w-full flex-1 rounded-full h-16  relative">
								<div className="absolute inset-0 bg-white rounded-full shadow-[0_3px_15px_7px_rgba(0,0,0,0.15)] overflow-hidden">
									<label className="flex  h-full items-center gap-x-2 flex-nowrap">
										<Input
											placeholder={placeholder}
											className="pl-4 truncate shadow-none border-none outline-none focus-visible:outline-none focus-visible:ring-0"
										/>
										<Button className="rounded-full h-11 w-11 mr-2" ref={searchBtnRef}>
											<div className="flex items-center justify-center">
												<svg
													viewBox="0 0 32 32"
													xmlns="http://www.w3.org/2000/svg"
													width="18"
													height="18"
													aria-hidden="true"
													role="presentation"
													focusable="false"
												>
													<g fill="none" stroke="#FFFFFF" strokeWidth="5.33333px">
														<path
															d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"
															stroke="#FFFFFF"
															fill="none"
															strokeWidth="5.33333px"
														></path>
													</g>
												</svg>
											</div>
										</Button>
									</label>
								</div>
							</div>
							{/* <div className="dates flex-1  rounded-full"></div>
						<div className="guests flex-1  rounded-full"></div> */}
						</div>
					</div>
				</div>
			</header>

			<MobileHeader />
		</>
	);
};

export const HeaderSkeleton = () => {
	return (
		<>
			<header className="h-[80px] w-full hidden md:block max-w-screen-3xl 2xl:px-20 lg:px-10 md:px-8 px-4 mx-auto">
				<div className=" flex  items-center w-full h-full">
					<div className=" lg:flex-1 flex">
						<div className="inline-flex items-center  gap-1 text-black font-semibold text-base">{Icons.house()} nestQuest</div>
					</div>

					<div className="px-2 w-full max-w-[350px]">
						<Button
							variant="outline"
							className="rounded-full bg-transparent hover:bg-transparent overflow-hidden h-[48px] border-black/40 py-0 px-2 w-full justify-between shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)]"
							title="Search"
						>
							<div className="pl-6 truncate font-semibold">{placeholder}</div>
							<div className="bg-black w-[32px] h-[32px] aspect-square rounded-full flex items-center justify-center">
								<svg
									viewBox="0 0 32 32"
									xmlns="http://www.w3.org/2000/svg"
									width="12"
									height="12"
									aria-hidden="true"
									role="presentation"
									focusable="false"
								>
									<g fill="none" stroke="#FFFFFF" strokeWidth="5.33333px">
										<path
											d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"
											stroke="#FFFFFF"
											fill="none"
											strokeWidth="5.33333px"
										></path>
									</g>
								</svg>
							</div>
						</Button>
					</div>

					<div className="flex-1 flex items-center justify-end  gap-2">
						<Button variant="ghost" className="rounded-full h-10 font-semibold text-sm shadow-none">
							Become a host
						</Button>
						<div className=" relative ">
							<Button
								variant="outline"
								className={cn(
									"rounded-full bg-transparent flex items-center p-1.5 h-10 shadow-none hover:bg-transparent",
									`shadow-[#0000002e_0_2px_4px] hover:shadow-[#0000002e_0_2px_4px]`
								)}
							>
								<div className="flex items-center justify-center pl-1.5">
									<svg
										width="16"
										height="16"
										viewBox="0 0 32 32"
										xmlns="http://www.w3.org/2000/svg"
										aria-hidden="true"
										role="presentation"
										focusable="false"
									>
										<g fill="none" fillRule="nonzero" stroke="#222222" strokeWidth="3px">
											<path d="m2 16h28" stroke="#222222" fill="none" strokeWidth="3px"></path>
											<path d="m2 24h28" stroke="#222222" fill="none" strokeWidth="3px"></path>
											<path d="m2 8h28" stroke="#222222" fill="none" strokeWidth="3px"></path>
										</g>
									</svg>
								</div>
								<div className="flex items-center justify-center">
									<svg
										viewBox="0 0 32 32"
										width="28"
										height="28"
										xmlns="http://www.w3.org/2000/svg"
										aria-hidden="true"
										role="presentation"
										focusable="false"
									>
										<path
											d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"
											fill="#717171"
										></path>
									</svg>
								</div>
							</Button>
						</div>
					</div>
				</div>
			</header>

			<header className="h-[70px]  w-full md:hidden max-w-screen-2xl 2xl:px-20 lg:px-10 md:px-8 px-4 mx-auto">
				<div className=" w-full h-full flex flex-nowrap items-center justify-center">
					<Button
						variant="outline"
						className="rounded-full bg-transparent hover:bg-transparent overflow-hidden h-[48px] border-[#DDDDDD] border py-0 px-2 w-full justify-between shadow-[0_3px_10px_rgba(0,0,0,0.1)]"
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
		</>
	);
};

// box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05)
// hover:box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);

// btn hover:box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18)

// shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.18)]

// box-shadow: 0 3px 15px 7px rgba(0, 0, 0, 0.15)
// box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
// box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
// box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
// box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
// box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
// 0 8px 28px rgba(0, 0, 0, 0.28)

export function UserIcon() {
	const { isLoaded, isSignedIn, user } = useUser();

	if (!isLoaded) {
		return (
			<div className="flex h-7 w-7 items-center justify-center " aria-busy="true">
				<Skeleton className="h-7 w-7 rounded-full" />
			</div>
		);
	}

	// Same size as your SVG: 28x28 => h-7 w-7
	if (!isSignedIn) {
		return (
			<div className="flex h-7 w-7 items-center justify-center ">
				<svg viewBox="0 0 32 32" width="28" height="28" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false">
					<path
						d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"
						fill="#717171"
					></path>
				</svg>
			</div>
		);
	}

	const initials = (user?.firstName?.[0] ?? "") + (user?.lastName?.[0] ?? "");

	return (
		<Avatar className="h-7 w-7">
			<AvatarImage src={user?.imageUrl ?? ""} alt={user?.fullName ?? "Account"} />
			<AvatarFallback className="text-[10px] text-neutral-500 uppercase">
				{initials || (
					<svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
						<path
							d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"
							fill="currentColor"
						/>
					</svg>
				)}
			</AvatarFallback>
		</Avatar>
	);
}

export const RightSide = () => {
	const items = useNavLinks();
	// const { isLoaded, isSignedIn, sessionClaims } = useAuth();

	return (
		<div className="flex-1 flex items-center justify-end  gap-2">
			<Link href={"/host-homes"} className="rounded-full">
				<Button variant="ghost" className="rounded-full h-10 font-semibold text-sm shadow-none">
					Become a host
				</Button>
			</Link>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						className={cn(
							"rounded-full bg-transparent flex items-center p-1.5 h-10 shadow-none hover:bg-transparent",
							`data-[state=open]:shadow-[#0000002e_0_2px_4px] hover:shadow-[#0000002e_0_2px_4px] aria-[expanded=true]:shadow-md`
						)}
					>
						<div className="flex items-center justify-center pl-1.5">
							<svg
								width="16"
								height="16"
								viewBox="0 0 32 32"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
								role="presentation"
								focusable="false"
							>
								<g fill="none" fillRule="nonzero" stroke="#222222" strokeWidth="3px">
									<path d="m2 16h28" stroke="#222222" fill="none" strokeWidth="3px"></path>
									<path d="m2 24h28" stroke="#222222" fill="none" strokeWidth="3px"></path>
									<path d="m2 8h28" stroke="#222222" fill="none" strokeWidth="3px"></path>
								</g>
							</svg>
						</div>
						<UserIcon />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent
					align="end"
					sideOffset={8}
					className="bg-white px-0 rounded-[16px] z-[100] max-h-[calc(100vh_-_150px)] shadow-[#0000001a_0_3px_6px_4px] w-[240px] transition-all duration-150"
				>
					{items.map((item, i) =>
						"href" in item ? (
							<DropdownMenuItem
								asChild
								key={i}
								className="px-3 cursor-pointer capitalize py-2 text-sm hover:bg-black/5 focus:bg-black/5 border-b last:border-b-0 rounded-none"
							>
								<Link href={item.href} className="w-full">
									{item.label}
								</Link>
							</DropdownMenuItem>
						) : (
							<DropdownMenuItem
								asChild
								key={i}
								className="px-3 cursor-pointer py-2 text-sm hover:bg-black/5 focus:bg-black/5 border-b last:border-b-0 rounded-none"
							>
								<button type="button" onClick={item.onClick} className="w-full text-left">
									{item.label}
								</button>
							</DropdownMenuItem>
						)
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
