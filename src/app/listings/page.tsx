'use client';

import { useState, useMemo, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { ListingCard, ListingCardSkeleton, ListingType } from '@/components/listings/ListingCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, SlidersHorizontal, ChevronLeft, ChevronRight, PackageOpen } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/axios';

interface ExtendedListing extends ListingType {
  category: string;
  numericPrice: number;
}

const ITEMS_PER_PAGE = 8;

export default function ExplorePage() {
  const [loading, setLoading] = useState(true);
  const [allListings, setAllListings] = useState<ExtendedListing[]>([]);

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceFilter, setPriceFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('Recommended');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get('/items');
        if (res.data.success) {
          const mappedItems = res.data.data.map((item: any) => ({
            ...item,
            id: item._id,
            description: item.shortDescription,
            owner: item.owner,
            date: item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : undefined,
          }));
          setAllListings(mappedItems);
        }
      } catch (error) {
        console.error('Error fetching items', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const filteredAndSortedListings = useMemo(() => {
    let result = [...allListings];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.location?.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter(item => item.category === selectedCategory);
    }

    if (priceFilter === 'Under $200') result = result.filter(item => item.numericPrice < 200);
    else if (priceFilter === '$200 - $500') result = result.filter(item => item.numericPrice >= 200 && item.numericPrice <= 500);
    else if (priceFilter === 'Over $500') result = result.filter(item => item.numericPrice > 500);

    switch (sortBy) {
      case 'Price: Low to High': result.sort((a, b) => a.numericPrice - b.numericPrice); break;
      case 'Price: High to Low': result.sort((a, b) => b.numericPrice - a.numericPrice); break;
      case 'Highest Rated': result.sort((a, b) => b.rating - a.rating); break;
    }

    return result;
  }, [allListings, searchQuery, selectedCategory, priceFilter, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedListings.length / ITEMS_PER_PAGE);
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedListings.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedListings, currentPage]);

  useEffect(() => { setCurrentPage(1); }, [searchQuery, selectedCategory, priceFilter, sortBy]);

  const categories = ['All', 'Beachfront', 'Cabins', 'City', 'Desert', 'Countryside'];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 pt-24 pb-16 max-w-7xl flex flex-col">

        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Explore Stays</h1>
          <p className="text-muted-foreground text-lg">Find your perfect getaway from our curated selection.</p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 bg-card p-4 rounded-2xl border shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by title or location..."
              className="pl-9 h-11 rounded-xl bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap md:flex-nowrap gap-3">
            <div className="relative flex items-center border rounded-xl bg-background px-3 h-11 shrink-0">
              <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
              <select
                className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer pr-4 appearance-none"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
              >
                <option value="All">Any Price</option>
                <option value="Under $200">Under $200</option>
                <option value="$200 - $500">$200 - $500</option>
                <option value="Over $500">Over $500</option>
              </select>
            </div>
            <div className="relative flex items-center border rounded-xl bg-background px-3 h-11 shrink-0">
              <SlidersHorizontal className="w-4 h-4 mr-2 text-muted-foreground" />
              <select
                className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer pr-4 appearance-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="Recommended">Recommended</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
                <option value="Highest Rated">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors border ${
                selectedCategory === cat
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-card text-muted-foreground hover:bg-muted border-transparent hover:border-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="mb-6 text-sm font-medium text-muted-foreground">
          {!loading && `${filteredAndSortedListings.length} ${filteredAndSortedListings.length === 1 ? 'stay' : 'stays'} found`}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {Array.from({ length: 8 }).map((_, i) => <ListingCardSkeleton key={i} />)}
          </div>
        ) : filteredAndSortedListings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed rounded-2xl gap-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <PackageOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">
                {allListings.length === 0 ? 'No items added yet' : 'No results found'}
              </h3>
              <p className="text-muted-foreground max-w-md">
                {allListings.length === 0
                  ? 'Add your first item and it will appear here for everyone to explore.'
                  : 'Try adjusting your search or filters.'}
              </p>
            </div>
            {allListings.length === 0 ? (
              <Link href="/items/add">
                <Button className="mt-2">Add Your First Item</Button>
              </Link>
            ) : (
              <Button variant="outline" className="mt-2" onClick={() => {
                setSearchQuery(''); setSelectedCategory('All'); setPriceFilter('All'); setSortBy('Recommended');
              }}>
                Clear all filters
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {currentItems.map(listing => <ListingCard key={listing.id} listing={listing} />)}
          </div>
        )}

        {/* Pagination */}
        {!loading && filteredAndSortedListings.length > 0 && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-auto pt-8 border-t">
            <Button variant="outline" size="icon" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="rounded-full w-10 h-10">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-full text-sm font-semibold transition-colors ${currentPage === i + 1 ? 'bg-foreground text-background' : 'hover:bg-muted text-muted-foreground'}`}>
                  {i + 1}
                </button>
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="rounded-full w-10 h-10">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

      </main>
    </div>
  );
}
