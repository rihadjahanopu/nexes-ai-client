import { Navbar } from '@/components/layout/Navbar';
import { ListingCard, ListingType } from '@/components/listings/ListingCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Share, Heart, Wifi, Car, Coffee, Wind, Check, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Dummy data for the specific listing
const LISTING_DATA = {
  id: '1',
  title: 'Modern Seaside Villa',
  description: 'Experience unparalleled luxury in this stunning seaside villa. Featuring breathtaking panoramic ocean views, a private infinity pool, and state-of-the-art amenities, this is the perfect getaway for those seeking tranquility and elegance. The open-plan living area seamlessly blends indoor and outdoor spaces, allowing you to enjoy the gentle sea breeze at all times.',
  price: '$450/night',
  rating: 4.9,
  reviewsCount: 128,
  location: 'Malibu, California',
  host: 'Sarah Johnson',
  images: [
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1600607687931-cebf14f045c7?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
  ],
  specs: [
    { label: 'Guests', value: '8' },
    { label: 'Bedrooms', value: '4' },
    { label: 'Bathrooms', value: '3.5' },
    { label: 'Area', value: '3,200 sqft' },
  ],
  amenities: [
    { name: 'Fast WiFi', icon: <Wifi className="w-4 h-4" /> },
    { name: 'Free Parking', icon: <Car className="w-4 h-4" /> },
    { name: 'Coffee Maker', icon: <Coffee className="w-4 h-4" /> },
    { name: 'Air Conditioning', icon: <Wind className="w-4 h-4" /> },
  ],
  reviews: [
    {
      id: 'r1',
      author: 'Michael T.',
      date: 'October 2023',
      rating: 5,
      content: 'Absolutely incredible stay. The views are even better than the photos. We spent most of our time by the infinity pool. The house was spotless and the host was very communicative.',
    },
    {
      id: 'r2',
      author: 'Jessica W.',
      date: 'September 2023',
      rating: 4,
      content: 'Beautiful home and great location. A bit pricey but worth it for a special occasion. Only minor issue was the WiFi was slightly spotty in one of the bedrooms.',
    },
  ]
};

// Dummy related items
const RELATED_ITEMS: ListingType[] = [
  {
    id: '2',
    title: 'Cozy Mountain Cabin',
    description: 'Escape to nature in this rustic yet luxurious cabin.',
    imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800',
    price: '$200/night',
    rating: 4.7,
    location: 'Aspen, Colorado',
    date: 'Available Now',
  },
  {
    id: '3',
    title: 'Downtown Penthouse',
    description: 'Experience city living at its finest with skyline views.',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1e524084f7?auto=format&fit=crop&q=80&w=800',
    price: '$350/night',
    rating: 4.8,
    location: 'New York City, NY',
    date: 'Oct 1 - Oct 5',
  },
  {
    id: '4',
    title: 'Desert Oasis Retreat',
    description: 'Unwind in the desert with luxury amenities.',
    imageUrl: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=800',
    price: '$280/night',
    rating: 4.6,
    location: 'Joshua Tree, CA',
    date: 'Oct 10 - Oct 15',
  },
];

