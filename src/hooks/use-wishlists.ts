"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios-instance";
import { Listing } from "@prisma/client";
import { toast } from "sonner";

export type WishlistItem = {
	id: string;
	listingId: string;
	note?: string | null;
	listing: Listing; // Replace with your Listing type if you have it
};

export type Wishlist = {
	id: string;
	name: string;
	userId: string;
	items: WishlistItem[];
	createdAt: string;
};

// --- Fetch all wishlists ---
export const useWishlists = (currentUserId?: string) => {
	return useQuery<Wishlist[]>({
		queryKey: ["wishlists"],
		queryFn: async () => {
			const { data } = await api.get("/wishlists");
			return data;
		},
		enabled: !!currentUserId,
	});
};

// --- Create new wishlist ---
export const useCreateWishlist = (onCreated?: (wishlist: Wishlist) => void) => {
	const queryClient = useQueryClient();

	return useMutation<Wishlist, Error, { name: string }>({
		mutationFn: async (data) => {
			const res = await api.post<Wishlist>("/wishlists", data);
			return res.data;
		},
		onSuccess: (wishlist) => {
			queryClient.invalidateQueries({ queryKey: ["wishlists"] }); // Refresh wishlists cache
			onCreated?.(wishlist); // Notify parent if callback provided
		},
	});
};

// --- Add item to wishlist ---
export const useAddWishlistItem = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ wishlistId, listingId, note }: { wishlistId: string; listingId: string; note?: string }) => {
			const { data } = await api.post(`/wishlists/${wishlistId}/items`, {
				data: { listingId, note },
			});
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["wishlists"] });
			toast.success("Added to wishlist ❤️");
		},
		onError: (err) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			if ((err as any)?.response?.status === 409) {
				toast.error("This listing is already in the wishlist");
			} else {
				toast.error("Failed to add to wishlist");
			}
		},
	});
};

// --- Remove item from wishlist ---
export const useRemoveWishlistItem = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ wishlistId, listingId }: { wishlistId: string; listingId: string }) => {
			const { data } = await api.delete(`/wishlists/${wishlistId}/items`, {
				data: { listingId },
			});
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["wishlists"] });
			toast.success("Removed from wishlist 💔");
		},
		onError: () => {
			toast.error("Failed to remove from wishlist");
		},
	});
};
