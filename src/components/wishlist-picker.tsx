"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { CreateWishlistDialog } from "./create-wishlist-dialog";

interface WishlistPickerProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	wishlists: { id: string; name: string }[];
	onSelect: (wishlistId: string) => void;
	onCreate: () => void;
	onRemove?: () => void;
	isInWishlist: boolean;
}

export const WishlistPicker: React.FC<WishlistPickerProps> = ({ open, onOpenChange, wishlists, onSelect, onRemove, isInWishlist }) => {
	const isMobile = useIsMobile();
	const [createOpen, setCreateOpen] = useState(false);

	const Content = (
		<div className="space-y-3">
			{wishlists?.length ? (
				wishlists.map((wishlist) => (
					<Button key={wishlist.id} className="w-full justify-start" variant="ghost" onClick={() => onSelect(wishlist.id)}>
						{wishlist.name}
					</Button>
				))
			) : (
				<p className="text-sm text-muted-foreground">You have no wishlists yet.</p>
			)}

			<Button variant="outline" onClick={() => setCreateOpen(true)} className="w-full">
				+ Create new wishlist
			</Button>

			{isInWishlist && (
				<Button variant="destructive" className="w-full" onClick={onRemove}>
					Remove from Wishlist
				</Button>
			)}

			<CreateWishlistDialog
				open={createOpen}
				onOpenChange={setCreateOpen}
				onCreated={(wishlist) => {
					onSelect(wishlist.id); // ✅ Auto-select newly created wishlist
					setCreateOpen(false); // close after creating
				}}
			/>
		</div>
	);

	return isMobile ? (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Add to Wishlist</DrawerTitle>
				</DrawerHeader>
				<div className="p-4">{Content}</div>
			</DrawerContent>
		</Drawer>
	) : (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add to Wishlist</DialogTitle>
				</DialogHeader>
				{Content}
			</DialogContent>
		</Dialog>
	);
};
