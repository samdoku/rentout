import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { flatPages } from "./constants";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getStepNavigation(slug: string) {
	const index = flatPages.indexOf(slug);
	if (index === -1) return { back: undefined, next: undefined };

	return {
		back: index > 0 ? flatPages[index - 1] : undefined,
		next: index < flatPages.length - 1 ? flatPages[index + 1] : undefined,
	};
}
