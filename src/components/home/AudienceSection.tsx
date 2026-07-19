'use client';

import { motion } from "framer-motion";
import { BookOpen, Code2, Target } from "lucide-react";

function AudienceCard({
	title,
	description,
	icon,
}: {
	title: string;
	description: string;
	icon: React.ReactNode;
}) {
	return (
		<motion.div 
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-50px" }}
			transition={{ duration: 0.5 }}
			className="bg-card border rounded-3xl p-8 hover:border-primary/50 hover:shadow-lg transition-all flex flex-col"
		>
			<div className="mb-6">{icon}</div>
			<h3 className="text-xl font-bold mb-3">{title}</h3>
			<p className="text-muted-foreground leading-relaxed">{description}</p>
		</motion.div>
	);
}

export function AudienceSection() {
	return (
		<section className="py-24 bg-background">
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold mb-4">
						Built for modern travelers & hosts
					</h2>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						Nexus AI adapts to your travel needs and property management.
					</p>
				</div>
				<div className="grid md:grid-cols-3 gap-8">
					<AudienceCard
						title="Vacationers"
						description="Find the perfect spot to relax, explore, and unwind with our AI-powered recommendations."
						icon={<Code2 className="h-8 w-8 text-primary" />}
					/>
					<AudienceCard
						title="Business Travelers"
						description="Discover well-equipped apartments and hotels suited for remote work and corporate trips."
						icon={<Target className="h-8 w-8 text-blue-500" />}
					/>
					<AudienceCard
						title="Property Hosts"
						description="List your properties and let our AI concierge manage guest inquiries and bookings."
						icon={<BookOpen className="h-8 w-8 text-purple-500" />}
					/>
				</div>
			</div>
		</section>
	);
}
