"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Skeleton } from "../ui/skeleton";
import { Loader } from "../ui/loader";


mapboxgl.accessToken = process.env.MAPBOX_TOKEN as string; // Prefer NEXT_PUBLIC_MAPBOX_TOKEN for client-side

type Props = {
	initialLng?: number;
	initialLat?: number;
	initialZoom?: number;
	styleUrl?: string;
};

export default function Map({
	initialLng = -0.186964,
	initialLat = 5.603717,
	initialZoom = 9,
	styleUrl = "mapbox://styles/sam-boi0768/cmc62esbk026z01sd74eng2ts",
}: Props) {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const mapRef = useRef<mapboxgl.Map | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);

	// Surface init errors to the ErrorBoundary
	if (error) throw error;

	useEffect(() => {
		if (!containerRef.current || mapRef.current) return;

		try {
			if (!mapboxgl.accessToken) {
				throw new Error("Missing Mapbox access token");
			}

			// ✅ Proactively detect WebGL support (and major perf caveats)
			const supported = mapboxgl.supported({ failIfMajorPerformanceCaveat: true });
			if (!supported) {
				throw new Error("WebGL is not available or disabled in this browser");
			}

			const map = new mapboxgl.Map({
				container: containerRef.current,
				style: styleUrl ?? undefined,
				center: [initialLng, initialLat],
				zoom: initialZoom,
			});
			mapRef.current = map;

			map.addControl(new mapboxgl.NavigationControl(), "top-right");
			map.addControl(new mapboxgl.GeolocateControl({ trackUserLocation: true }));

			const onLoad = () => setIsLoaded(true);
			map.once("load", onLoad);

			// If Mapbox emits an error after init, surface it
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const onError = (e: any) => {
				setError(new Error(e?.error?.message || "Mapbox encountered an error"));
			};
			map.on("error", onError);

			return () => {
				map.off("error", onError);
				map.remove();
				mapRef.current = null;
				setIsLoaded(false);
			};
		} catch (e) {
			setError(e instanceof Error ? e : new Error("Failed to initialize map"));
		}
	}, [initialLng, initialLat, initialZoom, styleUrl]);

	return (
		<div className="relative w-full h-full">
			<div ref={containerRef} className="absolute inset-0" />
			{!isLoaded && !error && <MapLoading />}
		</div>
	);
}

export const MapLoading = () => {
	return (
		<div className="w-full h-full relative">
			<Skeleton className="w-full h-full rounded-none" />
			<div className="absolute rounded-3xl bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-2 px-4 shadow-[rgba(0,0,0,0.15)_0px_2px_8px]">
				<Loader className="w-1.5 h-1.5" />
			</div>
		</div>
	);
};

// "use client";

// import { useEffect, useRef, useState } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import { Skeleton } from "../ui/skeleton";
// import { Loader } from "../ui/loader";

// mapboxgl.accessToken = process.env.MAPBOX_TOKEN as string; // make sure this is exposed to the client

// type Props = {
//   initialLng?: number;
//   initialLat?: number;
//   initialZoom?: number;
//   styleUrl?: string;
// };

// export default function Map({
//   initialLng = -74.5,
//   initialLat = 40,
//   initialZoom = 9,
//   styleUrl = "mapbox://styles/sam-boi0768/cmc62esbk026z01sd74eng2ts", // e.g. 'mapbox://styles/mapbox/streets-v12'
// }: Props) {
//   const wrapperRef = useRef<HTMLDivElement | null>(null);
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const mapRef = useRef<mapboxgl.Map | null>(null);

//   const [isLoading, setIsLoading] = useState(true);
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);

//   useEffect(() => {
//     if (!containerRef.current || mapRef.current) return;

//     if (!mapboxgl.accessToken) {
//       setErrorMsg("Missing MAPBOX_TOKEN.");
//       setIsLoading(false);
//       return;
//     }
//     if (!mapboxgl.supported()) {
//       setErrorMsg("Your browser does not support Mapbox GL.");
//       setIsLoading(false);
//       return;
//     }

//     const map = new mapboxgl.Map({
//       container: containerRef.current,
//       style: styleUrl ?? undefined,
//       center: [initialLng, initialLat],
//       zoom: initialZoom,
//     });
//     mapRef.current = map;

//     // Optional controls
//     map.addControl(new mapboxgl.NavigationControl(), "top-right");
//     map.addControl(new mapboxgl.GeolocateControl({ trackUserLocation: true }));

//     const onLoad = () => setIsLoading(false);
//     const onError = (e: any) => {
//       // Mapbox fires lots of tile errors; only show blocking errors before style loads
//       if (!map.isStyleLoaded()) {
//         const msg =
//           e?.error?.message ||
//           e?.error?.statusText ||
//           "Failed to load the map.";
//         setErrorMsg(msg);
//         setIsLoading(false);
//       }
//     };

//     map.on("load", onLoad);
//     map.on("error", onError);

//     return () => {
//       map.off("load", onLoad);
//       map.off("error", onError);
//       map.remove();
//       mapRef.current = null;
//     };
//   }, [initialLng, initialLat, initialZoom, styleUrl]);

//   return (
//     <div ref={wrapperRef} className="relative w-full h-full">
//       {/* Map fills parent */}
//       <div ref={containerRef} className="absolute inset-0" />

//       {/* Loading overlay */}
//       {isLoading && !errorMsg && (
//         <div className="absolute inset-0">
//           <Skeleton className="w-full h-full rounded-none" />
//           <div className="absolute rounded-3xl bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-2 px-4 shadow-[rgba(0,0,0,0.15)_0px_2px_8px]">
//             <Loader className="w-1.5 h-1.5" />
//           </div>
//         </div>
//       )}

//       {/* Error overlay */}
//       {errorMsg && (
//         <div className="absolute inset-0 grid place-items-center">
//           <div className="max-w-sm rounded-md border bg-white p-4 text-center shadow-sm">
//             <p className="text-sm text-red-600 font-medium">Map error</p>
//             <p className="mt-1 text-sm text-black/80">{errorMsg}</p>
//             <p className="mt-2 text-xs text-black/60">
//               Check your <code>MAPBOX_TOKEN</code> and <code>styleUrl</code>.
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /** Skeleton-only version you can use as a Suspense/dynamic import fallback elsewhere */
// export const MapLoading = () => {
//   return (
//     <div className="w-full h-full relative">
//       <Skeleton className="w-full h-full rounded-none" />
//       <div className="absolute rounded-3xl bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-2 px-4 shadow-[rgba(0,0,0,0.15)_0px_2px_8px]">
//         <Loader className="w-1.5 h-1.5" />
//       </div>
//     </div>
//   );
// };
