-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('Draft', 'Published', 'Archived');

-- CreateEnum
CREATE TYPE "PrivacyType" AS ENUM ('EntirePlace', 'Room', 'SharedRoom');

-- CreateEnum
CREATE TYPE "Highlight" AS ENUM ('HighSpeedInternetAccess', 'WasherDryer', 'AirConditioning', 'Heating', 'SmokeFree', 'CableReady', 'SatelliteTV', 'DoubleVanities', 'TubShower', 'Intercom', 'SprinklerSystem', 'RecentlyRenovated', 'CloseToTransit', 'GreatView', 'QuietNeighborhood');

-- CreateEnum
CREATE TYPE "Amenity" AS ENUM ('wifi', 'tv', 'kitchen', 'washer', 'freeParkingOnPremises', 'paidParkingOnPremises', 'airConditioning', 'dedicatedWorkspace', 'pool', 'hotTub', 'outdoorDiningArea', 'firePit', 'poolTable', 'indoorFireplace', 'piano', 'exerciseEquipment', 'lakeAccess', 'beachAccess', 'outdoorShower', 'smokeAlarm', 'firstAidKit', 'fireExtinguisher', 'carbonMonoxideAlarm');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('House', 'Hotel', 'GuestHouse', 'Apartment', 'EarthHome', 'BedAndBreakfast', 'Dome');

-- CreateEnum
CREATE TYPE "OccupancyType" AS ENUM ('Me', 'Roommates', 'Family', 'OtherGuests');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('Pending', 'Denied', 'Approved');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('Pending', 'Confirmed', 'Declined', 'Canceled', 'Completed');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('Pending', 'Paid', 'PartiallyPaid', 'Overdue');

-- CreateEnum
CREATE TYPE "ManagerStatus" AS ENUM ('Active', 'Suspended', 'Banned');

-- CreateEnum
CREATE TYPE "PricingType" AS ENUM ('DAY', 'WEEK', 'MONTH', 'YEAR');

-- CreateEnum
CREATE TYPE "BookingType" AS ENUM ('REQUEST', 'INSTANT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "email" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "profilePhotoUrl" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isHost" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Host" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bio" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "rating" DOUBLE PRECISION DEFAULT 0,
    "numberOfReviews" INTEGER DEFAULT 0,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "ManagerStatus" NOT NULL DEFAULT 'Active',

    CONSTRAINT "Host_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Listing" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "price" DOUBLE PRECISION,
    "pricingType" "PricingType" NOT NULL DEFAULT 'DAY',
    "securityDeposit" DOUBLE PRECISION,
    "applicationFee" DOUBLE PRECISION,
    "amenities" "Amenity"[] DEFAULT ARRAY[]::"Amenity"[],
    "highlights" "Highlight"[] DEFAULT ARRAY[]::"Highlight"[],
    "occupancy" "OccupancyType"[] DEFAULT ARRAY[]::"OccupancyType"[],
    "isPetsAllowed" BOOLEAN NOT NULL DEFAULT false,
    "isParkingIncluded" BOOLEAN NOT NULL DEFAULT false,
    "baths" DOUBLE PRECISION,
    "squareFeet" INTEGER,
    "propertyType" "PropertyType",
    "privacyType" "PrivacyType",
    "guests" INTEGER NOT NULL DEFAULT 1,
    "bedrooms" INTEGER NOT NULL DEFAULT 0,
    "beds" INTEGER NOT NULL DEFAULT 0,
    "postedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "averageRating" DOUBLE PRECISION DEFAULT 0,
    "numberOfReviews" INTEGER DEFAULT 0,
    "locationId" TEXT,
    "hostId" TEXT NOT NULL,
    "status" "ListingStatus" NOT NULL DEFAULT 'Draft',
    "bookingType" "BookingType",
    "currentStep" TEXT,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "coordinates" geography(Point, 4326),

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "isCover" BOOLEAN NOT NULL DEFAULT false,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wishlist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WishlistItem" (
    "id" TEXT NOT NULL,
    "wishlistId" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WishlistItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecentlyViewed" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecentlyViewed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" "PropertyType" NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_externalId_key" ON "User"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Host_userId_key" ON "Host"("userId");

-- CreateIndex
CREATE INDEX "Photo_listingId_idx" ON "Photo"("listingId");

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_userId_name_key" ON "Wishlist"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "WishlistItem_wishlistId_listingId_key" ON "WishlistItem"("wishlistId", "listingId");

-- CreateIndex
CREATE INDEX "RecentlyViewed_userId_viewedAt_idx" ON "RecentlyViewed"("userId", "viewedAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "RecentlyViewed_userId_listingId_key" ON "RecentlyViewed"("userId", "listingId");

-- AddForeignKey
ALTER TABLE "Host" ADD CONSTRAINT "Host_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishlistItem" ADD CONSTRAINT "WishlistItem_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "Wishlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishlistItem" ADD CONSTRAINT "WishlistItem_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecentlyViewed" ADD CONSTRAINT "RecentlyViewed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecentlyViewed" ADD CONSTRAINT "RecentlyViewed_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
