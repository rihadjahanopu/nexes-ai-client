'use client';

import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import Link from "next/link";

export function CtaSection() {
	return (
		<section className="py-32 relative overflow-hidden">
			<div className="absolute inset-0 bg-primary/5 dark:bg-primary/10" />
			<div className="container mx-auto px-4 text-center relative z-10">
				<h2 className="text-4xl md:text-5xl font-bold mb-6">
					Ready for your next vacation?
				</h2>
				<p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
					Join thousands of travelers who are finding their dream stays with Nexus AI.
				</p>
				<Link href="/listings">
					<Button
						size="lg"
						className="h-16 px-12 text-xl rounded-full shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
						Start Exploring <Zap className="ml-2 h-6 w-6" />
					</Button>
				</Link>
			</div>
		</section>
	);
}
