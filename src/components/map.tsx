// // "use client";

// // import "mapbox-gl/dist/mapbox-gl.css";
// // import Map, {
// //   Popup,
// //   Marker,
// //   NavigationControl,
// //   FullscreenControl,
// //   GeolocateControl,
// //   ScaleControl,
// //   ViewStateChangeEvent,
// //   MapLayerMouseEvent
// // } from "react-map-gl";
// // import { useState, useMemo, useEffect, useRef } from "react";
// // import Supercluster from "supercluster";
// // import mapboxgl from "mapbox-gl";
// // import type { MapRef } from "react-map-gl";

// // const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;

// // type ClusterType = {
// //   id?: number;
// //   geometry: { coordinates: [number, number] };
// //   properties: {
// //     cluster: boolean;
// //     point_count?: number;
// //     listingId?: string;
// //     title?: string;
// //     price?: number;
// //   };
// // };

// // type Listing = {
// //   id: string;
// //   title: string;
// //   latitude: number;
// //   longitude: number;
// //   price: number;
// // };

// // type Props = {
// //   listings: Listing[];
// //   initialLng?: number;
// //   initialLat?: number;
// //   initialZoom?: number;
// //   styleUrl?: string;
// // };

// // export default function ClusteredListingsMap({
// //   listings,
// //   initialLng = -74.5,
// //   initialLat = 40,
// //   initialZoom = 9,
// //   styleUrl = "mapbox://styles/mapbox/streets-v12",
// // }: Props) {
// //   const [selected, setSelected] = useState<Listing | null>(null);
// //   const [bounds, setBounds] = useState<[number, number, number, number] | null>(null);
// //   const [zoom, setZoom] = useState(initialZoom);

// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError] = useState<Error | null>(null);
// //   const mapRef = useRef<MapRef>(null)

// //   // Surface init errors to the ErrorBoundary
// // 	if (error) throw error;

// //   useEffect(() => {

// //     if (!mapboxgl.accessToken) {
// //       throw new Error("Missing Mapbox access token");
// //     }

// //     // ✅ Proactively detect WebGL support (and major perf caveats)
// //     const supported = mapboxgl.supported({ failIfMajorPerformanceCaveat: true });
// //     if (!supported) {
// //       throw new Error("WebGL is not available or disabled in this browser");
// //     }

// //     if (isLoading) {
// //       console.log("Map is loading...");
// //     } else {
// //       console.log("Map finished loading ✅");
// //     }
// //   }, [isLoading,initialLat,initialLng, initialZoom, styleUrl]);

// //   // prepare geojson features for supercluster
// //   const points = listings.map((l) => ({
// //     type: "Feature" as const,
// //     properties: { cluster: false, listingId: l.id, title: l.title, price: l.price },
// //     geometry: { type: "Point" as const, coordinates: [l.longitude, l.latitude] },
// //   }));

// //   // build the cluster index
// //   const supercluster = useMemo(
// //     () =>
// //       new Supercluster({
// //         radius: 60, // px radius to cluster
// //         maxZoom: 20,
// //       }).load(points),
// //     [points]
// //   );

// //   const clusters = useMemo(() => {
// //     if (!bounds) return [];
// //     return supercluster.getClusters(bounds, Math.round(zoom));
// //   }, [supercluster, bounds, zoom]);

// //   return (
// //     <div className="w-full h-full relative">
// //       {isLoading && !error && (
// //         <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
// //           <div className="rounded-3xl bg-white py-2 px-4 shadow-[rgba(0,0,0,0.15)_0px_2px_8px]">
// //         <Loader className="w-1.5 h-1.5" />
// //       </div>
// //         </div>
// //       )}

// //     <Map
// //     ref={mapRef}
// //       mapboxAccessToken={MAPBOX_TOKEN}
// //       initialViewState={{ longitude: initialLng, latitude: initialLat, zoom: initialZoom }}
// //       mapStyle={styleUrl}
// //       onLoad={() => setIsLoading(false)}
// //       onIdle={() => setIsLoading(false)}
// //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
// //       onError={(e: any) => {
// //         console.error("Mapbox error:", e.error.message);
// //         setError(new Error(e?.error?.message || "Something went wrong loading the map."))
// //         setIsLoading(false);
// //       }}
// //       style={{ width: "100%", height: "100%" }}
// //       onMove={(evt: ViewStateChangeEvent) => {
// //         const { viewState } = evt;
// //         setZoom(viewState.zoom);
// //         if (evt.target.getBounds) {
// //           const b = mapRef.current?.getBounds().toArray().flat() as [number, number, number, number];
// //           setBounds(b);
// //         }
// //       }}
// //     >
// //       {/* Controls */}
// //       <NavigationControl position="top-right" />
// //         <FullscreenControl position="top-right" />
// //         <GeolocateControl position="top-left" trackUserLocation={true} />
// //         <ScaleControl position="bottom-left" />

// //       {/* Render clusters & markers */}
// //       {clusters.map((cluster: ClusterType) => {
// //         const [lng, lat] = cluster.geometry.coordinates;
// //         const { cluster: isCluster, point_count: pointCount } = cluster.properties;

