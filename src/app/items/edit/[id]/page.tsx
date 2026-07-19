'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import api from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, UploadCloud, X, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';

const CATEGORIES = ['Apartment', 'House', 'Villa', 'Cabin', 'Hotel', 'Studio', 'Other'];

interface Spec {
  label: string;
  value: string;
}

export default function EditItemPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    price: '',
    location: '',
    category: 'Other',
  });

  const [specs, setSpecs] = useState<Spec[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      toast.error('You must be logged in to access this page.');
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await api.get(`/items/${params.id}`);
        if (res.data.success) {
          const item = res.data.data;
          setFormData({
            title: item.title || '',
            shortDescription: item.shortDescription || '',
            fullDescription: item.fullDescription || '',
            price: item.price ? item.price.toString().replace(/[^0-9]/g, '') : '',
            location: item.location || '',
            category: item.category || 'Other',
          });
          setImagePreviews(item.images || []);
          setSpecs(item.specs || []);
        }
      } catch (error) {
        toast.error('Failed to fetch item details.');
        router.push('/items/manage');
      } finally {
        setIsLoading(false);
      }
    };

    if (user && params.id) {
      fetchItem();
    }
  }, [user, params.id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSpecChange = (index: number, field: 'label' | 'value', value: string) => {
    setSpecs(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addSpec = () => {
    if (specs.length >= 8) return;
    setSpecs(prev => [...prev, { label: '', value: '' }]);
  };

  const removeSpec = (index: number) => {
    setSpecs(prev => prev.filter((_, i) => i !== index));
  };

  const processImageFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject('Invalid image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        reject('Image must be smaller than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = () => reject('Failed to read file');
      reader.readAsDataURL(file);
    });
  };

  const handleFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const remaining = 5 - imagePreviews.length;
    if (remaining <= 0) {
      toast.error('Maximum 5 images allowed.');
      return;
    }
    const toProcess = fileArray.slice(0, remaining);
    const results: string[] = [];
    for (const file of toProcess) {
      try {
        const base64 = await processImageFile(file);
        results.push(base64);
      } catch (err) {
        toast.error(typeof err === 'string' ? err : 'Failed to process image');
      }
    }
    if (results.length > 0) {
      setImagePreviews(prev => [...prev, ...results]);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) await handleFiles(e.target.files);
    e.target.value = '';
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) await handleFiles(e.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.shortDescription || !formData.price) {
      toast.error('Please fill in all required fields.');
      return;
    }
    if (imagePreviews.length === 0) {
      toast.error('Please upload at least one image.');
      return;
    }

    setIsSubmitting(true);
    try {
      const filteredSpecs = specs.filter(s => s.label.trim() && s.value.trim());
      const payload = {
        ...formData,
        images: imagePreviews,
        imageUrl: imagePreviews[0],
        specs: filteredSpecs,
      };

      const res = await api.put(`/items/${params.id}`, payload);
      if (res.data.success) {
        toast.success('Item updated successfully!');
        router.push('/items/manage');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || !user || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-4xl px-4 pt-28 pb-16">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Edit Listing</h1>
          <p className="text-muted-foreground text-lg">Update the details of your property.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* === IMAGES === */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle>Photos</CardTitle>
              <CardDescription>Upload up to 5 images. The first image will be the cover photo.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Previews */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                  {imagePreviews.map((src, idx) => (
                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group border border-border">
                      <Image src={src} alt={`Preview ${idx + 1}`} fill className="object-cover" />
                      {idx === 0 && (
                        <div className="absolute bottom-0 left-0 right-0 bg-primary/80 text-primary-foreground text-[10px] text-center py-0.5 font-semibold">
                          COVER
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1.5 right-1.5 bg-background/90 text-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Drop zone */}
              {imagePreviews.length < 5 && (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-2xl p-10 cursor-pointer transition-all ${
                    isDragging ? 'border-primary bg-primary/5' : 'border-border/60 hover:border-primary/50 hover:bg-muted/30'
                  }`}
                >
                  <UploadCloud className={`w-10 h-10 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
                  <div className="text-center">
                    <p className="font-medium text-sm">Drag & drop images here</p>
                    <p className="text-xs text-muted-foreground mt-1">or click to browse — PNG, JPG up to 5MB each</p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFileInput}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* === BASIC INFO === */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Title <span className="text-destructive">*</span></label>
                <Input name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Cozy Beach House with Ocean View" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Price per Night <span className="text-destructive">*</span></label>
                  <Input name="price" value={formData.price} onChange={handleChange} placeholder="e.g. 150" type="number" min="0" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Location</label>
                  <Input name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Malibu, California" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">Short Description <span className="text-destructive">*</span></label>
                <Textarea
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder="A brief, catchy summary of the property..."
                  rows={2}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">Full Description</label>
                <Textarea
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleChange}
                  placeholder="Describe your property in detail — amenities, nearby attractions, house rules..."
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>

          {/* === SPECS === */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle>Key Specifications</CardTitle>
              <CardDescription>Add property details like guests, bedrooms, bathrooms, area, etc.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {specs.map((spec, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Input
                    value={spec.label}
                    onChange={(e) => handleSpecChange(index, 'label', e.target.value)}
                    placeholder="Label (e.g. Bedrooms)"
                    className="flex-1"
                  />
                  <Input
                    value={spec.value}
                    onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                    placeholder="Value (e.g. 3)"
                    className="flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => removeSpec(index)}
                    className="text-muted-foreground hover:text-destructive transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {specs.length < 8 && (
                <Button type="button" variant="outline" size="sm" onClick={addSpec} className="gap-1.5">
                  <Plus className="w-4 h-4" /> Add Specification
                </Button>
              )}
            </CardContent>
          </Card>

          {/* === SUBMIT === */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[140px] bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg"
            >
              {isSubmitting ? <><Loader2 className="animate-spin w-4 h-4 mr-2" />Saving...</> : 'Save Changes'}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
