"use client";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "./ui/drawer";

export const ExploreListingDrawer = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			{/* <DrawerTrigger asChild>
				<Button className="z-50">Map</Button>
			</DrawerTrigger> */}
			<DrawerContent overlay={false} className="max-h-[calc(100vh-140px)] overflow-hidden h-full z-20">
				<DrawerHeader className="mark hidden">
					<DrawerTitle>Filter</DrawerTitle>
				</DrawerHeader>
			</DrawerContent>
		</Drawer>
	);
};
