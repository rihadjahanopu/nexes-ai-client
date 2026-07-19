'use client';

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

function PricingFeature({ text }: { text: string }) {
	return (
		<li className="flex items-center gap-3">
			<CheckCircle className="h-5 w-5 text-primary shrink-0" />
			<span>{text}</span>
		</li>
	);
}

export function PricingSection() {
	return (
		<section className="py-32 bg-muted/30">
			<div className="container mx-auto px-4">
				<div className="text-center mb-20">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						Simple, Transparent Pricing
					</h2>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						List your property for free, upgrade for premium visibility.
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
					{/* Free Tier */}
					<div className="bg-card border rounded-3xl p-10 hover:shadow-xl transition-shadow">
						<h3 className="text-2xl font-bold mb-2">Starter</h3>
						<p className="text-muted-foreground mb-6">
							Perfect for individuals listing a few properties.
						</p>
						<div className="text-5xl font-extrabold mb-8">
							$0
							<span className="text-lg font-normal text-muted-foreground">
								/mo
							</span>
						</div>
						<ul className="space-y-4 mb-10">
							<PricingFeature text="List up to 3 properties" />
							<PricingFeature text="Basic search visibility" />
							<PricingFeature text="Standard AI guest support" />
							<PricingFeature text="Community support" />
						</ul>
						<Button
							className="w-full h-12 rounded-full"
							variant="outline">
							Get Started
						</Button>
					</div>

					{/* Pro Tier */}
					<div className="bg-card border-2 border-primary rounded-3xl p-10 shadow-xl relative overflow-hidden">
						<div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-bold rounded-bl-xl">
							POPULAR
						</div>
						<h3 className="text-2xl font-bold mb-2">Pro Host</h3>
						<p className="text-muted-foreground mb-6">
							For professional hosts needing maximum visibility.
						</p>
						<div className="text-5xl font-extrabold mb-8">
							$29
							<span className="text-lg font-normal text-muted-foreground">
								/mo
							</span>
						</div>
						<ul className="space-y-4 mb-10">
							<PricingFeature text="Unlimited property listings" />
							<PricingFeature text="Premium AI ranking & featured spots" />
							<PricingFeature text="Advanced AI guest concierge" />
							<PricingFeature text="Priority 24/7 host support" />
						</ul>
						<Button className="w-full h-12 rounded-full shadow-lg shadow-primary/25">
							Upgrade to Pro
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
