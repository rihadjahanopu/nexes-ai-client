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
						Start for free, upgrade when you need more power.
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
					{/* Free Tier */}
					<div className="bg-card border rounded-3xl p-10 hover:shadow-xl transition-shadow">
						<h3 className="text-2xl font-bold mb-2">Starter</h3>
						<p className="text-muted-foreground mb-6">
							Perfect for individuals and small tasks.
						</p>
						<div className="text-5xl font-extrabold mb-8">
							$0
							<span className="text-lg font-normal text-muted-foreground">
								/mo
							</span>
						</div>
						<ul className="space-y-4 mb-10">
							<PricingFeature text="Up to 3 active projects" />
							<PricingFeature text="Basic agentic reasoning" />
							<PricingFeature text="100 AI queries per month" />
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
						<h3 className="text-2xl font-bold mb-2">Pro</h3>
						<p className="text-muted-foreground mb-6">
							For professionals who need maximum autonomy.
						</p>
						<div className="text-5xl font-extrabold mb-8">
							$29
							<span className="text-lg font-normal text-muted-foreground">
								/mo
							</span>
						</div>
						<ul className="space-y-4 mb-10">
							<PricingFeature text="Unlimited projects" />
							<PricingFeature text="Advanced Agentic AI (GPT-4o/Claude 3.5)" />
							<PricingFeature text="Unlimited AI queries" />
							<PricingFeature text="Priority 24/7 support" />
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
