import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Home, ShieldCheck, Sparkles } from "lucide-react";
import { Header } from "./_components/header";
import { auth, currentUser } from "@clerk/nextjs/server";
import { BahButton } from "./_components/bah-button";

export default async function HostHomesPage() {
	const { userId } = await auth();
	const user = await currentUser();

	const isLoggedIn = !!userId;
	const cuisHost = Boolean(user?.publicMetadata?.isHost);
	console.log("cuisHost", cuisHost);

	return (
		<div className="bg-white text-neutral-900">
			{/* MAIN */}
			<main id="main" className="pb-16 sm:pb-20">
				{/* Hero with MONOCHROME background gradients */}
				<section className="relative border-b border-neutral-200">
					<div
						aria-hidden
						className="pointer-events-none absolute inset-0
              bg-[radial-gradient(900px_420px_at_8%_8%,rgba(0,0,0,0.14),transparent_60%),radial-gradient(700px_300px_at_95%_0,rgba(0,0,0,0.08),transparent_60%)]"
					/>
					<div className="relative mx-auto max-w-6xl px-4 py-16 md:py-20">
						<div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100/60 px-3 py-1 text-xs sm:text-sm text-neutral-600">
							Host &amp; book across Ghana and Africa
						</div>

						<h1 className="mt-4 text-5xl font-black leading-tight tracking-tight sm:text-6xl md:text-7xl">
							Turn your <span className="underline decoration-neutral-300">place</span> into income with{" "}
							<span className="bg-gradient-to-r from-black to-neutral-600 bg-clip-text text-transparent"> rentout</span>.
						</h1>

						<p className="mt-4 max-w-prose text-base text-neutral-600 md:text-lg">
							List homes, rooms, hotels, guesthouses, and BnBs. Built for <span className="font-semibold text-neutral-800">locals and travelers</span>
							. You set the rules and price; payouts via Mobile Money or bank.
						</p>

						{/* CTAs */}
						<div className="mt-6 flex flex-wrap gap-3">
							<BahButton isHost={!!cuisHost} isLoggedIn={isLoggedIn} className="h-12 rounded-full px-6 bg-black text-white hover:bg-black/90" />
							<Button asChild className="h-12 rounded-full px-6 border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-100">
								<Link href="/explore">Explore stays</Link>
							</Button>
							<Button asChild className="h-12 rounded-full px-6 border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-100">
								<a href="#faq">Got questions? (FAQ)</a>
							</Button>
						</div>

						{/* KPIs */}
						<div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
							{[
								["Avg. setup time", "~8 min"],
								["Payout methods", "MoMo & Bank"],
								["Listing types", "Home • Room • Hotel"],
								["Support", "24/7"],
							].map(([k, v]) => (
								<Card key={k} className="border border-neutral-200 bg-white">
									<CardContent className="p-4 text-center">
										<div className="text-neutral-500">{k}</div>
										<div className="mt-1 text-lg font-semibold">{v}</div>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>

				{/* Benefits */}
				<section className="mx-auto max-w-6xl px-4 py-12">
					<div className="grid gap-4 md:grid-cols-3">
						<Card className="border border-neutral-200 bg-white">
							<CardContent className="flex items-start gap-3 p-6">
								<div className="flex h-10 w-10 aspect-square items-center justify-center rounded-full bg-gradient-to-br from-black to-neutral-600 text-white shadow-sm">
									<Home className="h-5 w-5" />
								</div>
								<div>
									<h3 className="text-lg font-semibold">Full control</h3>
									<p className="text-neutral-600">Set price, discounts, and rules. Block dates anytime.</p>
								</div>
							</CardContent>
						</Card>
						<Card className="border border-neutral-200 bg-white">
							<CardContent className="flex items-start gap-3 p-6">
								<div className="flex h-10 w-10 aspect-square items-center justify-center rounded-full bg-gradient-to-br from-black to-neutral-600 text-white shadow-sm">
									<Sparkles className="h-5 w-5" />
								</div>

								<div>
									<h3 className="text-lg font-semibold">More bookings</h3>
									<p className="text-neutral-600">Boosted in search across Ghana &amp; Africa — locals included.</p>
								</div>
							</CardContent>
						</Card>
						<Card className="border border-neutral-200 bg-white">
							<CardContent className="flex items-start gap-3 p-6">
								<div className="flex h-10 w-10 aspect-square items-center justify-center rounded-full bg-gradient-to-br from-black to-neutral-600 text-white shadow-sm">
									<ShieldCheck className="h-5 w-5" />
								</div>

								<div>
									<h3 className="text-lg font-semibold">Trust &amp; safety</h3>
									<p className="text-neutral-600">Guest verification, secure payments, disputes support, and optional deposits.</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</section>

				{/* How it works */}
				<section className="mx-auto max-w-6xl px-4 pb-4">
					<h2 className="text-2xl font-semibold md:text-3xl">How hosting works</h2>
					<p className="mt-1 text-neutral-600">Four simple steps.</p>
					<div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
						{[
							["Create your listing", "Describe your place, upload photos, set price & availability."],
							["Verify & publish", "Quick checks keep the community safe."],
							["Get booked", "Approve requests or enable Instant Book. Chat in-app."],
							["Get paid", "Choose MTN MoMo, Vodafone Cash, AirtelTigo, or bank transfer."],
						].map(([title, body], i) => (
							<Card key={title} className="border border-neutral-200 bg-white">
								<CardContent className="p-5">
									<div
										className="mb-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-transparent bg-white text-sm font-bold 
     bg-gradient-to-tr from-neutral-200 to-neutral-400 p-[2px]"
									>
										<span className="flex h-full w-full items-center justify-center rounded-full bg-white">{i + 1}</span>
									</div>
									<h3 className="text-lg font-semibold">{title}</h3>
									<p className="mt-1 text-neutral-600">{body}</p>
									{title === "Get paid" && (
										<div className="mt-3 flex flex-wrap gap-2">
											{["MTN MoMo", "Vodafone Cash", "AirtelTigo", "Bank"].map((p) => (
												<Badge key={p} className="border border-neutral-300 bg-neutral-100 text-neutral-700 hover:bg-neutral-200">
													{p}
												</Badge>
											))}
										</div>
									)}
								</CardContent>
							</Card>
						))}
					</div>
				</section>

				<Separator className="my-10 bg-neutral-200" />

				{/* Big CTA */}
				<section id="get-started" className="mx-auto max-w-6xl px-4 py-10">
					<div className="rounded-2xl border border-neutral-200 bg-neutral-100/60 p-8 md:p-10">
						<h3 className="text-2xl font-bold md:text-3xl">
							Ready to list on <span className="lowercase"> rentout</span>?
						</h3>
						<p className="mt-2 text-neutral-600">Start with a title, a few photos, and your nightly price. You can finish later.</p>
						<div className="mt-5 flex flex-wrap gap-3">
							<Button className="h-12 rounded-full px-6 bg-black text-white hover:bg-black/90">Create your listing</Button>
							<Button asChild className="h-12 rounded-full px-6 border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-100">
								<a href="#faq">Read the FAQ</a>
							</Button>
						</div>
					</div>
				</section>

				{/* FAQ */}
				<section id="faq" className="mx-auto max-w-6xl px-4 pb-24">
					<h2 className="text-2xl font-semibold md:text-3xl">Frequently asked questions</h2>
					<Accordion type="single" collapsible className="mt-4 max-w-3xl">
						<AccordionItem value="q0">
							<AccordionTrigger>Can locals book and host on rentout?</AccordionTrigger>
							<AccordionContent>
								Yes — rentout is for locals and travelers. Host your spare room, guesthouse or hotel and welcome people visiting for work, school, or
								events.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="q1">
							<AccordionTrigger>How do payouts work in Ghana?</AccordionTrigger>
							<AccordionContent>
								We support Mobile Money (MTN MoMo, Vodafone Cash, AirtelTigo) and bank transfers. Pick your preferred payout method in your dashboard.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="q2">
							<AccordionTrigger>What fees do you charge?</AccordionTrigger>
							<AccordionContent>Simple commission per booking; you control your nightly rate and optional cleaning fee.</AccordionContent>
						</AccordionItem>
						<AccordionItem value="q3">
							<AccordionTrigger>Is there damage protection?</AccordionTrigger>
							<AccordionContent>
								Enable a security deposit and report incidents in-app. Coverage available on eligible bookings (terms apply).
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</section>
			</main>

			<Header isHost={!!cuisHost} isLoggedIn={isLoggedIn} />

			{/* FOOTER */}
			<footer className="border-t border-neutral-200">
				<div className="mx-auto max-w-6xl px-4 py-8 text-sm text-neutral-600">
					<div>© {new Date().getFullYear()} rentout</div>
					<div className="mt-2 flex flex-wrap gap-3">
						<Link href="/about" className="hover:underline">
							About
						</Link>
						<Link href="/help" className="hover:underline">
							Help
						</Link>
						<Link href="/privacy" className="hover:underline">
							Privacy
						</Link>
						<Link href="/terms" className="hover:underline">
							Terms
						</Link>
					</div>
				</div>
			</footer>
		</div>
	);
}
