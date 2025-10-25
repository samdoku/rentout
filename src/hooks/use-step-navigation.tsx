import { flatPages } from "@/lib/constants";
import { usePathname } from "next/navigation";

export function useStepNavigation() {
	const pathname = usePathname();
	const slug = pathname.split("/").pop() as string;

	const index = flatPages.indexOf(slug);
	if (index === -1) return { back: undefined, next: undefined };

	return {
		current: slug,
		back: index > 0 ? flatPages[index - 1] : undefined,
		next: index < flatPages.length - 1 ? flatPages[index + 1] : undefined,
	};
}
