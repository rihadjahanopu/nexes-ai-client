'use client';

export function StatisticsSection() {
	return (
		<section className="py-24 bg-primary text-primary-foreground">
			<div className="container mx-auto px-4 flex flex-col md:flex-row justify-around text-center gap-12">
				<div>
					<h3 className="text-5xl font-bold mb-3">10x</h3>
					<p className="text-primary-foreground/80 text-lg">
						Faster execution
					</p>
				</div>
				<div className="hidden md:block w-px bg-primary-foreground/20" />
				<div>
					<h3 className="text-5xl font-bold mb-3">95%</h3>
					<p className="text-primary-foreground/80 text-lg">
						Task accuracy
					</p>
				</div>
				<div className="hidden md:block w-px bg-primary-foreground/20" />
				<div>
					<h3 className="text-5xl font-bold mb-3">24/7</h3>
					<p className="text-primary-foreground/80 text-lg">
						Autonomous operation
					</p>
				</div>
			</div>
		</section>
	);
}