export default function ListingDetailsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-7xl">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <Link href="/listings" className="hover:text-primary transition-colors">Stays</Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-foreground">{LISTING_DATA.title}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{LISTING_DATA.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1 font-medium">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {LISTING_DATA.rating} <span className="text-muted-foreground underline cursor-pointer">({LISTING_DATA.reviewsCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="underline cursor-pointer">{LISTING_DATA.location}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Share className="w-4 h-4" /> Share
              </Button>
              <Button variant="outline" size="sm" className="gap-2 group hover:border-red-200">
                <Heart className="w-4 h-4 group-hover:fill-red-500 group-hover:text-red-500 transition-colors" /> Save
              </Button>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12">
          <div className="md:col-span-2 row-span-2 relative h-full">
            <Image 
              src={LISTING_DATA.images[0]} 
              alt="Main view" 
              fill 
              className="object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
            />
          </div>
          <div className="hidden md:block relative h-full">
            <Image 
              src={LISTING_DATA.images[1]} 
              alt="View 2" 
              fill 
              className="object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
            />
          </div>
          <div className="hidden md:block relative h-full">
            <Image 
              src={LISTING_DATA.images[2]} 
              alt="View 3" 
              fill 
              className="object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
            />
          </div>
          <div className="hidden md:block relative h-full">
            <Image 
              src={LISTING_DATA.images[3]} 
              alt="View 4" 
              fill 
              className="object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
            />
          </div>
          <div className="hidden md:block relative h-full">
            <Image 
              src={LISTING_DATA.images[4]} 
              alt="View 5" 
              fill 
              className="object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/50 transition-colors">
              <span className="text-white font-medium flex items-center gap-2">
                View all photos
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Overview & Key Info */}
            <section>
              <div className="flex items-center justify-between border-b pb-6 mb-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-1">Entire villa hosted by {LISTING_DATA.host}</h2>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    {LISTING_DATA.specs.map(spec => (
                      <span key={spec.label}>{spec.value} {spec.label}</span>
                    ))}
                  </div>
                </div>
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl font-bold">
                  {LISTING_DATA.host.charAt(0)}
                </div>
              </div>

              {/* Description */}
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {LISTING_DATA.description}
                </p>
                <Button variant="link" className="px-0 mt-2 font-semibold">Show more <ChevronRight className="w-4 h-4 ml-1"/></Button>
              </div>
            </section>

            {/* Specifications / Amenities */}
            <section className="pt-6 border-t">
              <h3 className="text-xl font-semibold mb-6">What this place offers</h3>
              <div className="grid grid-cols-2 gap-4">
                {LISTING_DATA.amenities.map(amenity => (
                  <div key={amenity.name} className="flex items-center gap-3 text-muted-foreground">
                    {amenity.icon}
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-8">Show all 24 amenities</Button>
            </section>

            {/* Reviews Section */}
            <section className="pt-6 border-t">
              <div className="flex items-center gap-2 mb-8">
                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                <h3 className="text-2xl font-semibold">{LISTING_DATA.rating} · {LISTING_DATA.reviewsCount} reviews</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {LISTING_DATA.reviews.map(review => (
                  <div key={review.id} className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center font-semibold">
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{review.author}</div>
                        <div className="text-sm text-muted-foreground">{review.date}</div>
                      </div>
                    </div>
                    <div className="flex text-yellow-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'fill-muted text-muted'}`} />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {review.content}
                    </p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-8">Show all {LISTING_DATA.reviewsCount} reviews</Button>
            </section>
          </div>

          {/* Right Column - Booking Card (Sticky) */}
          <div className="relative">
            <div className="sticky top-24">
              <Card className="border-border shadow-xl shadow-black/5 dark:shadow-white/5">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    {LISTING_DATA.price} <span className="text-base font-normal text-muted-foreground">night</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
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

                  <div className="text-center text-sm text-muted-foreground">
                    You won't be charged yet
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex justify-between text-sm">
                      <span className="underline cursor-pointer">$450 x 5 nights</span>
                      <span>$2,250</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="underline cursor-pointer">Cleaning fee</span>
                      <span>$120</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="underline cursor-pointer">Service fee</span>
                      <span>$350</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between font-bold pt-4 border-t text-lg">
                    <span>Total before taxes</span>
                    <span>$2,720</span>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Badge */}
              <div className="mt-6 p-4 border rounded-xl flex items-start gap-4 bg-muted/30">
                <div className="mt-1">
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h4 className="font-medium">Free cancellation for 48 hours.</h4>
                  <p className="text-sm text-muted-foreground">After that, cancel before check-in and get a 50% refund, minus the service fee.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Items Section */}
        <section className="pt-16 mt-16 border-t">
          <h2 className="text-2xl font-bold mb-8">More places to stay</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {RELATED_ITEMS.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
