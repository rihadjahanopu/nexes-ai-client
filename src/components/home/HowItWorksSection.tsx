'use client';

import { motion } from "framer-motion";
import { Bot, CheckCircle, UploadCloud } from "lucide-react";

function StepCard({
	number,
	icon,
	title,
	description,
}: {
	number: string;
	icon: React.ReactNode;
	title: string;
	description: string;
}) {
	return (
		<motion.div 
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-50px" }}
			transition={{ duration: 0.5 }}
			className="relative flex flex-col items-center text-center z-10"
		>
			<div className="w-20 h-20 rounded-full bg-background border-4 border-muted flex items-center justify-center mb-6 shadow-xl shadow-black/5 relative">
				{icon}
				<div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center border-2 border-background">
					{number}
				</div>
			</div>
			<h3 className="text-2xl font-bold mb-3">{title}</h3>
			<p className="text-muted-foreground leading-relaxed">{description}</p>
		</motion.div>
	);
}

export function HowItWorksSection() {
	return (
		<section id="how-it-works" className="py-32 bg-muted/30">
			<div className="container mx-auto px-4">
				<div className="text-center mb-20">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						How Nexus AI Works
					</h2>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						Find and book your next stay in three simple steps.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-12 relative">
					{/* Connector Line */}
					<div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />

					<StepCard
						number="1"
						icon={<UploadCloud className="h-8 w-8 text-primary" />}
						title="Search Properties"
						description="Enter your destination, dates, and preferences to browse our extensive list of properties."
					/>
					<StepCard
						number="2"
						icon={<Bot className="h-8 w-8 text-blue-500" />}
						title="AI Matchmaking"
						description="Our smart AI analyzes your requirements to suggest the best matches that fit your budget and style."
					/>
					<StepCard
						number="3"
						icon={<CheckCircle className="h-8 w-8 text-green-500" />}
						title="Book & Relax"
						description="Securely book your chosen property in a few clicks and get ready to enjoy your trip."
					/>
				</div>
			</div>
		</section>
	);
}
