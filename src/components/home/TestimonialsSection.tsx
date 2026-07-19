'use client';

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

function TestimonialCard({
	quote,
	name,
	role,
}: {
	quote: string;
	name: string;
	role: string;
}) {
	return (
		<motion.div 
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-50px" }}
			transition={{ duration: 0.5 }}
			className="bg-card border rounded-3xl p-8 hover:shadow-lg transition-shadow flex flex-col"
		>
			<Quote className="h-10 w-10 text-primary/20 mb-6" />
			<p className="text-lg mb-8 flex-1">"{quote}"</p>
			<div className="flex items-center gap-4">
				<div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-white font-bold text-lg">
					{name[0]}
				</div>
				<div>
					<h4 className="font-bold">{name}</h4>
					<p className="text-sm text-muted-foreground">{role}</p>
				</div>
			</div>
		</motion.div>
	);
}

export function TestimonialsSection() {
	return (
		<section id="testimonials" className="py-32 bg-background">
			<div className="container mx-auto px-4">
				<div className="text-center mb-20">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						Loved by Innovators
					</h2>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						See what our users are saying about Nexus.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					<TestimonialCard
						quote="Nexus has completely transformed how my team handles research. The autonomous agents save us hundreds of hours a month."
						name="Sarah Jenkins"
						role="Product Manager @ TechCorp"
					/>
					<TestimonialCard
						quote="The ability to just drop a PDF and have the AI create a full project plan and execute it is literal magic. Best tool of 2026."
						name="David Chen"
						role="Founder & CEO"
					/>
					<TestimonialCard
						quote="I use Nexus for my daily coding tasks. It understands context better than any other AI I've used. Highly recommended!"
						name="Elena Rodriguez"
						role="Senior Engineer"
					/>
				</div>
			</div>
		</section>
	);
}
