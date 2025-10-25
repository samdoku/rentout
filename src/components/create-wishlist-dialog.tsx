"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios-instance";
import { useIsMobile } from "@/hooks/use-mobile";
import { Wishlist } from "@prisma/client";
import { toast } from "sonner";

interface CreateWishlistDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onCreated: (wishlist: Wishlist) => void; // 👈 Pass new wishlist back
}

export function CreateWishlistDialog({ open, onOpenChange, onCreated }: CreateWishlistDialogProps) {
	const [name, setName] = useState("");

	const createWishlist = useMutation({
		mutationFn: async (data: { name: string }) => {
			const res = await api.post<Wishlist>("/wishlists", data);
			return res.data;
		},
		onSuccess: (wishlist) => {
			setName("");
			toast.success(`Wishlist "${wishlist.name}" created`);
			onOpenChange(false);
			onCreated(wishlist); // 👈 notify parent
		},
		onError: () => {
			toast.error("Failed to create wishlist");
		},
	});

	const handleSubmit = () => {
		if (!name.trim()) return;
		createWishlist.mutate({ name });
	};

	const isMobile = useIsMobile();

	return isMobile ? (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerContent className="p-4 space-y-4">
				<DrawerHeader>
					<DrawerTitle>Create Wishlist</DrawerTitle>
				</DrawerHeader>
				<Input placeholder="Wishlist name" value={name} onChange={(e) => setName(e.target.value)} />
				<Button className="w-full" onClick={handleSubmit} disabled={createWishlist.isPending}>
					{createWishlist.isPending ? "Creating..." : "Create"}
				</Button>
			</DrawerContent>
		</Drawer>
	) : (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="space-y-4">
				<DialogHeader>
					<DialogTitle>Create Wishlist</DialogTitle>
				</DialogHeader>
				<Input placeholder="Wishlist name" value={name} onChange={(e) => setName(e.target.value)} />
				<Button className="w-full" onClick={handleSubmit} disabled={createWishlist.isPending}>
					{createWishlist.isPending ? "Creating..." : "Create"}
				</Button>
			</DialogContent>
		</Dialog>
	);
}
