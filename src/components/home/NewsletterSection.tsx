'use client';

import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export function NewsletterSection() {
	return (
		<section className="py-24 bg-background border-t">
			<div className="container mx-auto px-4">
				<div className="bg-primary/5 rounded-3xl p-10 md:p-16 border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-10">
					<div className="flex-1">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							Stay ahead of the curve
						</h2>
						<p className="text-lg text-muted-foreground">
							Join our newsletter to get the latest updates on agentic AI,
							productivity tips, and exclusive early access features.
						</p>
					</div>
					<div className="flex-1 w-full max-w-md">
						<form className="flex gap-2">
							<div className="relative flex-1">
								<Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
								<input
									type="email"
									placeholder="Enter your email"
									className="w-full h-14 pl-12 pr-4 rounded-full border border-input bg-background shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
									required
								/>
							</div>
							<Button
								type="submit"
								size="lg"
								className="h-14 rounded-full px-8">
								Subscribe
							</Button>
						</form>
						<p className="text-xs text-muted-foreground mt-3 text-center md:text-left">
							No spam, unsubscribe anytime.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