// //         if (isCluster) {
// //           return (
// //             <Marker
// //               key={`cluster-${cluster.id}`}
// //               longitude={lng}
// //               latitude={lat}
// //               onClick={(e: MapLayerMouseEvent) => {
// //                 e.originalEvent.stopPropagation();
// //                 const expansionZoom = Math.min(
// //                   supercluster.getClusterExpansionZoom(cluster.id),
// //                   20
// //                 );
// //                 mapRef.current?.flyTo({
// //                   center: [lng, lat],
// //                   zoom: expansionZoom,
// //                   duration: 500,
// //                 });              }}
// //             >
// //               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white shadow cursor-pointer">
// //                 {pointCount}
// //               </div>
// //             </Marker>
// //           );
// //         }

// //         // single listing marker
// //         const { listingId, price } = cluster.properties;
// //         const listing = listings.find((l) => l.id === listingId)!;
// //         return (
// //           <Marker
// //             key={listing.id}
// //             longitude={lng}
// //             latitude={lat}
// //             onClick={(e: MapLayerMouseEvent) => {
// //               e.originalEvent.stopPropagation();
// //               setSelected(listing);
// //             }}
// //           >
// //             <div className="rounded-full bg-white border px-2 py-1 text-xs font-semibold shadow cursor-pointer">
// //               ${price}
// //             </div>
// //           </Marker>
// //         );
// //       })}

// //       {/* Popup when marker clicked */}
// //       {selected && (
// //         <Popup
// //           longitude={selected.longitude}
// //           latitude={selected.latitude}
// //           onClose={() => setSelected(null)}
// //           closeOnClick={false}
// //           anchor={selected.latitude > mapRef.current?.getCenter().lat ? "top" : "bottom"}
// //         >
// //           <div>
// //             <h3 className="font-semibold">{selected.title}</h3>
// //             <p>${selected.price} / night</p>
// //           </div>
// //         </Popup>
// //       )}
// //     </Map>
// //     </div>

// //   );
// // }

// // // export const MapLoading = () => {
// // //   return (
// // //       <div className="w-full h-full">
// // //         <Skeleton className="w-full h-full rounded-none" />
// // //       <div className="absolute rounded-3xl bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-2 px-4 shadow-[rgba(0,0,0,0.15)_0px_2px_8px]">
// // //         <Loader className="w-1.5 h-1.5" />
// // //       </div>
// // //       </div>
// // //   );
// // // };

// "use client";

// import "mapbox-gl/dist/mapbox-gl.css";
// import Map, {
// 	Popup,
// 	Marker,
// 	NavigationControl,
// 	FullscreenControl,
// 	GeolocateControl,
// 	ScaleControl,
// 	ViewStateChangeEvent,
// 	MapLayerMouseEvent,
// } from "react-map-gl";
// import { useState, useMemo, useEffect, useRef } from "react";
// import Supercluster, { PointFeature, ClusterFeature } from "supercluster";
// import mapboxgl from "mapbox-gl";
// import type { MapRef } from "react-map-gl";
// import { Loader } from "./ui/loader";

// const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;

// type ListingProperties = {
// 	cluster: boolean;
// 	point_count?: number;
// 	listingId?: string;
// 	title?: string;
// 	price?: number;
// };

// type ClusteredFeature = PointFeature<ListingProperties> | ClusterFeature<ListingProperties>;

// type Listing = {
// 	id: string;
// 	title: string;
// 	latitude: number;
// 	longitude: number;
// 	price: number;
// };

// type Props = {
// 	listings: Listing[];
// 	initialLng?: number;
// 	initialLat?: number;
// 	initialZoom?: number;
// 	styleUrl?: string;
// };

// export default function ClusteredListingsMap({
// 	listings,
// 	initialLng = -74.5,
// 	initialLat = 40,
// 	initialZoom = 9,
// 	styleUrl = "mapbox://styles/mapbox/streets-v12",
// }: Props) {
// 	const [selected, setSelected] = useState<Listing | null>(null);
// 	const [bounds, setBounds] = useState<[number, number, number, number] | null>(null);
// 	const [zoom, setZoom] = useState(initialZoom);

// 	const [isLoading, setIsLoading] = useState(true);
// 	const [error, setError] = useState<Error | null>(null);
// 	const mapRef = useRef<MapRef>(null);

// 	// Surface init errors to the ErrorBoundary
// 	if (error) throw error;

// 	useEffect(() => {
// 		if (!mapboxgl.accessToken) {
// 			throw new Error("Missing Mapbox access token");
// 		}

// 		// ✅ Proactively detect WebGL support (and major perf caveats)
// 		const supported = mapboxgl.supported({ failIfMajorPerformanceCaveat: true });
// 		if (!supported) {
// 			throw new Error("WebGL is not available or disabled in this browser");
// 		}

// 		if (isLoading) {
// 			console.log("Map is loading...");
// 		} else {
// 			console.log("Map finished loading ✅");
// 		}
// 	}, [isLoading, initialLat, initialLng, initialZoom, styleUrl]);

