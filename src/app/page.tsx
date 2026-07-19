"use client";

import { AudienceSection } from "@/components/home/AudienceSection";
import { CtaSection } from "@/components/home/CtaSection";
import { FaqSection } from "@/components/home/FaqSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { LogosSection } from "@/components/home/LogosSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { PricingSection } from "@/components/home/PricingSection";
import { ResourcesSection } from "@/components/home/ResourcesSection";
import { SecuritySection } from "@/components/home/SecuritySection";
import { StatisticsSection } from "@/components/home/StatisticsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ListingSection } from "@/components/listings/ListingSection";

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col overflow-x-hidden">
			<Navbar />
			<main className="flex-1">
				<HeroSection />
				<div className="container mx-auto px-4">
					<ListingSection />
				</div>
				<LogosSection />
				<FeaturesSection />
				<HowItWorksSection />
				<StatisticsSection />
				<TestimonialsSection />
				<PricingSection />
				<AudienceSection />
				<SecuritySection />
				<ResourcesSection />
				<FaqSection />
				<NewsletterSection />
				<CtaSection />
			</main>
			<Footer />
		</div>
	);
}
