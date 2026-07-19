'use client';

export function StatisticsSection() {
	return (
		<section className="py-24 bg-primary text-primary-foreground">
			<div className="container mx-auto px-4 flex flex-col md:flex-row justify-around text-center gap-12">
				<div>
					<h3 className="text-5xl font-bold mb-3">50k+</h3>
					<p className="text-primary-foreground/80 text-lg">
						Happy guests
					</p>
				</div>
				<div className="hidden md:block w-px bg-primary-foreground/20" />
				<div>
					<h3 className="text-5xl font-bold mb-3">10k+</h3>
					<p className="text-primary-foreground/80 text-lg">
						Properties listed
					</p>
				</div>
				<div className="hidden md:block w-px bg-primary-foreground/20" />
				<div>
					<h3 className="text-5xl font-bold mb-3">24/7</h3>
					<p className="text-primary-foreground/80 text-lg">
						Support available
					</p>
				</div>
			</div>
		</section>
	);
}
