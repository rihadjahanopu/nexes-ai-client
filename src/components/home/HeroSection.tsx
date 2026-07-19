'use client';

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
	return (
		<section className="relative overflow-hidden isolate min-h-[90vh] flex flex-col items-center justify-center pt-32 sm:pt-40 pb-20 w-full">
			<motion.div 
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
				className="w-full max-w-5xl mx-auto px-6 text-center z-10 relative"
			>
				<div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium tracking-wide">
					✨ The Future of Productivity is Here
				</div>
				<h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
					Your Autonomous <br />
					<span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-500">
						Workspace Copilot
					</span>
				</h1>
				<p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed px-2">
					Nexus doesn't just manage your tasks—it executes them. Combine
					project management with agentic AI to analyze data, draft
					strategies, and automate workflows.
				</p>
				<div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
					<Link
						href="/register"
						className="w-full sm:w-auto">
						<Button
							size="lg"
							className="w-full sm:w-auto h-12 sm:h-14 px-8 text-base sm:text-lg rounded-full shadow-lg shadow-primary/25 hover:scale-105 transition-transform">
							Start for free <ArrowRight className="ml-2 h-5 w-5" />
						</Button>
					</Link>
					<Link
						href="/login"
						className="w-full sm:w-auto">
						<Button
							size="lg"
							variant="outline"
							className="w-full sm:w-auto h-12 sm:h-14 px-8 text-base sm:text-lg rounded-full bg-background/50 backdrop-blur hover:bg-muted">
							View Demo
						</Button>
					</Link>
				</div>
			</motion.div>

			{/* Background blobs — contained inside overflow:hidden + isolate section */}
			<div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
				{/* Top Left Blob */}
				<div className="absolute top-0 left-0 w-[400px] h-[400px] md:w-[700px] md:h-[700px] opacity-20 md:opacity-30 -translate-x-1/2 -translate-y-1/2">
					<div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-500 rounded-full blur-[80px] md:blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob" />
				</div>
				
				{/* Top Right Blob */}
				<div className="absolute top-[10%] right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] opacity-20 md:opacity-30 translate-x-1/3 -translate-y-1/4">
					<div className="absolute inset-0 bg-gradient-to-bl from-purple-500 to-pink-500 rounded-full blur-[80px] md:blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000" />
				</div>

				{/* Bottom Center Blob */}
				<div className="absolute bottom-0 left-1/2 w-[500px] h-[500px] md:w-[800px] md:h-[800px] opacity-10 md:opacity-20 -translate-x-1/2 translate-y-1/3">
					<div 
						className="absolute inset-0 bg-gradient-to-t from-blue-400 to-cyan-300 rounded-full blur-[100px] md:blur-[150px] mix-blend-multiply dark:mix-blend-screen animate-blob" 
						style={{ animationDelay: "4s" }}
					/>
				</div>
			</div>
		</section>
	);
}
