'use client';

import Link from "next/link";

export function Footer() {
	return (
		<footer className="border-t py-12 bg-card">
			<div className="container mx-auto px-4">
				<div className="grid md:grid-cols-4 gap-8 mb-8">
					<div className="md:col-span-2">
						<Link
							href="/"
							className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 mb-4 inline-block">
							Nexus
						</Link>
						<p className="text-muted-foreground max-w-sm">
							The ultimate autonomous workspace for professionals. Let AI
							execute your tasks while you focus on strategy.
						</p>
					</div>
					<div>
						<h4 className="font-bold mb-4">Product</h4>
						<ul className="space-y-2 text-muted-foreground">
							<li>
								<Link
									href="#features"
									className="hover:text-primary transition-colors">
									Features
								</Link>
							</li>
							<li>
								<Link
									href="#how-it-works"
									className="hover:text-primary transition-colors">
									How it Works
								</Link>
							</li>
							<li>
								<Link
									href="#pricing"
									className="hover:text-primary transition-colors">
									Pricing
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="font-bold mb-4">Company</h4>
						<ul className="space-y-2 text-muted-foreground">
							<li>
								<Link
									href="#"
									className="hover:text-primary transition-colors">
									About Us
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="hover:text-primary transition-colors">
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="hover:text-primary transition-colors">
									Terms of Service
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm">
					<p>© 2026 Nexus AI. All rights reserved.</p>
					<div className="flex gap-4 mt-4 md:mt-0">
						{/* Social Icons Placeholder */}
						<div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 hover:text-primary cursor-pointer transition-colors">
							𝕏
						</div>
						<div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 hover:text-primary cursor-pointer transition-colors">
							in
						</div>
						<div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 hover:text-primary cursor-pointer transition-colors">
							gh
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
