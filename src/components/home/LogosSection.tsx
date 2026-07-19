'use client';

import { Database, GitBranch, Layout, MessageCircle } from "lucide-react";

export function LogosSection() {
	return (
		<section className="py-10 border-y bg-muted/20 overflow-hidden">
			<div className="container mx-auto px-4 text-center">
				<p className="text-sm font-medium text-muted-foreground mb-6 uppercase tracking-widest">
					Trusted by leading property partners
				</p>
				<div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
					<div className="flex items-center gap-2 text-xl font-bold">
						<GitBranch className="h-8 w-8" /> Top Rated
					</div>
					<div className="flex items-center gap-2 text-xl font-bold">
						<MessageCircle className="h-8 w-8" /> Secure Booking
					</div>
					<div className="flex items-center gap-2 text-xl font-bold">
						<Layout className="h-8 w-8" /> Verified Hosts
					</div>
					<div className="flex items-center gap-2 text-xl font-bold">
						<Database className="h-8 w-8" /> Global Reach
					</div>
				</div>
			</div>
		</section>
	);
}
