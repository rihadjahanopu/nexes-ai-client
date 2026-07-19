'use client';

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

function FaqItem({ question, answer }: { question: string; answer: string }) {
	return (
		<motion.details 
			initial={{ opacity: 0, y: 10 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-50px" }}
			transition={{ duration: 0.4 }}
			className="group border rounded-2xl bg-card overflow-hidden [&_summary::-webkit-details-marker]:hidden"
		>
			<summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 font-semibold text-lg">
				{question}
				<ChevronDown className="h-5 w-5 transition duration-300 group-open:-rotate-180" />
			</summary>
			<div className="px-6 pb-6 text-muted-foreground leading-relaxed">
				{answer}
			</div>
		</motion.details>
	);
}

export function FaqSection() {
	return (
		<section id="faq" className="py-32 bg-muted/30">
			<div className="container mx-auto px-4 max-w-3xl">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						Frequently Asked Questions
					</h2>
				</div>

				<div className="space-y-4">
					<FaqItem
						question="What makes Nexus AI different from other booking platforms?"
						answer="Nexus AI acts as your personal travel concierge. You can simply chat about your preferences, and it will automatically find, filter, and book the perfect property for you."
					/>
					<FaqItem
						question="Are my payments and personal data secure?"
						answer="Yes. We use enterprise-grade encryption for all transactions and personal data. We ensure your booking experience is 100% safe and secure."
					/>
					<FaqItem
						question="How do I list my property on Nexus AI?"
						answer="It's simple! Just go to the 'Manage Items' section and add your property details. Our AI will automatically optimize your listing for better visibility."
					/>
					<FaqItem
						question="Can I cancel or modify my booking?"
						answer="Yes, you can manage your bookings directly from your dashboard or simply ask our 24/7 AI assistant to handle modifications or cancellations for you."
					/>
				</div>
			</div>
		</section>
	);
}
