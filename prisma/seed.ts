import { PrismaClient, PropertyType } from "@prisma/client";

const prisma = new PrismaClient();


async function main() {
  await prisma.category.createMany({
    data: [
      {
        name: "House",
        value: PropertyType.House,
        image: "https://rentout.t3.storage.dev/categories/35919456-df89-4024-ad50-5fcb7a472df9.jpg",
      },
      {
        name: "Hotel",
        value: PropertyType.Hotel,
        image: "https://rentout.t3.storage.dev/categories/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg",
      },
      {
        name: "Guest House",
        value: PropertyType.GuestHouse,
        image: "https://rentout.t3.storage.dev/categories/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg",
      },
      {
        name: "Apartment",
        value: PropertyType.Apartment,
        image: "https://rentout.t3.storage.dev/categories/78ba8486-6ba6-4a43-a56d-f556189193da.jpg",
      },
      {
        name: "Earth Home",
        value: PropertyType.EarthHome,
        image: "https://rentout.t3.storage.dev/categories/33848f9e-8dd6-4777-b905-ed38342bacb9.jpg",
      },
      {
        name: "Bed & Breakfast",
        value: PropertyType.BedAndBreakfast,
        image: "https://rentout.t3.storage.dev/categories/5ed8f7c7-2e1f-43a8-9a39-4edfc81a3325.jpg",
      },
      {
        name: "Dome",
        value: PropertyType.Dome,
        image: "https://rentout.t3.storage.dev/categories/89faf9ae-bbbc-4bc4-aecd-cc15bf36cbca.jpg",
      },
    ],
  });
}

main()
  .then(() => console.log("✅ Categories seeded"))
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());






