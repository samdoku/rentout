"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { WishlistPicker } from "@/components/wishlist-picker";
import { useAddWishlistItem, useRemoveWishlistItem, useWishlists } from "@/hooks/use-wishlists";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface WishlistHeartProps {
	listingId: string;
	hostId: string;
	currentUserId?: string; // undefined if user not logged in
}

export const WishlistHeart: React.FC<WishlistHeartProps> = ({ listingId, hostId, currentUserId }) => {
	const router = useRouter();
	const [isPickerOpen, setIsPickerOpen] = useState(false);

	const { data: wishlists } = useWishlists(currentUserId);

	const addWishlistItem = useAddWishlistItem();
	const removeWishlistItem = useRemoveWishlistItem();

	const existingWishlistItem = wishlists?.flatMap((w) => w.items).find((item) => item.listingId === listingId);
	const isInWishlist = Boolean(existingWishlistItem);

	const handleAddToWishlist = (wishlistId: string) => {
		addWishlistItem.mutate(
			{ wishlistId, listingId },
			{
				onSuccess: () => setIsPickerOpen(false),
			}
		);
	};

	const handleRemoveFromWishlist = () => {
		if (!existingWishlistItem) return;
		removeWishlistItem.mutate({
			wishlistId: existingWishlistItem.id,
			listingId,
		});
	};

	if (currentUserId === hostId) return null; // hide heart for host's own listing

	return (
		<>
			<Button
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();

					if (!currentUserId) {
						toast("Please log in to save to wishlist", {
							action: {
								label: "Log in",
								onClick: () => router.push("/sign-in"),
							},
						});
						return;
					}

					setIsPickerOpen(true);
				}}
				className="rounded-full aspect-square p-1 shadow-none bg-transparent border-none hover:bg-transparent"
				variant="outline"
			>
				{isInWishlist ? Icons.heartFilled() : Icons.wish()}
			</Button>

			{currentUserId && (
				<WishlistPicker
					open={isPickerOpen}
					onOpenChange={setIsPickerOpen}
					wishlists={wishlists ?? []}
					isInWishlist={isInWishlist}
					onSelect={handleAddToWishlist}
					onCreate={() => console.log("TODO: open create wishlist modal")}
					onRemove={handleRemoveFromWishlist}
				/>
			)}
		</>
	);
};
