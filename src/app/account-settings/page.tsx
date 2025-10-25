import React from "react";
import { Icons } from "./_components/icons";
import Link from "next/link";

const routes = [
	{
		title: "Personal info",
		url: `/account-settings/personal-info`,
		description: "Name, phone, email, etc",
		icon: Icons.personalInfo(),
	},
	{
		title: "Payments",
		url: `/account-settings/payments`,
		description: "Review payments, coupons, and gift cards",
		icon: Icons.payments(),
	},
	{
		title: "Login & security",
		url: `/account-settings/security`,
		description: "Update your password and secure your account, activity",
		icon: Icons.security(),
	},
	{
		title: "Notifications",
		url: `/account-settings/notifications`,
		description: "Choose notification preferences and how you want to be contacted",
		icon: Icons.notifications(),
	},
];

const AccountPage = () => {
	return (
		<div>
			<h1 className="text-2xl font-bold mb-4 md:mt-8">Account</h1>

			<div className="mt-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
					{routes.map((route, index) => (
						<Link
							href={route.url}
							key={index}
							className="flex shadow-[0_4px_8px_-2px_rgba(9,30,66,0.25),0_0_0_1px_rgba(9,30,66,0.08)] rounded-2xl p-4"
						>
							<div className="flex flex-col justify-between items-start gap-y-3 md:gap-y-5">
								<div>{route.icon}</div>
								<div className="flex flex-col ">
									<h3 className="font-semibold text-base">{route.title}</h3>
									<p className="text-black/80">{route.description}</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default AccountPage;
