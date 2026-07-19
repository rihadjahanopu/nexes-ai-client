import Image from 'next/image';
import { MapPin, Star } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

export interface ListingType {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  imageUrl: string;
  price: string;
  rating: number;
  location?: string;
  date?: string;
  owner?: { name: string; avatar?: string };
}

function OwnerBadge({ owner }: { owner?: { name: string; avatar?: string } }) {
  if (!owner?.name) return null;
  return (
    <div className="flex items-center gap-1.5">
      {owner.avatar ? (
        <div className="w-5 h-5 rounded-full overflow-hidden border border-border/50 shrink-0">
          <Image src={owner.avatar} alt={owner.name} width={20} height={20} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[9px] font-bold uppercase shrink-0">
          {owner.name.charAt(0)}
        </div>
      )}
      <span className="truncate text-xs text-muted-foreground">{owner.name}</span>
    </div>
  );
}

export function ListingCard({ listing }: { listing: ListingType }) {
  const description = listing.shortDescription || listing.description;
  const hasImage = !!listing.imageUrl;

  return (
    <Card className="group h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:shadow-primary/10 border-border/50">
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
        {hasImage ? (
          <Image 
            src={listing.imageUrl} 
            alt={listing.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
            No image
          </div>
        )}
        {/* Rating badge */}
        {listing.rating > 0 && (
          <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold">{listing.rating.toFixed(1)}</span>
          </div>
        )}
        {/* Price overlay */}
        <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
          <span className="text-xs font-bold text-foreground">${listing.price}<span className="font-normal text-muted-foreground">/night</span></span>
        </div>
      </div>

      <CardHeader className="p-4 pb-2">
        <CardTitle className="line-clamp-1 text-base font-semibold">{listing.title}</CardTitle>
        <CardDescription className="line-clamp-2 text-xs mt-1">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 pt-0 flex-1 flex flex-col justify-end">
        <div className="flex flex-col gap-2 text-xs text-muted-foreground">
          {listing.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{listing.location}</span>
            </div>
          )}
          <OwnerBadge owner={listing.owner} />
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 mt-auto bg-transparent border-t-0">
        <Link href={`/listings/${listing.id}`} className="w-full">
          <Button className="w-full transition-all group-hover:bg-primary group-hover:text-primary-foreground" variant="outline">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export function ListingCardSkeleton() {
  return (
    <Card className="h-full flex flex-col overflow-hidden border-border/50">
      <Skeleton className="w-full aspect-[4/3] rounded-none" />
      <CardHeader className="p-4 pb-2">
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-5/6 mt-1" />
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-1 flex flex-col justify-end">
        <div className="flex flex-col gap-2 mt-2">
          <Skeleton className="h-3.5 w-1/2" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-3.5 w-1/3" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto bg-transparent border-t-0">
        <Skeleton className="h-10 w-full rounded-md" />
      </CardFooter>
    </Card>
  );
}
