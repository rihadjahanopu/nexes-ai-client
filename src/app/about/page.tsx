import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Globe, Zap, ShieldCheck, Heart, Users, Star, Home, ArrowRight, LucideIcon } from 'lucide-react';
import Link from 'next/link';

const TEAM = [
  { name: 'Sarah Johnson', role: 'CEO & Co-founder', initials: 'SJ', color: 'from-violet-500 to-purple-600' },
  { name: 'Marcus Chen', role: 'CTO & Co-founder', initials: 'MC', color: 'from-blue-500 to-cyan-600' },
  { name: 'Aisha Patel', role: 'Head of Design', initials: 'AP', color: 'from-pink-500 to-rose-600' },
  { name: 'Tom Rivera', role: 'Head of Engineering', initials: 'TR', color: 'from-emerald-500 to-teal-600' },
];

const STATS: { value: string; label: string; icon: LucideIcon }[] = [
  { value: '50K+',        label: 'Happy Guests',        icon: Users },
  { value: '12K+',        label: 'Verified Properties', icon: Home  },
  { value: '4.9\u2605',  label: 'Average Rating',      icon: Star  },
  { value: '98 Countries',label: 'Worldwide Reach',     icon: Globe },
];

const VALUES: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: Zap,        title: 'Speed & Simplicity', description: 'We believe finding your perfect stay should be fast, intuitive, and stress-free from start to finish.' },
  { icon: ShieldCheck,title: 'Trust & Safety',     description: 'Every property is verified and every review is authentic. Your security is our highest priority.' },
  { icon: Heart,      title: 'Community First',    description: 'We build genuine connections between hosts and guests, fostering meaningful travel experiences.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-28 px-4 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-4xl text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-primary/10 text-primary mb-6">Our Story</span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-none">
            We believe travel<br />
            <span className="bg-gradient-to-r from-primary via-blue-500 to-cyan-400 bg-clip-text text-transparent">changes people.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Nexus was built to make the world of travel accessible, personal, and extraordinary — connecting people with incredible places they'll never forget.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y bg-muted/20">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-4xl font-extrabold tracking-tight">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-primary/10 text-primary mb-4">Our Mission</span>
              <h2 className="text-4xl font-bold tracking-tight mb-6">Making the world feel like home, everywhere you go.</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Founded in 2020, Nexus started with a simple idea: what if finding a perfect stay was as easy as texting a friend? We've spent years obsessing over every detail of the travel experience — from the first search to the final checkout — to make it seamless for both hosts and guests.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, Nexus powers thousands of stays across 98 countries, and we're just getting started. Our AI-driven platform learns what you love and surfaces properties you'll actually want to book.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {VALUES.map((v, idx) => {
                const Icon = v.icon;
                return (
                  <div key={v.title} className={`p-6 rounded-2xl border bg-card shadow-sm hover:shadow-md transition-shadow ${idx === 2 ? 'col-span-2' : ''}`}>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold mb-2">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-4 bg-muted/20 border-t">
        <div className="container mx-auto max-w-5xl text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-primary/10 text-primary mb-4">Meet the Team</span>
          <h2 className="text-4xl font-bold tracking-tight mb-4">Built by people who love travel</h2>
          <p className="text-muted-foreground mb-16 max-w-xl mx-auto">A diverse team of engineers, designers, and travelers united by one goal — to make every trip unforgettable.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {TEAM.map((member) => (
              <div key={member.name} className="flex flex-col items-center gap-4 group">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {member.initials}
                </div>
                <div>
                  <div className="font-bold text-lg">{member.name}</div>
                  <div className="text-sm text-muted-foreground">{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 text-center">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Ready to find your next stay?</h2>
          <p className="text-muted-foreground mb-8">Browse thousands of curated properties around the world.</p>
          <Link href="/listings">
            <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg text-lg px-8 py-6">
              Explore Listings <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
