import { useState, useEffect } from 'react';
import { ListingCard, ListingCardSkeleton, ListingType } from './ListingCard';
import { PackageOpen } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import api from '@/lib/axios';

export function ListingSection() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<ListingType[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get('/items');
        if (res.data.success) {
          const mappedItems = res.data.data.slice(0, 8).map((item: any) => ({
            ...item,
            id: item._id,
          }));
          setListings(mappedItems);
        }
      } catch (error) {
        console.error('Error fetching items', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  return (
    <section className="w-full py-12 md:py-16">
      <div className="flex flex-col gap-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Featured Stays</h2>
        <p className="text-muted-foreground">Discover top-rated places around the world.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => <ListingCardSkeleton key={i} />)}
        </div>
      ) : listings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-2xl gap-4 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <PackageOpen className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">No listings yet</h3>
            <p className="text-muted-foreground text-sm">Items you add will appear here.</p>
          </div>
          <Link href="/items/add">
            <Button variant="outline" className="mt-2">Add Your First Item</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listings.map(listing => <ListingCard key={listing.id} listing={listing} />)}
        </div>
      )}
    </section>
  );
}
