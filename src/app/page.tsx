'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { LogosSection } from "@/components/home/LogosSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { StatisticsSection } from "@/components/home/StatisticsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { PricingSection } from "@/components/home/PricingSection";
import { AudienceSection } from "@/components/home/AudienceSection";
import { SecuritySection } from "@/components/home/SecuritySection";
import { ResourcesSection } from "@/components/home/ResourcesSection";
import { FaqSection } from "@/components/home/FaqSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { CtaSection } from "@/components/home/CtaSection";

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col overflow-x-hidden">
			<Navbar />
			<main className="flex-1">
				<HeroSection />
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
