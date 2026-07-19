'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import api from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Plus, UploadCloud, X, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function AddItemPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      toast.error('You must be logged in to access this page.');
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    price: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be smaller than 5MB.');
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageFile(file);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageFile(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.shortDescription || !formData.price) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      // If we have an image preview but no real backend upload yet, we can send it as a base64 string
      // Note: MongoDB has a 16MB limit, so large base64 strings might fail.
      const payload = {
        ...formData,
        imageUrl: imagePreview || ''
      };

      const res = await api.post('/items', payload);
      
      if (res.data.success) {
        toast.success('Item added successfully!');
        router.push('/items/manage');
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to add item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 pt-24 pb-16 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Add New Item</h1>
          <p className="text-muted-foreground mt-1">Create a new listing or product to display on the platform.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="shadow-md overflow-hidden">
            <CardHeader className="border-b bg-card rounded-t-xl pb-6">
              <CardTitle>Item Details</CardTitle>
              <CardDescription>Fill out the required information below to create your item.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">

              {/* Photo Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Photo <span className="text-muted-foreground font-normal">(Optional)</span>
                </label>

                {imagePreview ? (
                  <div className="relative w-full h-56 rounded-xl overflow-hidden border border-border group">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="bg-white/90 text-black hover:bg-white border-0"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <UploadCloud className="w-4 h-4 mr-1" /> Change
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        onClick={handleRemoveImage}
                      >
                        <X className="w-4 h-4 mr-1" /> Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`w-full h-44 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors ${
                      isDragging
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">
                        <span className="text-primary">Click to upload</span> or drag & drop
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WEBP up to 5MB</p>
                    </div>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  className="hidden"
                  onChange={handleFileInput}
                />
              </div>

              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Title <span className="text-destructive">*</span></label>
                <Input
                  name="title"
                  placeholder="e.g., Luxury Mountain Cabin"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Price <span className="text-destructive">*</span></label>
                <Input
                  name="price"
                  placeholder="e.g., $150/night"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Short Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Short Description <span className="text-destructive">*</span></label>
                <Input
                  name="shortDescription"
                  placeholder="A brief catchy tagline or summary..."
                  value={formData.shortDescription}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Full Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Full Description <span className="text-muted-foreground font-normal">(Optional)</span></label>
                <Textarea
                  name="fullDescription"
                  placeholder="Provide all the details about your item here..."
                  className="min-h-[150px] resize-y"
                  value={formData.fullDescription}
                  onChange={handleChange}
                />
              </div>

            </CardContent>

            <div className="p-6 pt-0 mt-4 flex items-center justify-end gap-3 border-t bg-muted/50 rounded-b-xl py-4">
              <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
                {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                {isSubmitting ? 'Adding...' : 'Submit (Add)'}
              </Button>
            </div>
          </Card>
        </form>
      </main>
    </div>
  );
}
