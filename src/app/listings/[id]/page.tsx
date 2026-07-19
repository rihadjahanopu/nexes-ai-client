'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ListingCard, ListingType } from '@/components/listings/ListingCard';
import {
  MapPin, Share, Heart, ChevronRight, Check,
  Star, Loader2, Send, Home, Copy, CheckCheck
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import api from '@/lib/axios';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

interface Review {
  _id: string;
  user: string;
  name: string;
  avatar?: string;
  rating: number;
  content: string;
  createdAt: string;
}

interface Spec {
  label: string;
  value: string;
}

interface ItemDetail {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription?: string;
  price: string;
  imageUrl?: string;
  images?: string[];
  category?: string;
  location?: string;
  rating: number;
  reviewCount: number;
  specs?: Spec[];
  reviews?: Review[];
  owner?: { name: string; avatar?: string };
}

// Reusable avatar component
function UserAvatar({ name, avatar, size = 'md' }: { name: string; avatar?: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizeMap = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-xl',
  };
  if (avatar) {
    return (
      <div className={`${sizeMap[size]} rounded-full overflow-hidden shrink-0 border border-border/50`}>
        <Image src={avatar} alt={name} width={56} height={56} className="w-full h-full object-cover" />
      </div>
    );
  }
  return (
    <div className={`${sizeMap[size]} bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold uppercase shrink-0`}>
      {name.charAt(0)}
    </div>
  );
}

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="focus:outline-none"
        >
          <Star
            className={`w-6 h-6 transition-colors ${
              star <= (hovered || value)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-muted-foreground'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export default function ListingDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const [item, setItem] = useState<ItemDetail | null>(null);
  const [related, setRelated] = useState<ListingType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const [reviewContent, setReviewContent] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await api.get(`/items/${id}`);
        if (res.data.success) {
          setItem(res.data.data);
          const mappedRelated = (res.data.related || []).map((r: any) => ({
            ...r,
            id: r._id,
            date: new Date(r.createdAt).toLocaleDateString(),
          }));
          setRelated(mappedRelated);
        }
      } catch {
        toast.error('Failed to load listing.');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchItem();

    // Load saved state from localStorage
    const savedItems: string[] = JSON.parse(localStorage.getItem('savedListings') || '[]');
    setSaved(savedItems.includes(id as string));
  }, [id]);

  const handleShare = async () => {
    const url = window.location.href;
    const title = item?.title || 'Check out this listing';
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = () => {
    const saved_: string[] = JSON.parse(localStorage.getItem('savedListings') || '[]');
    let updated: string[];
    if (saved_.includes(id as string)) {
      updated = saved_.filter((s) => s !== id);
      setSaved(false);
      toast('Removed from saved listings', { icon: '🗑️' });
    } else {
      updated = [...saved_, id as string];
      setSaved(true);
      toast.success('Saved to your listings!');
    }
    localStorage.setItem('savedListings', JSON.stringify(updated));
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast.error('You must be logged in to leave a review.'); return; }
    if (!reviewRating) { toast.error('Please select a star rating.'); return; }
    if (!reviewContent.trim()) { toast.error('Please write a review.'); return; }

    setSubmittingReview(true);
    try {
      const res = await api.post(`/items/${id}/reviews`, { rating: reviewRating, content: reviewContent });
      if (res.data.success) {
        toast.success('Review submitted!');
        setReviewContent('');
        setReviewRating(0);
        // Refresh item to get updated reviews
        const updated = await api.get(`/items/${id}`);
        if (updated.data.success) setItem(updated.data.data);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to submit review.');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Navbar />
        <Loader2 className="animate-spin h-10 w-10 text-primary" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <Navbar />
        <Home className="w-12 h-12 text-muted-foreground" />
        <p className="text-lg font-semibold">Listing not found.</p>
        <Link href="/listings"><Button variant="outline">Back to Listings</Button></Link>
      </div>
    );
  }

  const images = (item.images && item.images.length > 0) ? item.images : (item.imageUrl ? [item.imageUrl] : []);
  const specs = item.specs?.filter(s => s.label && s.value) || [];
  const reviews = item.reviews || [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-16 max-w-7xl">

        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-6 gap-1">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/listings" className="hover:text-primary transition-colors">Stays</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground truncate max-w-[200px]">{item.title}</span>
        </div>

        {/* Title & Actions */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{item.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {item.rating > 0 && (
                <div className="flex items-center gap-1 font-medium">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{item.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">({item.reviewCount} reviews)</span>
                </div>
              )}
              {item.location && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.location}</span>
                </div>
              )}
              {item.category && (
                <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
                  {item.category}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" size="sm" className="gap-2" onClick={handleShare}>
              {copied ? <CheckCheck className="w-4 h-4 text-green-500" /> : <Share className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Share'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`gap-2 transition-colors ${saved ? 'border-red-300 bg-red-50 dark:bg-red-950/20' : 'hover:border-red-200'}`}
              onClick={handleSave}
            >
              <Heart className={`w-4 h-4 transition-all duration-200 ${saved ? 'fill-red-500 text-red-500 scale-110' : 'group-hover:fill-red-500 group-hover:text-red-500'}`} />
              {saved ? 'Saved' : 'Save'}
            </Button>
          </div>
        </div>

        {/* ===== IMAGE GALLERY ===== */}
        {images.length > 0 && (
          <div className="mb-12">
            {/* Main image */}
            <div className="relative w-full h-[400px] md:h-[520px] rounded-2xl overflow-hidden mb-3">
              <Image
                src={images[activeImage]}
                alt={item.title}
                fill
                className="object-cover transition-all duration-500"
                priority
              />
              {images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm text-sm font-medium px-3 py-1 rounded-full">
                  {activeImage + 1} / {images.length}
                </div>
              )}
            </div>
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {images.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === idx ? 'border-primary shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={src} alt={`View ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== MAIN CONTENT ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left column */}
          <div className="lg:col-span-2 space-y-10">

            {/* Overview */}
            <section className="border-b pb-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-1">
                    Hosted by {item.owner?.name || 'Anonymous'}
                  </h2>
                  {specs.length > 0 && (
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      {specs.map((s) => (
                        <span key={s.label}>{s.value} {s.label}</span>
                      ))}
                    </div>
                  )}
                </div>
                <UserAvatar name={item.owner?.name || 'A'} avatar={item.owner?.avatar} size="lg" />
              </div>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {item.shortDescription}
              </p>
            </section>

            {/* Full Description */}
            {item.fullDescription && (
              <section className="border-b pb-10">
                <h3 className="text-xl font-semibold mb-4">About this place</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {item.fullDescription}
                </p>
              </section>
            )}

            {/* Key Specifications */}
            {specs.length > 0 && (
              <section className="border-b pb-10">
                <h3 className="text-xl font-semibold mb-6">Key Specifications</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {specs.map((spec) => (
                    <div key={spec.label} className="bg-muted/40 rounded-xl p-4 border border-border/50">
                      <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-1">{spec.label}</p>
                      <p className="text-lg font-bold">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Reviews */}
            <section className="border-b pb-10">
              <div className="flex items-center gap-3 mb-8">
                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                <h3 className="text-2xl font-semibold">
                  {item.rating > 0 ? `${item.rating.toFixed(1)} · ` : ''}{item.reviewCount} {item.reviewCount === 1 ? 'review' : 'reviews'}
                </h3>
              </div>

              {reviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  {reviews.map((review) => (
                    <div key={review._id} className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <UserAvatar name={review.name} avatar={review.avatar} size="md" />
                        <div>
                          <div className="font-medium text-sm">{review.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} className={`w-3.5 h-3.5 ${s <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted fill-muted'}`} />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{review.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm mb-8">No reviews yet. Be the first to leave one!</p>
              )}

              {/* Submit Review */}
              {user ? (
                <form onSubmit={handleSubmitReview} className="bg-muted/30 border rounded-2xl p-6 space-y-4">
                  <h4 className="font-semibold text-base">Leave a Review</h4>
                  <StarRating value={reviewRating} onChange={setReviewRating} />
                  <Textarea
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                    placeholder="Share your experience..."
                    rows={3}
                  />
                  <Button
                    type="submit"
                    disabled={submittingReview}
                    className="gap-2 bg-gradient-to-r from-primary to-blue-600"
                  >
                    {submittingReview
                      ? <><Loader2 className="animate-spin w-4 h-4" /> Submitting...</>
                      : <><Send className="w-4 h-4" /> Submit Review</>
                    }
                  </Button>
                </form>
              ) : (
                <div className="bg-muted/30 border rounded-2xl p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    <Link href="/login" className="text-primary font-semibold hover:underline">Log in</Link> to leave a review.
                  </p>
                </div>
              )}
            </section>

          </div>

          {/* Right — Booking Card */}
          <div className="relative">
            <div className="sticky top-24">
              <Card className="border-border shadow-xl shadow-black/5 dark:shadow-white/5">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    ${item.price} <span className="text-base font-normal text-muted-foreground">/ night</span>
                  </CardTitle>
                  {item.rating > 0 && (
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{item.rating.toFixed(1)}</span>
                      <span className="text-muted-foreground">({item.reviewCount} reviews)</span>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid grid-cols-2 gap-px bg-border border border-border rounded-lg overflow-hidden">
                    <div className="p-3 bg-card flex flex-col cursor-pointer hover:bg-muted/50 transition-colors">
                      <span className="text-[10px] font-bold uppercase text-foreground">Check-in</span>
                      <span className="text-sm text-muted-foreground">Add date</span>
                    </div>
                    <div className="p-3 bg-card flex flex-col cursor-pointer hover:bg-muted/50 transition-colors">
                      <span className="text-[10px] font-bold uppercase text-foreground">Checkout</span>
                      <span className="text-sm text-muted-foreground">Add date</span>
                    </div>
                    <div className="col-span-2 p-3 bg-card flex flex-col cursor-pointer hover:bg-muted/50 transition-colors">
                      <span className="text-[10px] font-bold uppercase text-foreground">Guests</span>
                      <span className="text-sm text-muted-foreground">1 guest</span>
                    </div>
                  </div>

                  <Button className="w-full text-lg py-6 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg">
                    Reserve
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">You won&apos;t be charged yet</p>
                </CardContent>
              </Card>

              <div className="mt-4 p-4 border rounded-xl flex items-start gap-3 bg-muted/30">
                <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-sm">Free cancellation for 48 hours.</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Get a full refund if you change your mind.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== RELATED ITEMS ===== */}
        {related.length > 0 && (
          <section className="pt-16 mt-10 border-t">
            <h2 className="text-2xl font-bold mb-8">More places to stay</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {related.map((r) => (
                <ListingCard key={r.id} listing={r} />
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
