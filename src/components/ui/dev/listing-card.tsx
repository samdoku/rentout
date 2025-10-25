import { Star } from "lucide-react";
import AirbnbCarousel from "./images-carousel";

export type Listing = {
  title: string;
  subtitle: string;
  beds: number;
  price: string;
  nights: number;
  rating: number;
  reviews: number;
  images: { src: string; alt?: string }[];
};

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <div className="group">
      <AirbnbCarousel images={listing.images} />
      <div className="mt-3 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base font-semibold leading-tight">{listing.title}</h3>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-current" />
            <span>{listing.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({listing.reviews})</span>
          </div>
        </div>
        <p className="truncate text-sm text-muted-foreground">{listing.subtitle}</p>
        <p className="text-sm text-muted-foreground">{listing.beds} bed{listing.beds > 1 ? "s" : ""}</p>
        <p className="text-[15px]"><span className="underline">{listing.price}</span> <span className="text-muted-foreground">for {listing.nights} night{listing.nights > 1 ? "s" : ""}</span></p>
      </div>
    </div>
  );
}
