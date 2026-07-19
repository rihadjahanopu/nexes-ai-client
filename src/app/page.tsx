import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { 
  BrainCircuit, FolderGit2, MessageSquare, Zap, 
  UploadCloud, Bot, CheckCircle, GitBranch, 
  MessageCircle, Layout, Database, ArrowRight, Quote,
  ChevronDown, Code2, Target, BookOpen, ShieldCheck,
  Lock, Server, Key, Shield, Mail
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-20">
          <div className="container mx-auto px-4 text-center z-10 relative">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium tracking-wide">
              ✨ The Future of Productivity is Here
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
              Your Autonomous <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-500">
                Workspace Copilot
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              Nexus doesn't just manage your tasks—it executes them. Combine project management with agentic AI to analyze data, draft strategies, and automate workflows.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/25 hover:scale-105 transition-transform">
                  Start for free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full bg-background/50 backdrop-blur hover:bg-muted">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Abstract Background Effects */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-30 pointer-events-none -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-500 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob" />
            <div className="absolute inset-0 bg-gradient-to-l from-purple-500 to-pink-500 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000 opacity-70" />
          </div>
        </section>

        {/* Logos/Integrations Section */}
        <section className="py-10 border-y bg-muted/20 overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm font-medium text-muted-foreground mb-6 uppercase tracking-widest">Integrates with your favorite tools</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2 text-xl font-bold"><GitBranch className="h-8 w-8" /> Code & Git</div>
              <div className="flex items-center gap-2 text-xl font-bold"><MessageCircle className="h-8 w-8" /> Messaging</div>
              <div className="flex items-center gap-2 text-xl font-bold"><Layout className="h-8 w-8" /> Projects</div>
              <div className="flex items-center gap-2 text-xl font-bold"><Database className="h-8 w-8" /> Database</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 bg-background relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Supercharge your workflow</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Everything you need to manage projects and automate execution in one place.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<FolderGit2 className="h-10 w-10 text-primary" />}
                title="Smart Workspaces"
                description="Organize your projects, upload documents, and track activity in one cohesive environment."
              />
              <FeatureCard 
                icon={<BrainCircuit className="h-10 w-10 text-blue-500" />}
                title="Agentic Reasoning"
                description="Our AI breaks down complex goals into actionable steps and selects the right tools for the job."
              />
              <FeatureCard 
                icon={<MessageSquare className="h-10 w-10 text-purple-500" />}
                title="Contextual Chat"
                description="Chat with an AI assistant that remembers your past interactions and project history."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-32 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">How Nexus Works</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">From idea to execution in three simple steps.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 relative">
              {/* Connector Line */}
              <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />
              
              <StepCard 
                number="1"
                icon={<UploadCloud className="h-8 w-8 text-primary" />}
                title="Upload Context"
                description="Create a project and upload your documents, code, or ideas to give the AI context."
              />
              <StepCard 
                number="2"
                icon={<Bot className="h-8 w-8 text-blue-500" />}
                title="Agent Plans"
                description="The autonomous agent analyzes the context and creates a step-by-step execution plan."
              />
              <StepCard 
                number="3"
                icon={<CheckCircle className="h-8 w-8 text-green-500" />}
                title="Automated Execution"
                description="Review the plan and let the agent execute tasks, write code, or draft reports automatically."
              />
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-around text-center gap-12">
            <div>
              <h3 className="text-5xl font-bold mb-3">10x</h3>
              <p className="text-primary-foreground/80 text-lg">Faster execution</p>
            </div>
            <div className="hidden md:block w-px bg-primary-foreground/20" />
            <div>
              <h3 className="text-5xl font-bold mb-3">95%</h3>
              <p className="text-primary-foreground/80 text-lg">Task accuracy</p>
            </div>
            <div className="hidden md:block w-px bg-primary-foreground/20" />
            <div>
              <h3 className="text-5xl font-bold mb-3">24/7</h3>
              <p className="text-primary-foreground/80 text-lg">Autonomous operation</p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-32 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Loved by Innovators</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">See what our users are saying about Nexus.</p>
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

        {/* Pricing Section */}
        <section className="py-32 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Start for free, upgrade when you need more power.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Tier */}
              <div className="bg-card border rounded-3xl p-10 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <p className="text-muted-foreground mb-6">Perfect for individuals and small tasks.</p>
                <div className="text-5xl font-extrabold mb-8">$0<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
                <ul className="space-y-4 mb-10">
                  <PricingFeature text="Up to 3 active projects" />
                  <PricingFeature text="Basic agentic reasoning" />
                  <PricingFeature text="100 AI queries per month" />
                  <PricingFeature text="Community support" />
                </ul>
                <Button className="w-full h-12 rounded-full" variant="outline">Get Started</Button>
              </div>
              
              {/* Pro Tier */}
              <div className="bg-card border-2 border-primary rounded-3xl p-10 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-bold rounded-bl-xl">POPULAR</div>
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <p className="text-muted-foreground mb-6">For professionals who need maximum autonomy.</p>
                <div className="text-5xl font-extrabold mb-8">$29<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
                <ul className="space-y-4 mb-10">
                  <PricingFeature text="Unlimited projects" />
                  <PricingFeature text="Advanced Agentic AI (GPT-4o/Claude 3.5)" />
                  <PricingFeature text="Unlimited AI queries" />
                  <PricingFeature text="Priority 24/7 support" />
                </ul>
                <Button className="w-full h-12 rounded-full shadow-lg shadow-primary/25">Upgrade to Pro</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Target Audience Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Built for modern teams</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Nexus adapts to your role and workflow.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <AudienceCard 
                title="Software Engineers"
                description="Automate code reviews, draft documentation, and generate boilerplate code instantly."
                icon={<Code2 className="h-8 w-8 text-primary" />}
              />
              <AudienceCard 
                title="Product Managers"
                description="Turn rough ideas into PRDs, track feature progress, and analyze user feedback autonomously."
                icon={<Target className="h-8 w-8 text-blue-500" />}
              />
              <AudienceCard 
                title="Researchers"
                description="Upload hundreds of papers and let Nexus extract key findings and draft summaries."
                icon={<BookOpen className="h-8 w-8 text-purple-500" />}
              />
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="py-24 bg-muted/30 border-y">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="h-20 w-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                <ShieldCheck className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Enterprise-grade security</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">Your data is yours. Nexus uses end-to-end encryption for your documents, and our AI models are never trained on your private workspace data. SOC2 Type II compliance coming soon.</p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-lg font-medium"><div className="bg-primary/10 p-2 rounded-full"><Lock className="h-5 w-5 text-primary"/></div> AES-256 Encryption</li>
                <li className="flex items-center gap-3 text-lg font-medium"><div className="bg-primary/10 p-2 rounded-full"><Server className="h-5 w-5 text-primary"/></div> Private isolated databases</li>
                <li className="flex items-center gap-3 text-lg font-medium"><div className="bg-primary/10 p-2 rounded-full"><Key className="h-5 w-5 text-primary"/></div> SSO & SAML support (Pro)</li>
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

        {/* Resources Section */}
        <section className="py-32 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Latest Insights</h2>
                <p className="text-xl text-muted-foreground">Learn how to maximize your autonomous workspace.</p>
              </div>
              <Button variant="outline" className="rounded-full px-6 shadow-sm">View all articles <ArrowRight className="ml-2 h-4 w-4"/></Button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <BlogCard title="The Rise of Agentic Workflows" date="Jul 12, 2026" category="AI Trends" imageId="1" />
              <BlogCard title="How to structure context for better AI outputs" date="Jul 05, 2026" category="Guides" imageId="2" />
              <BlogCard title="Why traditional project management is dying" date="Jun 28, 2026" category="Opinion" imageId="3" />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-32 bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h2>
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

        {/* Newsletter Section */}
        <section className="py-24 bg-background border-t">
          <div className="container mx-auto px-4">
            <div className="bg-primary/5 rounded-3xl p-10 md:p-16 border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay ahead of the curve</h2>
                <p className="text-lg text-muted-foreground">Join our newsletter to get the latest updates on agentic AI, productivity tips, and exclusive early access features.</p>
              </div>
              <div className="flex-1 w-full max-w-md">
                <form className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input type="email" placeholder="Enter your email" className="w-full h-14 pl-12 pr-4 rounded-full border border-input bg-background shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50" required />
                  </div>
                  <Button type="submit" size="lg" className="h-14 rounded-full px-8">Subscribe</Button>
                </form>
                <p className="text-xs text-muted-foreground mt-3 text-center md:text-left">No spam, unsubscribe anytime.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to delegate your work?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Join thousands of professionals who are redefining productivity with agentic AI.
            </p>
            <Link href="/register">
              <Button size="lg" className="h-16 px-12 text-xl rounded-full shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                Create your Workspace <Zap className="ml-2 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 mb-4 inline-block">
                Nexus
              </Link>
              <p className="text-muted-foreground max-w-sm">
                The ultimate autonomous workspace for professionals. Let AI execute your tasks while you focus on strategy.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#features" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="#how-it-works" className="hover:text-primary transition-colors">How it Works</Link></li>
                <li><Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm">
            <p>© 2026 Nexus AI. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              {/* Social Icons Placeholder */}
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 hover:text-primary cursor-pointer transition-colors">𝕏</div>
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 hover:text-primary cursor-pointer transition-colors">in</div>
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 hover:text-primary cursor-pointer transition-colors">gh</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-card border rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="mb-6 bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function StepCard({ number, icon, title, description }: { number: string, icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="relative flex flex-col items-center text-center z-10">
      <div className="w-20 h-20 rounded-full bg-background border-4 border-muted flex items-center justify-center mb-6 shadow-xl shadow-black/5 relative">
        {icon}
        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center border-2 border-background">
          {number}
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function TestimonialCard({ quote, name, role }: { quote: string, name: string, role: string }) {
  return (
    <div className="bg-card border rounded-3xl p-8 hover:shadow-lg transition-shadow flex flex-col">
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
    </div>
  );
}

function PricingFeature({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3">
      <CheckCircle className="h-5 w-5 text-primary shrink-0" />
      <span>{text}</span>
    </li>
  );
}

function FaqItem({ question, answer }: { question: string, answer: string }) {
  return (
    <details className="group border rounded-2xl bg-card overflow-hidden [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 font-semibold text-lg">
        {question}
        <ChevronDown className="h-5 w-5 transition duration-300 group-open:-rotate-180" />
      </summary>
      <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
        {answer}
      </div>
    </details>
  );
}

function AudienceCard({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) {
  return (
    <div className="bg-card border rounded-3xl p-8 hover:border-primary/50 hover:shadow-lg transition-all flex flex-col">
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function BlogCard({ title, date, category, imageId }: { title: string, date: string, category: string, imageId: string }) {
  return (
    <div className="group cursor-pointer">
      <div className="w-full aspect-[4/3] rounded-3xl bg-muted overflow-hidden mb-6 relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-500/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity" />
        <div className={`w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110 ${imageId === '1' ? 'bg-[url("https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800")]' : imageId === '2' ? 'bg-[url("https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800")]' : 'bg-[url("https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800")]'}`} />
      </div>
      <div className="flex items-center gap-4 text-sm font-medium mb-3">
        <span className="text-primary">{category}</span>
        <span className="text-muted-foreground">{date}</span>
      </div>
      <h3 className="text-2xl font-bold group-hover:text-primary transition-colors line-clamp-2">{title}</h3>
    </div>
  );
}
