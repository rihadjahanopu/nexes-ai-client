'use client';

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function BlogCard({
	title,
	date,
	category,
	imageId,
}: {
	title: string;
	date: string;
	category: string;
	imageId: string;
}) {
	return (
		<motion.div 
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-50px" }}
			transition={{ duration: 0.5 }}
			className="group cursor-pointer"
		>
			<div className="w-full aspect-[4/3] rounded-3xl bg-muted overflow-hidden mb-6 relative">
				<div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-500/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity" />
				<div
					className={`w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110 ${
						imageId === "1" ?
							'bg-[url("https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800")]'
						: imageId === "2" ?
							'bg-[url("https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800")]'
						:	'bg-[url("https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800")]'
					}`}
				/>
			</div>
			<div className="flex items-center gap-4 text-sm font-medium mb-3">
				<span className="text-primary">{category}</span>
				<span className="text-muted-foreground">{date}</span>
			</div>
			<h3 className="text-2xl font-bold group-hover:text-primary transition-colors line-clamp-2">
				{title}
			</h3>
		</motion.div>
	);
}

export function ResourcesSection() {
	return (
		<section className="py-32 bg-background">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
					<div>
						<h2 className="text-4xl md:text-5xl font-bold mb-4">
							Latest Insights
						</h2>
						<p className="text-xl text-muted-foreground">
							Learn how to maximize your autonomous workspace.
						</p>
					</div>
					<Button
						variant="outline"
						className="rounded-full px-6 shadow-sm">
						View all articles <ArrowRight className="ml-2 h-4 w-4" />
					</Button>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					<BlogCard
						title="The Rise of Agentic Workflows"
						date="Jul 12, 2026"
						category="AI Trends"
						imageId="1"
					/>
					<BlogCard
						title="How to structure context for better AI outputs"
						date="Jul 05, 2026"
						category="Guides"
						imageId="2"
					/>
					<BlogCard
						title="Why traditional project management is dying"
						date="Jun 28, 2026"
						category="Opinion"
						imageId="3"
					/>
				</div>
			</div>
		</section>
	);
}
