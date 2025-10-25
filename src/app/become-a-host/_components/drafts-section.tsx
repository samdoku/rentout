"use client";

import React from "react";
import { api } from "@/lib/axios-instance";
import { IncompleteListingDTO } from "@/app/api/listings/incomplete/route";
import Image from "next/image";
import { properties } from "@/lib/constants";
import { PropertyType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

function labelForPropertyType(pt?: PropertyType | null) {
	if (!pt) return "place";
	const found = properties.find((type) => type.value === pt);
	return found ? found.label : "place";
}

function formatStarted(dateISO: string | Date) {
	const d = new Date(dateISO);
	const s = d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
	return `started ${s}`;
}

async function fetchDrafts(): Promise<IncompleteListingDTO[]> {
	const res = await api.get<IncompleteListingDTO[]>("/listings/incomplete");
	return res.data;
  }

export default function DraftsSection() {
	const router = useRouter();

	const {
		data: drafts,
		isLoading,
		isError,
		error,
	  } = useQuery({
		queryKey: ["incomplete-listings"],
		queryFn: fetchDrafts,
	  });


	// const [drafts, setDrafts] = useState<IncompleteListingDTO[]>([]);
	// const [loading, setLoading] = useState(true);
	// const [error, setError] = useState<Error | null>(null);

	if (isError) throw error;

	// useEffect(() => {
	// 	async function fetchDrafts() {
	// 		try {
	// 			const res = await api.get<IncompleteListingDTO[]>("/listings/incomplete");
	// 			console.log(res.data);
	// 			setDrafts(res.data);
	// 		} catch (err) {
	// 			console.error(err);
	// 			setError(err as Error);
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	}
	// 	fetchDrafts();
	// }, []);

	if (isLoading)
		return (
			<div className="uncomplete-listings w-full  mb-[75px]">
				<Skeleton className="mt-[25px] mb-3 w-full h-7 max-w-72" />

				<div className="uncompleted-listing flex w-full px-2 py-4 md:px-[18px] md:py-6 border border-gray-300 rounded-xl mt-3 cursor-pointer transition ease-in-out">
					<div className="uncompleted-listing-wrap flex items-center gap-[14px]">
						<div className="ucl-image">
							<Skeleton className="aspect-square w-[45px] h-[45px] object-cover rounded" />
						</div>
						<Skeleton className="w-full h-7 max-w-72" />
					</div>
				</div>
			</div>
		);
		if (!drafts || drafts.length === 0) return null;

	return (
		<div className="uncomplete-listings w-full  mb-[75px]">
			<h2 className="ucl-header font-semibold text-[22px] mt-[25px] mb-3 text-left text-neutral-700">Finish your listing</h2>

			{drafts.map((l, i) => {
				const label = labelForPropertyType(l.propertyType as PropertyType | null);
				const coverPhoto = l.photos.find((p) => p.isCover) ?? l.photos[0];
				const img = coverPhoto?.url ?? "/assets/photos/listing-placeholder.jpg";
				const step = l.currentStep || "overview";
				const href = `/become-a-host/${l.id}/${step}`;
				const description = l.title ?? `Your ${label} listing ${formatStarted(l.postedDate)}`
				return (
					<button
						key={i}
						onClick={() => router.push(href)}
						className="uncompleted-listing flex w-full px-2 py-4 md:px-[18px] md:py-6 border border-gray-300 rounded-xl mt-3 cursor-pointer transition ease-in-out hover:bg-neutral-100 hover:border-black"
					>
						<div className="uncompleted-listing-wrap flex items-center gap-[14px]">
							<div className="ucl-image">
								<Image
									src={img}
									alt={`${label} listing image`}
									className="aspect-square w-[45px] h-[45px] object-cover rounded"
									width={160}
									height={160}
								/>
							</div>
							<div className="ucl-started text-left text-[16px] font-semibold text-neutral-700">{description}</div>
						</div>
					</button>
				);
			})}
		</div>
	);
}
