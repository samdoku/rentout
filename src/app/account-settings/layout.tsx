import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MobileFooterBar } from "@/components/mobile-footer-bar";

export const metadata: Metadata = {
	title: "Account settings",
	description: "Login into your account",
};

export default function AccountLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="min-h-[100vh] h-full w-full">
			<div className="w-full border-b shadow fixed hidden md:block top-0 bg-white z-40">
				<Header showSearch={false} maxWidth="max-w-[1180px]" />
			</div>

			<section className="w-full h-full min-h-[100vh] max-w-screen-md mx-auto px-4 md:pt-[70px] pb-[70px]">
				<div className=" py-7">{children}</div>
			</section>

			<MobileFooterBar />
			<div className="hidden md:block w-full">
				<Footer maxWidth="max-w-[1180px]" />
			</div>
		</div>
	);
}
