'use client';

import { Key, Lock, Server, Shield, ShieldCheck } from "lucide-react";

export function SecuritySection() {
	return (
		<section className="py-24 bg-muted/30 border-y">
			<div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
				<div className="flex-1">
					<div className="h-20 w-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
						<ShieldCheck className="h-10 w-10 text-primary" />
					</div>
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						Safe and Secure Bookings
					</h2>
					<p className="text-lg text-muted-foreground mb-8 leading-relaxed">
						Your privacy and payments are protected. Nexus AI uses end-to-end encryption for your transactions and communications. We ensure that every host and property is thoroughly vetted.
					</p>
					<ul className="space-y-4">
						<li className="flex items-center gap-3 text-lg font-medium">
							<div className="bg-primary/10 p-2 rounded-full">
								<Lock className="h-5 w-5 text-primary" />
							</div>{" "}
							AES-256 Encryption
						</li>
						<li className="flex items-center gap-3 text-lg font-medium">
							<div className="bg-primary/10 p-2 rounded-full">
								<Server className="h-5 w-5 text-primary" />
							</div>{" "}
							Secure Payment Gateway
						</li>
						<li className="flex items-center gap-3 text-lg font-medium">
							<div className="bg-primary/10 p-2 rounded-full">
								<Key className="h-5 w-5 text-primary" />
							</div>{" "}
							Verified Host Profiles
						</li>
					</ul>
				</div>
				<div className="flex-1 relative w-full aspect-square max-w-md mx-auto">
					<div className="absolute inset-0 rounded-full bg-primary/5 border border-primary/20 flex items-center justify-center p-12">
						<div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full animate-[spin_10s_linear_infinite]" />
						<Shield className="h-48 w-48 text-primary/30" />
					</div>
				</div>
			</div>
		</section>
	);
}
