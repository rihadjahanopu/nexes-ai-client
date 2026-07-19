import Image from 'next/image';
import { MapPin, Star, Calendar } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export interface ListingType {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  rating: number;
  location: string;
  date: string;
}

export function ListingCard({ listing }: { listing: ListingType }) {
  return (
    <Card className="group h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:shadow-primary/10 border-border/50">
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image 
          src={listing.imageUrl} 
          alt={listing.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold">{listing.rating.toFixed(1)}</span>
        </div>
      </div>

      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start gap-2 mb-1">
          <CardTitle className="line-clamp-1 text-lg font-semibold">{listing.title}</CardTitle>
        </div>
        <CardDescription className="line-clamp-2 text-sm">
          {listing.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 pt-0 flex-1 flex flex-col justify-end">
        <div className="flex flex-col gap-2 mt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">{listing.location}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{listing.date}</span>
            </div>
            <span className="font-bold text-base text-foreground">{listing.price}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 mt-auto bg-transparent border-t-0">
        <Button className="w-full transition-all group-hover:bg-primary group-hover:text-primary-foreground" variant="outline">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ListingCardSkeleton() {
  return (
    <Card className="h-full flex flex-col overflow-hidden border-border/50">
      <Skeleton className="w-full aspect-[4/3] rounded-none" />
      <CardHeader className="p-4 pb-2">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6 mt-1" />
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-1 flex flex-col justify-end">
        <div className="flex flex-col gap-2 mt-4">
          <Skeleton className="h-4 w-1/2" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-5 w-1/4" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto bg-transparent border-t-0">
        <Skeleton className="h-10 w-full rounded-md" />
      </CardFooter>
    </Card>
  );
}
