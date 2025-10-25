"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

import React, { useState } from "react";

export const Drawer = () => {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>close</Button>

			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ y: "100%" }}
						animate={{ y: "0%" }}
						exit={{ y: "100%" }}
						transition={{ type: "spring", damping: 30, stiffness: 300 }}
						drag="y"
						dragConstraints={{ top: 0, bottom: 0 }}
						className="fixed w-full h-[calc(100vh_-_180px)] bottom-0 left-0 right-0 bg-white rounded-t-lg z-30"
					>
						<motion.div className="mark">
							<div className="">
								<Button onClick={() => setOpen(false)}>close</Button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};