// 	// prepare geojson features for supercluster
// 	const points = listings.map((l) => ({
// 		type: "Feature" as const,
// 		properties: { cluster: false, listingId: l.id, title: l.title, price: l.price },
// 		geometry: { type: "Point" as const, coordinates: [l.longitude, l.latitude] },
// 	}));

// 	// build the cluster index
// 	const supercluster = useMemo(
// 		() =>
// 			new Supercluster<ListingProperties>({
// 				radius: 60,
// 				maxZoom: 20,
// 			}).load(points),
// 		[points]
// 	);

// 	const clusters: ClusteredFeature[] = useMemo(() => {
// 		if (!bounds) return [];
// 		return supercluster.getClusters(bounds, Math.round(zoom));
// 	}, [supercluster, bounds, zoom]);

// 	return (
// 		<div className="w-full h-full relative">
// 			{isLoading && !error && (
// 				<div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
// 					<div className="rounded-3xl bg-white py-2 px-4 shadow-[rgba(0,0,0,0.15)_0px_2px_8px]">
// 						<Loader className="w-1.5 h-1.5" />
// 					</div>
// 				</div>
// 			)}

// 			<Map
// 				ref={mapRef}
// 				mapboxAccessToken={MAPBOX_TOKEN}
// 				initialViewState={{ longitude: initialLng, latitude: initialLat, zoom: initialZoom }}
// 				mapStyle={styleUrl}
// 				onLoad={() => setIsLoading(false)}
// 				onIdle={() => setIsLoading(false)}
// 				// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 				onError={(e: any) => {
// 					console.error("Mapbox error:", e.error.message);
// 					setError(new Error(e?.error?.message || "Something went wrong loading the map."));
// 					setIsLoading(false);
// 				}}
// 				style={{ width: "100%", height: "100%" }}
// 				onMove={(evt: ViewStateChangeEvent) => {
// 					const { viewState } = evt;
// 					setZoom(viewState.zoom);
// 					if (evt.target.getBounds) {
// 						const b = mapRef.current?.getBounds().toArray().flat() as [number, number, number, number];
// 						setBounds(b);
// 					}
// 				}}
// 			>
// 				{/* Controls */}
// 				<NavigationControl position="top-right" />
// 				<FullscreenControl position="top-right" />
// 				<GeolocateControl position="top-left" trackUserLocation={true} />
// 				<ScaleControl position="bottom-left" />

// 				{/* Render clusters & markers */}
// 				{clusters.map((cluster) => {
// 					const [lng, lat] = cluster.geometry.coordinates;

// 					if ("cluster" in cluster.properties && cluster.properties.cluster) {
// 						const pointCount = cluster.properties.point_count;
// 						const expansionZoom = supercluster.getClusterExpansionZoom(cluster.id as number);

// 						return (
// 							<Marker
// 								key={`cluster-${cluster.id}`}
// 								longitude={lng}
// 								latitude={lat}
// 								onClick={(e: MapLayerMouseEvent) => {
// 									e.originalEvent.stopPropagation();
// 									mapRef.current?.flyTo({
// 										center: [lng, lat],
// 										zoom: Math.min(expansionZoom, 20),
// 										duration: 500,
// 									});
// 								}}
// 							>
// 								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white shadow cursor-pointer">
// 									{pointCount}
// 								</div>
// 							</Marker>
// 						);
// 					}

// 					// single listing marker
// 					const { listingId, price } = cluster.properties;
// 					const listing = listings.find((l) => l.id === listingId)!;
// 					return (
// 						<Marker
// 							key={listing.id}
// 							longitude={lng}
// 							latitude={lat}
// 							onClick={(e: MapLayerMouseEvent) => {
// 								e.originalEvent.stopPropagation();
// 								setSelected(listing);
// 							}}
// 						>
// 							<div className="rounded-full bg-white border px-2 py-1 text-xs font-semibold shadow cursor-pointer">${price}</div>
// 						</Marker>
// 					);
// 				})}

// 				{/* Popup when marker clicked */}
// 				{selected && (
// 					<Popup
// 						longitude={selected.longitude}
// 						latitude={selected.latitude}
// 						onClose={() => setSelected(null)}
// 						closeOnClick={false}
// 						anchor={selected.latitude > mapRef.current?.getCenter().lat ? "top" : "bottom"}
// 					>
// 						<div>
// 							<h3 className="font-semibold">{selected.title}</h3>
// 							<p>${selected.price} / night</p>
// 						</div>
// 					</Popup>
// 				)}
// 			</Map>
// 		</div>
// 	);
// }

// // export const MapLoading = () => {
// //   return (
// //       <div className="w-full h-full">
// //         <Skeleton className="w-full h-full rounded-none" />
// //       <div className="absolute rounded-3xl bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-2 px-4 shadow-[rgba(0,0,0,0.15)_0px_2px_8px]">
// //         <Loader className="w-1.5 h-1.5" />
// //       </div>
// //       </div>
// //   );
// // };
