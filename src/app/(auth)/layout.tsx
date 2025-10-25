import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MobileFooterBar } from "@/components/mobile-footer-bar";
import React from "react";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<div className="min-h-[100vh] h-full w-full">
			<div className="w-full border-b shadow fixed hidden md:block top-0 bg-white z-40">
				<Header showSearch={false} maxWidth="max-w-screen-2xl" />
			</div>

			<section className="w-full min-h-[100vh] max-w-screen-md mx-auto px-4 md:pt-[70px] pb-[70px]">
				<div className=" py-7 w-fit mx-auto">{children}</div>
			</section>

			<MobileFooterBar />
			<div className="hidden md:block w-full">
				<Footer maxWidth="max-w-screen-2xl" />
			</div>
		</div>
	);
};

export default AuthLayout;
