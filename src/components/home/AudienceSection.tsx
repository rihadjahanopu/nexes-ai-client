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
						Built for modern teams
					</h2>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						Nexus adapts to your role and workflow.
					</p>
				</div>
				<div className="grid md:grid-cols-3 gap-8">
					<AudienceCard
						title="Software Engineers"
						description="Automate code reviews, draft documentation, and generate boilerplate code instantly."
						icon={<Code2 className="h-8 w-8 text-primary" />}
					/>
					<AudienceCard
						title="Product Managers"
						description="Turn rough ideas into PRDs, track feature progress, and analyze user feedback autonomously."
						icon={<Target className="h-8 w-8 text-blue-500" />}
					/>
					<AudienceCard
						title="Researchers"
						description="Upload hundreds of papers and let Nexus extract key findings and draft summaries."
						icon={<BookOpen className="h-8 w-8 text-purple-500" />}
					/>
				</div>
			</div>
		</section>
	);
}
