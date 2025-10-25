import { Icons as StructureIcons } from "@/components/icons/structure.icons";
import { PricingType } from "@prisma/client";
import { JSX } from "react";

export enum ProperyTypeEnum {
	House = "House",
	Hotel = "Hotel",
	GuestHouse = "GuestHouse",
	Apartment = "Apartment",
	EarthHome = "EarthHome",
	Dome = "Dome",
	BedAndBreakfast = "BedAndBreakfast",
}

export const ProperyTypeIcons: Record<ProperyTypeEnum, JSX.Element> = {
	House: StructureIcons.house(),
	Hotel: StructureIcons.hotel(),
	GuestHouse: StructureIcons.guesthouse(),
	Apartment: StructureIcons.apartment(),
	EarthHome: StructureIcons.earthHome(),
	Dome: StructureIcons.dome(),
	BedAndBreakfast: StructureIcons.bedAndBreakfast(),
};

export type PropertyItem = {
	value: ProperyTypeEnum;
	label: string;
	icon: JSX.Element;
};

export const properties: PropertyItem[] = [
	{ value: ProperyTypeEnum.House, label: "House", icon: StructureIcons.house() },
	{ value: ProperyTypeEnum.Apartment, label: "Apartment", icon: StructureIcons.apartment() },
	{ value: ProperyTypeEnum.GuestHouse, label: "Guesthouse", icon: StructureIcons.guesthouse() },
	{ value: ProperyTypeEnum.BedAndBreakfast, label: "Bed & breakfast", icon: StructureIcons.bedAndBreakfast() },
	{ value: ProperyTypeEnum.Hotel, label: "Hotel", icon: StructureIcons.hotel() },
	{ value: ProperyTypeEnum.EarthHome, label: "Earth home", icon: StructureIcons.earthHome() },
	{ value: ProperyTypeEnum.Dome, label: "Dome", icon: StructureIcons.dome() },
];

export enum AmenityEnum {
	WasherDryer = "WasherDryer",
	AirConditioning = "AirConditioning",
	Dishwasher = "Dishwasher",
	HighSpeedInternet = "HighSpeedInternet",
	HardwoodFloors = "HardwoodFloors",
	WalkInClosets = "WalkInClosets",
	Microwave = "Microwave",
	Refrigerator = "Refrigerator",
	Pool = "Pool",
	Gym = "Gym",
	Parking = "Parking",
	PetsAllowed = "PetsAllowed",
	WiFi = "WiFi",
}

export enum Amenity {
	Wifi = "wifi",
	TV = "tv",
	Kitchen = "kitchen",
	Washer = "washer",
	FreeParkingOnPremises = "freeParkingOnPremises",
	PaidParkingOnPremises = "paidParkingOnPremises",
	AirConditioning = "airConditioning",
	DedicatedWorkspace = "dedicatedWorkspace",
	Pool = "pool",
	HotTub = "hotTub",
	OutdoorDiningArea = "outdoorDiningArea",
	FirePit = "firePit",
	PoolTable = "poolTable",
	IndoorFireplace = "indoorFireplace",
	Piano = "piano",
	ExerciseEquipment = "exerciseEquipment",
	LakeAccess = "lakeAccess",
	BeachAccess = "beachAccess",
	OutdoorShower = "outdoorShower",
	SmokeAlarm = "smokeAlarm",
	FirstAidKit = "firstAidKit",
	FireExtinguisher = "fireExtinguisher",
	CarbonMonoxideAlarm = "carbonMonoxideAlarm",
}

export type AmenityItem = {
	value: Amenity;
	label: string;
	icon: JSX.Element;
};

export enum OccupancyType {
	Me = "me",
	Roommates = "roommates",
	Family = "family",
	OtherGuests = "otherGuests",
}

export type OccupancyOption = {
	value: OccupancyType;
	label: string;
	icon: JSX.Element;
};

// export const occupancyOptions: OccupancyOption[] = [
// 	{ value: OccupancyType.Me, label: "Just me", icon: User },
// 	{ value: OccupancyType.Roommates, label: "Roommates", icon: Users },
// 	{ value: OccupancyType.Family, label: "My family", icon: Home },
// 	{ value: OccupancyType.OtherGuests, label: "Other guests", icon: Hotel },
// ];

export const steps = [
	["about-your-place", "structure", "privacy-type", "location", "floor-plan"], // Step 0
	["stand-out", "amenities", "photos", "title", "description"], // Step 1
	["finish-setup", "instant-book", "pricing","contact-info", "review"], // Step 2
];

export const flatPages = ["overview", ...steps.flat()];

export type Step = (typeof flatPages)[number];

export type Category = {
	name: string;
	image: string;
};

