'use client';

import { motion } from "framer-motion";
import { BrainCircuit, FolderGit2, MessageSquare } from "lucide-react";

function FeatureCard({
	icon,
	title,
	description,
}: {
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
			className="bg-card border rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
		>
			<div className="mb-6 bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center">
				{icon}
			</div>
			<h3 className="text-xl font-bold mb-3">{title}</h3>
			<p className="text-muted-foreground leading-relaxed">{description}</p>
		</motion.div>
	);
}

export function FeaturesSection() {
	return (
		<section id="features" className="py-32 bg-background relative">
			<div className="container mx-auto px-4">
				<div className="text-center mb-20">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						Seamless Property Discovery
					</h2>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						Everything you need to find, book, and manage your dream stays in one place.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					<FeatureCard
						icon={<FolderGit2 className="h-10 w-10 text-primary" />}
						title="Extensive Listings"
						description="Browse thousands of properties, from cozy cabins to luxury villas across top destinations."
					/>
					<FeatureCard
						icon={<BrainCircuit className="h-10 w-10 text-blue-500" />}
						title="AI-Powered Search"
						description="Let our AI find the perfect match for you based on your unique preferences and budget."
					/>
					<FeatureCard
						icon={<MessageSquare className="h-10 w-10 text-purple-500" />}
						title="24/7 AI Assistant"
						description="Get instant help with bookings, local recommendations, and inquiries through our intelligent chat."
					/>
				</div>
			</div>
		</section>
	);
}
