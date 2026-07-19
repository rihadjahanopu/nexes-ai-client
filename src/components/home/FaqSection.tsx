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
						question="What makes Nexus different from ChatGPT?"
						answer="Nexus is built for autonomous execution, not just chatting. You can upload entire project contexts, and Nexus will break down goals, plan tasks, and execute them step-by-step automatically."
					/>
					<FaqItem
						question="Is my data secure?"
						answer="Yes. We use enterprise-grade encryption for all your documents and chat history. We never train our public models on your private workspace data."
					/>
					<FaqItem
						question="Can I integrate Nexus with my existing tools?"
						answer="Absolutely. Nexus Pro supports integrations with GitHub, Slack, Trello, Jira, and Google Drive, allowing the agent to read and write directly to your favorite apps."
					/>
					<FaqItem
						question="Do I need to know how to code to use Nexus?"
						answer="Not at all. Nexus uses natural language. Just describe what you want to achieve, and the agent will figure out the technical steps to get it done."
					/>
				</div>
			</div>
		</section>
	);
}
