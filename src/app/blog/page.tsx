import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

const FEATURED_POST = {
  id: 'featured',
  title: 'The Future of AI-Assisted Travel: How Smart Platforms Are Changing the Way We Explore',
  excerpt: 'Artificial intelligence is no longer a futuristic concept — it\'s reshaping the way millions of travelers discover, plan, and book their stays. We dive deep into what the next decade looks like for the travel industry.',
  category: 'Industry Insights',
  author: 'Sarah Johnson',
  authorInitials: 'SJ',
  authorColor: 'from-violet-500 to-purple-600',
  date: 'July 14, 2026',
  readTime: '8 min read',
  imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=1200',
};

const BLOG_POSTS = [
  {
    id: '1',
    title: '10 Hidden Gem Destinations You Need to Visit Before They Go Mainstream',
    excerpt: 'From undiscovered coastal villages in Portugal to secret mountain retreats in Kyrgyzstan — here\'s our curated list of places that are still blissfully off the radar.',
    category: 'Travel Guides',
    author: 'Marcus Chen',
    authorInitials: 'MC',
    authorColor: 'from-blue-500 to-cyan-600',
    date: 'July 10, 2026',
    readTime: '5 min read',
  },
  {
    id: '2',
    title: 'How to Become a Top-Rated Host: Lessons from Our Most Successful Partners',
    excerpt: 'We sat down with our top 1% of hosts to uncover their secrets — from photography tips to communication strategies that keep guests coming back.',
    category: 'Hosting Tips',
    author: 'Aisha Patel',
    authorInitials: 'AP',
    authorColor: 'from-pink-500 to-rose-600',
    date: 'July 6, 2026',
    readTime: '7 min read',
  },
  {
    id: '3',
    title: 'Sustainable Travel in 2026: A Practical Guide for the Conscious Explorer',
    excerpt: 'Reducing your carbon footprint while still seeing the world is no longer a contradiction. Here\'s how to travel responsibly without sacrificing the experience.',
    category: 'Sustainability',
    author: 'Tom Rivera',
    authorInitials: 'TR',
    authorColor: 'from-emerald-500 to-teal-600',
    date: 'July 1, 2026',
    readTime: '6 min read',
  },
  {
    id: '4',
    title: 'Budget vs. Luxury: We Tried Both for the Same Trip — Here\'s What We Found',
    excerpt: 'Is an expensive stay actually worth it? Our editorial team tested both ends of the budget spectrum on a 7-day trip to Japan. The results may surprise you.',
    category: 'Reviews',
    author: 'Sarah Johnson',
    authorInitials: 'SJ',
    authorColor: 'from-violet-500 to-purple-600',
    date: 'June 25, 2026',
    readTime: '9 min read',
  },
  {
    id: '5',
    title: 'The Rise of "Workcations": How Remote Work is Reshaping Hospitality',
    excerpt: 'As the lines between work and leisure continue to blur, hosts and platforms are rapidly adapting. We explore the data behind this seismic shift.',
    category: 'Trends',
    author: 'Marcus Chen',
    authorInitials: 'MC',
    authorColor: 'from-blue-500 to-cyan-600',
    date: 'June 20, 2026',
    readTime: '4 min read',
  },
];

const CATEGORIES = ['All', 'Industry Insights', 'Travel Guides', 'Hosting Tips', 'Sustainability', 'Reviews', 'Trends'];

const CATEGORY_COLORS: Record<string, string> = {
  'Industry Insights': 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  'Travel Guides': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Hosting Tips': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  'Sustainability': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  'Reviews': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  'Trends': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
};

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${CATEGORY_COLORS[category] || 'bg-muted text-muted-foreground'}`}>
      {category}
    </span>
  );
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Header */}
      <section className="relative pt-40 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-1/3 w-72 h-72 bg-primary/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-cyan-500/8 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-3xl text-center">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
            <BookOpen className="w-7 h-7" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-5">
            The{' '}
            <span className="bg-gradient-to-r from-primary via-blue-500 to-cyan-400 bg-clip-text text-transparent">Nexus Journal</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Stories, guides, and insights for the curious traveler and savvy host.
          </p>
        </div>
      </section>

      {/* Category Pills */}
      <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button key={cat} className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors border ${cat === 'All' ? 'bg-foreground text-background border-foreground' : 'bg-transparent text-muted-foreground hover:bg-muted border-transparent'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-16">

        {/* Featured Post */}
        <div className="mb-16">
          <Link href={`/blog/${FEATURED_POST.id}`} className="group block">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border shadow-xl shadow-black/5 dark:shadow-white/5 hover:shadow-2xl transition-shadow duration-500 bg-card">
              <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={FEATURED_POST.imageUrl}
                  alt={FEATURED_POST.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <CategoryBadge category={FEATURED_POST.category} />
                    <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">Featured</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight mb-5 group-hover:text-primary transition-colors">{FEATURED_POST.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">{FEATURED_POST.excerpt}</p>
                </div>
                <div className="flex items-center justify-between pt-6 border-t">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${FEATURED_POST.authorColor} flex items-center justify-center text-white text-sm font-bold`}>
                      {FEATURED_POST.authorInitials}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{FEATURED_POST.author}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />{FEATURED_POST.date} · {FEATURED_POST.readTime}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Blog Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="group block">
                <Card className="h-full overflow-hidden border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-0 flex flex-col h-full">
                    {/* Gradient Placeholder */}
                    <div className={`h-2 w-full bg-gradient-to-r ${post.authorColor}`} />
                    <div className="p-6 flex flex-col flex-1">
                      <CategoryBadge category={post.category} />
                      <h3 className="mt-4 font-bold text-lg leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-3">{post.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
                      <div className="flex items-center gap-3 mt-6 pt-4 border-t">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${post.authorColor} flex items-center justify-center text-white text-xs font-bold`}>
                          {post.authorInitials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-xs truncate">{post.author}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3 shrink-0" />{post.readTime}
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{post.date}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-16">
          <Button variant="outline" size="lg" className="px-10 rounded-full">
            Load More Articles
          </Button>
        </div>
      </div>
    </div>
  );
}
