/*
  Warnings:

  - You are about to drop the column `name` on the `ContactInfo` table. All the data in the column will be lost.
  - Added the required column `fullName` to the `ContactInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ContactInfo` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `ContactInfo` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ContactInfo" DROP CONSTRAINT "ContactInfo_listingId_fkey";

-- AlterTable
ALTER TABLE "ContactInfo" DROP COLUMN "name",
ADD COLUMN     "alternatePhone" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "phone" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ContactInfo" ADD CONSTRAINT "ContactInfo_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
