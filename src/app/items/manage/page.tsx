'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import api from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Eye, Trash2, Plus, PackageOpen } from 'lucide-react';
import Image from 'next/image';
import { useConfirm } from '@/components/ui/ConfirmDialog';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface Item {
  id: string;
  title: string;
  category: string;
  price: string;
  status: string;
  dateAdded: string;
  imageUrl?: string;
}

export default function ManageItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const confirm = useConfirm();

  useEffect(() => {
    const fetchMyItems = async () => {
      try {
        const res = await api.get('/items/me');
        if (res.data.success) {
          // Map backend _id to id for the frontend interface
          const mappedItems = res.data.data.map((item: any) => ({
            ...item,
            id: item._id,
            dateAdded: new Date(item.createdAt).toLocaleDateString()
          }));
          setItems(mappedItems);
        }
      } catch (error) {
        toast.error('Failed to load items.');
      } finally {
        setLoading(false);
      }
    };
    fetchMyItems();
  }, []);

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    const ok = await confirm({
      title: 'Delete Item',
      description: 'Are you sure you want to delete this item? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      variant: 'destructive',
    });

    if (ok) {
      try {
        await api.delete(`/items/${id}`);
        setItems(prev => prev.filter(item => item.id !== id));
        toast.success('Item deleted successfully.');
      } catch (error) {
        toast.error('Failed to delete item.');
      }
    }
  };

  const handleView = (id: string) => {
    toast.success(`Viewing item ${id}`);
  };

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 pt-24 pb-16 max-w-6xl">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Manage Items</h1>
            <p className="text-muted-foreground mt-1">View, edit, and manage all your listings.</p>
          </div>
          <Link href="/items/add">
            <Button className="gap-2 shrink-0 shadow-md">
              <Plus className="w-4 h-4" /> Add New Item
            </Button>
          </Link>
        </div>

        {/* Toolbar */}
        <div className="bg-card p-4 rounded-t-xl border border-b-0 shadow-sm flex items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by title or category..."
              className="pl-9 h-10 bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
          </div>
        </div>

        {/* Desktop Table */}
        <div className="bg-card border rounded-b-xl shadow-sm overflow-hidden hidden md:block">
          {loading ? (
            <div className="py-24 flex justify-center">
               <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <PackageOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">No items yet</h3>
                <p className="text-muted-foreground text-sm">Add your first item to get started.</p>
              </div>
              <Link href="/items/add">
                <Button className="gap-2 mt-2">
                  <Plus className="w-4 h-4" /> Add Item
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/40 text-muted-foreground uppercase text-[10px] font-bold tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date Added</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredItems.map(item => (
                    <tr key={item.id} className="hover:bg-muted/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          {item.imageUrl ? (
                            <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border shadow-sm">
                              <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                            </div>
                          ) : (
                            <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center shrink-0 border">
                              <PackageOpen className="w-6 h-6 text-muted-foreground" />
                            </div>
                          )}
                          <span className="font-semibold text-foreground text-base">{item.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{item.category}</td>
                      <td className="px-6 py-4 font-semibold text-foreground">{item.price}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                          item.status === 'Active'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{item.dateAdded}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="sm" onClick={() => handleView(item.id)} className="h-8 px-3 hover:bg-primary/10 hover:text-primary">
                            <Eye className="w-4 h-4 mr-1.5" /> View
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} className="h-8 px-3 text-destructive hover:bg-destructive/10 hover:text-destructive">
                            <Trash2 className="w-4 h-4 mr-1.5" /> Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden flex flex-col gap-4 mt-4">
          {loading ? (
            <div className="py-24 flex justify-center bg-card rounded-2xl border shadow-sm">
               <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="bg-card border rounded-2xl p-10 text-center flex flex-col items-center gap-4 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <PackageOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">No items yet</h3>
                <p className="text-muted-foreground text-sm">Add your first item to get started.</p>
              </div>
              <Link href="/items/add">
                <Button className="gap-2">
                  <Plus className="w-4 h-4" /> Add Item
                </Button>
              </Link>
            </div>
          ) : (
            filteredItems.map(item => (
              <div key={item.id} className="bg-card border rounded-2xl p-4 shadow-sm flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  {item.imageUrl ? (
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border shadow-sm">
                      <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-xl bg-muted flex items-center justify-center shrink-0 border">
                      <PackageOpen className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-lg leading-tight mb-1 line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{item.price}</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        item.status === 'Active'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex border-t pt-4 gap-3">
                  <Button variant="outline" size="sm" className="flex-1 h-10" onClick={() => handleView(item.id)}>
                    <Eye className="w-4 h-4 mr-2" /> View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 h-10 text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

      </main>
    </div>
  );
}