export const categoriesOptions: Category[] = [
	{
		image: "/assets/photos/categories/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
		name: "Trending",
	},
	{
		image: "/assets/photos/categories/5ed8f7c7-2e1f-43a8-9a39-4edfc81a3325.jpg",
		name: "Bed & breakfasts",
	},
	{
		image: "/assets/photos/categories/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg",
		name: "OMG!",
	},
	{
		image: "/assets/photos/categories/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg",
		name: "Countryside",
	},
	{
		image: "/assets/photos/categories/c0fa9598-4e37-40f3-b734-4bd0e2377add.jpg",
		name: "New",
	},
	{
		image: "/assets/photos/categories/3fb523a0-b622-4368-8142-b5e03df7549b.jpg",
		name: "Amazing pools",
	},
	{
		image: "/assets/photos/categories/4221e293-4770-4ea8-a4fa-9972158d4004.jpg",
		name: "Caves",
	},
	{
		image: "/assets/photos/categories/78ba8486-6ba6-4a43-a56d-f556189193da.jpg",
		name: "Mansions",
	},
	{
		image: "/assets/photos/categories/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg",
		name: "Rooms",
	},
	{
		image: "/assets/photos/categories/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg",
		name: "Amazing views",
	},
	{
		image: "/assets/photos/categories/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg",
		name: "Beach",
	},
	{
		image: "/assets/photos/categories/35919456-df89-4024-ad50-5fcb7a472df9.jpg",
		name: "Tiny houses",
	},
	{
		image: "/assets/photos/categories/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg",
		name: "Design",
	},
	{
		image: "/assets/photos/categories/8b44f770-7156-4c7b-b4d3-d92549c8652f.jpg",
		name: "Arctic",
	},
	{
		image: "/assets/photos/categories/c0a24c04-ce1f-490c-833f-987613930eca.jpg",
		name: "National park",
	},
	{
		image: "/assets/photos/categories/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg",
		name: "Castles",
	},
	{
		image: "/assets/photos/categories/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg",
		name: "Beachfront",
	},
	{
		image: "/assets/photos/categories/8e507f16-4943-4be9-b707-59bd38d56309.jpg",
		name: "Islands",
	},
	{
		image: "/assets/photos/categories/f0c5ca0f-5aa0-4fe5-b38d-654264bacddf.jpg",
		name: "Play",
	},
	{
		image: "/assets/photos/categories/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg",
		name: "Farms",
	},
	{
		image: "/assets/photos/categories/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg",
		name: "Luxe",
	},
	{
		image: "/assets/photos/categories/ed8b9e47-609b-44c2-9768-33e6a22eccb2.jpg",
		name: "Iconic cities",
	},
	{
		image: "/assets/photos/categories/ee9e2a40-ffac-4db9-9080-b351efc3cfc4.jpg",
		name: "Tropical",
	},
	{
		image: "/assets/photos/categories/687a8682-68b3-4f21-8d71-3c3aef6c1110.jpg",
		name: "Boats",
	},
	{
		image: "/assets/photos/categories/0ff9740e-52a2-4cd5-ae5a-94e1bfb560d6.jpg",
		name: "Containers",
	},
	{
		image: "/assets/photos/categories/957f8022-dfd7-426c-99fd-77ed792f6d7a.jpg",
		name: "Surfing",
	},
	{
		image: "/assets/photos/categories/6b639c8d-cf9b-41fb-91a0-91af9d7677cc.jpg",
		name: "Golfing",
	},
	{
		image: "/assets/photos/categories/51f5cf64-5821-400c-8033-8a10c7787d69.jpg",
		name: "Hanoks",
	},
	{
		image: "/assets/photos/categories/48b55f09-f51c-4ff5-b2c6-7f6bd4d1e049.jpg",
		name: "Minsus",
	},
	{
		image: "/assets/photos/categories/5cdb8451-8f75-4c5f-a17d-33ee228e3db8.jpg",
		name: "Windmills",
	},
	{
		image: "/assets/photos/categories/4d4a4eba-c7e4-43eb-9ce2-95e1d200d10e.jpg",
		name: "Treehouses",
	},
	{
		image: "/assets/photos/categories/e22b0816-f0f3-42a0-a5db-e0f1fa93292b.jpg",
		name: "Adapted",
	},
	{
		image: "/assets/photos/categories/a6dd2bae-5fd0-4b28-b123-206783b5de1d.jpg",
		name: "Desert",
	},
	{
		image: "/assets/photos/categories/a4634ca6-1407-4864-ab97-6e141967d782.jpg",
		name: "Lake",
	},
	{
		image: "/assets/photos/categories/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg",
		name: "Farms",
	},
	{
		image: "/assets/photos/categories/4759a0a7-96a8-4dcd-9490-ed785af6df14.jpg",
		name: "Yurts",
	},
	{
		image: "/assets/photos/categories/60ff02ae-d4a2-4d18-a120-0dd274a95925.jpg",
		name: "Vineyards",
	},
	{
		image: "/assets/photos/categories/31c1d523-cc46-45b3-957a-da76c30c85f9.jpg",
		name: "Campers",
	},
	{
		image: "/assets/photos/categories/33dd714a-7b4a-4654-aaf0-f58ea887a688.jpg",
		name: "Historical homes",
	},
	{
		image: "/assets/photos/categories/d721318f-4752-417d-b4fa-77da3cbc3269.jpg",
		name: "Towers",
	},
	{
		image: "/assets/photos/categories/8a43b8c6-7eb4-421c-b3a9-1bd9fcb26622.jpg",
		name: "Creative spaces",
	},
	{
		image: "/assets/photos/categories/89faf9ae-bbbc-4bc4-aecd-cc15bf36cbca.jpg",
		name: "Domes",
	},
	{
		image: "/assets/photos/categories/ddd13204-a5ae-4532-898c-2e595b1bb15f.jpg",
		name: "Chef's kitchen",
	},
	{
		image: "/assets/photos/categories/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg",
		name: "Cabins",
	},
	{
		image: "/assets/photos/categories/c027ff1a-b89c-4331-ae04-f8dee1cdc287.jpg",
		name: "Houseboats",
	},
	{
		image: "/assets/photos/categories/33848f9e-8dd6-4777-b905-ed38342bacb9.jpg",
		name: "Trulli",
	},
	{
		image: "/assets/photos/categories/757deeaa-c78f-488f-992b-d3b1ecc06fc9.jpg",
		name: "Ski-in/out",
	},
];



export const formatPricingLabel = (type:PricingType) => {
	switch (type) {
	  case "DAY": return "day";
	  case "WEEK": return "week";
	  case "MONTH": return "month";
	  case "YEAR": return "year";
	  default: return "";
	}
  };