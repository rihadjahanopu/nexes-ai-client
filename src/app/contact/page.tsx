'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import {
  Mail, Phone, MapPin, MessageCircle, Code2, Briefcase,
  Loader2, CheckCircle2, LucideIcon,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface ContactItem { icon: LucideIcon; label: string; value: string; href: string; }
interface Social { icon: LucideIcon; label: string; href: string; }

const CONTACT_ITEMS: ContactItem[] = [
  { icon: Mail,   label: 'Email',  value: 'hello@nexus.ai',              href: 'mailto:hello@nexus.ai' },
  { icon: Phone,  label: 'Phone',  value: '+1 (800) 639-8742',           href: 'tel:+18006398742' },
  { icon: MapPin, label: 'Office', value: '340 Pine St, San Francisco, CA', href: '#' },
];

const SOCIALS: Social[] = [
  { icon: MessageCircle, label: 'Twitter',  href: '#' },
  { icon: Code2,         label: 'GitHub',   href: '#' },
  { icon: Briefcase,     label: 'LinkedIn', href: '#' },
];

const TOPICS = ['General Inquiry', 'Partnership', 'Press & Media', 'Technical Support', 'Billing', 'Other'];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', topic: TOPICS[0], message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSent(true);
    }, 1600);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Header */}
      <section className="relative pt-40 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/3 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-3xl text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-primary/10 text-primary mb-6">
            Contact Us
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-5">
            We&apos;d love to{' '}
            <span className="bg-gradient-to-r from-primary via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              hear from you
            </span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Have a question, idea, or just want to say hello? Our team typically responds within 24 hours.
          </p>
        </div>
      </section>

      <section className="pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Left Info Panel */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Get in touch</h2>
                <div className="flex flex-col gap-4">
                  {CONTACT_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        className="group flex items-start gap-4 p-4 rounded-2xl border bg-card hover:bg-muted/40 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-0.5">
                            {item.label}
                          </div>
                          <div className="font-medium">{item.value}</div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {SOCIALS.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        className="w-10 h-10 rounded-xl border bg-card hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center justify-center text-muted-foreground"
                        aria-label={s.label}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-3">
              <Card className="border shadow-xl shadow-black/5 dark:shadow-white/5 overflow-hidden">
                <CardContent className="p-8">
                  {sent ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center gap-6">
                      <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                        <p className="text-muted-foreground">
                          Thanks for reaching out, {form.name}. We&apos;ll get back to you within 24 hours.
                        </p>
                      </div>
                      <Button variant="outline" onClick={() => setSent(false)}>
                        Send another message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Full Name <span className="text-destructive">*</span>
                          </label>
                          <Input
                            name="name"
                            placeholder="John Doe"
                            value={form.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Email Address <span className="text-destructive">*</span>
                          </label>
                          <Input
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Topic</label>
                        <select
                          name="topic"
                          value={form.topic}
                          onChange={handleChange}
                          className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/50"
                        >
                          {TOPICS.map(t => <option key={t}>{t}</option>)}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Message <span className="text-destructive">*</span>
                        </label>
                        <Textarea
                          name="message"
                          placeholder="Tell us how we can help..."
                          className="min-h-[140px] resize-y"
                          value={form.message}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-12 text-base bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting
                          ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
                          : 'Send Message'
                        }
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
