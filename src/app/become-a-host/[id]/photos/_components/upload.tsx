"use client";

import { Button } from "@/components/ui/button";
import React, { Dispatch, SetStateAction, useCallback } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Icons } from "./icons";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { api } from "@/lib/axios-instance";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";

// const MIN_FILES = 5;
const MAX_FILES = 10;

type Photo = {
	id: string;
	file?: File;
	key: string;
	url: string;
	isCover: boolean;
	progress?: number;
	uploading?: boolean;
	position:number;
};

export const Upload = ({ listingId, photos, setPhotos }: { listingId: string; photos: Photo[]; setPhotos: Dispatch<SetStateAction<Photo[]>> }) => {

	// ---- Mutations ----
	const uploadFile = async (file: File, tempId: string) => {
		try {
			const { data } = await api.post<{ uploadUrl: string; key: string }>("/s3/upload", {
				contentType: file.type,
			});

			console.log(data)

			const { uploadUrl, key } = data;

			await api.put(uploadUrl, file, {
				headers: { "Content-Type": file.type },
				withCredentials: false,
				onUploadProgress: (progressEvent) => {
					const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 1));
					setPhotos((prev) => prev.map((p) => (p.id === tempId ? { ...p, progress: percent, uploading: percent < 100 } : p)));
				},
			});

			// Save photo in DB
			const res = await api.post("/listings/photos", { key, listingId });
			setPhotos((prev) => prev.map((p) => (p.id === tempId ? { ...p, id: res.data.id, key, url: res.data.url, position: res.data.position, isCover: res.data.isCover, uploading: false } : p)));

			toast.success("Photo uploaded!");
		} catch (err) {
			console.error(err);
			setPhotos((prev) => prev.filter((p) => p.id !== tempId));
			toast.error(`Failed to upload ${file.name}`);
		}
	};

	const handleDelete = async (photo: Photo) => {
		try {
			await api.delete(`/listings/photos/${photo.id}`);
			setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
			toast.success("Photo deleted");
		} catch (err) {
			console.error(err);
			toast.error("Failed to delete photo");
		}
	};

	const handleSetCover = async (photo: Photo) => {
		try {
			await api.patch(`/listing/photos/${photo.id}/cover`);
			setPhotos((prev) => prev.map((p) => ({ ...p, isCover: p.id === photo.id })));
			toast.success("Cover photo updated");
		} catch {
			toast.error("Failed to update cover photo");
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const handleMove = async (photo: Photo, direction: "forward" | "back") => {
		const idx = photos.findIndex((p) => p.id === photo.id);
		if ((direction === "back" && idx === 0) || (direction === "forward" && idx === photos.length - 1)) return;

		const newOrder = [...photos];
		const swapIndex = direction === "back" ? idx - 1 : idx + 1;
		[newOrder[idx], newOrder[swapIndex]] = [newOrder[swapIndex], newOrder[idx]];
		setPhotos(newOrder);

		try {
			await api.patch("/listing/photos/reorder", {
				order: newOrder.map((p) => p.id),
			});
		} catch {
			toast.error("Failed to reorder photos");
		}
	};

	const onDrop = useCallback(async (acceptedFiles: File[]) => {
		console.log("acceptedFiles", acceptedFiles);
		if (photos.length + acceptedFiles.length > MAX_FILES) {
			toast.error(`Max ${MAX_FILES} photos allowed`);
			return;
		}

		const currentMaxPosition = photos.length > 0 ? Math.max(...photos.map((p) => p.position ?? 0)) : -1;

		acceptedFiles.forEach((file, index) => {
			const tempId = crypto.randomUUID();
			setPhotos((prev) => [
				...prev,
				{
					id: tempId,
					file,
					key: "",
					url: URL.createObjectURL(file),
					isCover: photos.length === 0 && index === 0,
					progress: 0,
					uploading: true,
					position: currentMaxPosition + index + 1,
				},
			]);
			uploadFile(file, tempId);
		});
	}, []);

	const onDropRejected = useCallback(async (fileRejections: FileRejection[]) => {
		console.log("fileRejections", fileRejections);

		if (fileRejections.length > 0) {
			const tooManyFiles = fileRejections.find((fileRejection) => fileRejection.errors[0].code === "too-many-files");
			const fileTooLarge = fileRejections.find((fileRejection) => fileRejection.errors[0].code === "file-too-large");

			if (tooManyFiles) toast.error(`Too many files. You can only upload ${MAX_FILES} files at a time`);
			if (fileTooLarge) toast.error(`File size is too large`);
		}
	}, []);

	const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
		// Disable click and keydown behavior
		noClick: true,
		noKeyboard: true,
		maxSize: 1024 * 1024 * 3,
		accept: {
			"image/*": [".jpeg", ".png", ".jpg", ".webp"],
		},
		onDrop,
		maxFiles: MAX_FILES,
		onDropRejected,
	});

	return (
		<div className="w-full">
			<div className="w-full h-[220px] md:h-[65vh] md:min-h-[300px] md:max-h-[min(200px,50vh)]">
				<div {...getRootProps({ className: "dropzone w-full h-full" })}>
					<div className={cn("w-full h-full border-2 rounded-lg overflow-hidden", isDragActive ? "border-black" : "border-dashed border-black/30")}>
						<input {...getInputProps()} />
						<div className="w-full h-full md:p-20 relative">
							{isDragActive && (
								<div className="absolute inset-0 flex items-center justify-center bg-transparent backdrop-blur-md">
									<div className="font-semibold text-lg">Drop photos here</div>
								</div>
							)}
							<div className="p-2 text-center w-full h-full flex items-center justify-center flex-col">
								<div>{Icons.photos()}</div>
								<div className="font-semibold text-base md:text-lg py-2">Drag your photos here</div>
								<div className="text-sm pb-2">Choose at least 5 photos</div>
								<div>
									<Button variant="ghost" className="bg-transparent hover:bg-transparent underline font-semibold p-0 h-fit" onClick={open}>
										Upload from your device
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Photo Grid */}
			<div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
				{photos.map((photo) => (
					<div key={photo.id} className="relative group aspect-square rounded-lg overflow-hidden border">
						<Image src={photo.url} alt={photo.file?.name ?? ""} sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 33vw" fill className="object-cover w-full h-full" />
						{photo.isCover && <span className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">Cover</span>}
						{/* Loader */}
						{photo.uploading && (
							<div className="absolute inset-0 bg-black/40 flex items-center justify-center">
								<div className="w-12 h-12 rounded-full border-4 border-white border-t-transparent animate-spin"></div>
								<span className="absolute text-white text-sm">{photo.progress}%</span>
							</div>
						)}
						{/* 3-dot Menu */}
						{!photo.uploading && (
							<div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="outline" className="bg-white h-8 rounded-full p-1 shadow aspect-square">
											<MoreHorizontal className="h-6 w-6" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent
									align="end"
									sideOffset={8}
									>
										<DropdownMenuItem onClick={() => handleSetCover(photo)}>{photo.isCover ? "Cover Photo ✓" : "Use as Cover"}</DropdownMenuItem>
										{/* <DropdownMenuItem onClick={() => handleMove(photo, "back")}>Move Back</DropdownMenuItem> */}
										{/* <DropdownMenuItem onClick={() => handleMove(photo, "forward")}>Move Forward</DropdownMenuItem> */}
										<DropdownMenuItem className="text-red-600" onClick={() => handleDelete(photo)}>
											Delete
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

// "use client";

// import { useState, useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import Image from "next/image";
// import { toast } from "sonner";
// import { MoreVertical, Loader2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { cn } from "@/lib/utils";

// type Photo = {
//   id: string;
//   url: string;
//   isCover: boolean;
//   position: number;
//   uploading?: boolean;
//   progress?: number;
// };

// export default function ListingPhotos({
//   listingId,
//   initialPhotos,
// }: {
//   listingId: string;
//   initialPhotos: Photo[];
// }) {
//   const queryClient = useQueryClient();
//   const [photos, setPhotos] = useState<Photo[]>(initialPhotos);

//   // ---- Mutations ----
//   const uploadPhoto = useMutation({
//     mutationFn: async (file: File) => {
//       // 1. Get presigned URL
//       const { data } = await axios.post("/api/upload", {
//         contentType: file.type,
//       });
//       const { uploadUrl, key } = data;

//       // 2. Add temporary "uploading" photo to state
//       const tempId = `temp-${crypto.randomUUID()}`;
//       setPhotos((prev) => [
//         ...prev,
//         {
//           id: tempId,
//           url: URL.createObjectURL(file),
//           isCover: false,
//           position: prev.length,
//           uploading: true,
//           progress: 0,
//         },
//       ]);

//       // 3. Upload to S3 with progress tracking
//       await axios.put(uploadUrl, file, {
//         headers: { "Content-Type": file.type },
//         onUploadProgress: (e) => {
//           setPhotos((prev) =>
//             prev.map((p) =>
//               p.id === tempId
//                 ? { ...p, progress: Math.round((e.loaded * 100) / (e.total ?? 1)) }
//                 : p
//             )
//           );
//         },
//       });

//       // 4. Save to DB
//       const createRes = await axios.post("/api/listing/photos", {
//         key,
//         listingId,
//       });
//       return { newPhoto: createRes.data, tempId };
//     },
//     onSuccess: ({ newPhoto, tempId }) => {
//       setPhotos((prev) =>
//         prev.map((p) =>
//           p.id === tempId ? { ...newPhoto, uploading: false, progress: 100 } : p
//         )
//       );
//       queryClient.invalidateQueries({ queryKey: ["listing-photos", listingId] });
//     },
//     onError: (_, __, ctx) => {
//       setPhotos((prev) => prev.filter((p) => !p.id.startsWith("temp-")));
//       toast.error("Failed to upload photo.");
//     },
//   });

//   const deletePhoto = useMutation({
//     mutationFn: async (id: string) => {
//       await axios.delete(`/api/listing/photos/${id}`);
//       return id;
//     },
//     onSuccess: (id) => {
//       setPhotos((prev) => prev.filter((p) => p.id !== id));
//       queryClient.invalidateQueries({ queryKey: ["listing-photos", listingId] });
//     },
//   });

//   const reorderPhoto = useMutation({
//     mutationFn: async ({ id, direction }: { id: string; direction: "forward" | "backward" }) => {
//       await axios.patch(`/api/listing/photos/${id}/reorder`, { direction });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["listing-photos", listingId] });
//     },
//   });

//   const setCover = useMutation({
//     mutationFn: async (id: string) => {
//       await axios.patch(`/api/listing/photos/${id}/cover`);
//       return id;
//     },
//     onSuccess: (id) => {
//       setPhotos((prev) =>
//         prev.map((p) => ({ ...p, isCover: p.id === id }))
//       );
//     },
//   });

//   // ---- Dropzone ----
//   const onDrop = useCallback(
//     (acceptedFiles: File[]) => {
//       if (photos.length + acceptedFiles.length > 10) {
//         toast.error("You can only upload up to 10 photos.");
//         return;
//       }
//       acceptedFiles.forEach((file) => uploadPhoto.mutate(file));
//     },
//     [photos, uploadPhoto]
//   );

//   const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
//     accept: { "image/*": [".jpeg", ".png", ".jpg", ".webp"] },
//     maxFiles: 10,
//     noClick: true,
//     noKeyboard: true,
//     onDrop,
//   });

//   return (
//     <div>
//       {/* Dropzone */}
//       <div
//         {...getRootProps({
//           className:
//             "w-full h-[200px] border-2 border-dashed border-black/30 rounded-lg flex flex-col items-center justify-center cursor-pointer mb-6",
//         })}
//       >
//         <input {...getInputProps()} />
//         <p className="text-center">
//           {isDragActive ? "Drop photos here..." : "Drag & drop or click to upload"}
//         </p>
//         <Button
//           variant="outline"
//           onClick={open}
//           disabled={photos.filter((p) => p.uploading).length > 0 || photos.length >= 10}
//         >
//           Upload from device
//         </Button>
//       </div>

//       {/* Photos grid */}
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//         {photos.map((photo) => (
//           <div key={photo.id} className="relative rounded-lg overflow-hidden">
//             <Image
//               src={photo.url}
//               alt=""
//               width={300}
//               height={200}
//               className={cn("object-cover w-full h-40", photo.uploading && "opacity-70")}
//             />

//             {/* Spinner overlay while uploading */}
//             {photo.uploading && (
//               <div className="absolute inset-0 flex items-center justify-center bg-black/50">
//                 <div className="w-10 h-10 rounded-full border-2 border-white border-t-transparent animate-spin" />
//               </div>
//             )}

//             {photo.isCover && (
//               <span className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
//                 Cover
//               </span>
//             )}

//             {/* Actions Menu */}
//             {!photo.uploading && (
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <button className="absolute top-2 right-2 bg-black/50 rounded-full p-1 hover:bg-black/70">
//                     <MoreVertical className="w-4 h-4 text-white" />
//                   </button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent>
//                   <DropdownMenuItem onClick={() => setCover.mutate(photo.id)}>
//                     Set as Cover
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => reorderPhoto.mutate({ id: photo.id, direction: "backward" })}>
//                     Move Backward
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => reorderPhoto.mutate({ id: photo.id, direction: "forward" })}>
//                     Move Forward
//                   </DropdownMenuItem>
//                   <DropdownMenuItem
//                     className="text-red-600"
//                     onClick={() => deletePhoto.mutate(photo.id)}
//                   >
//                     Delete
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
