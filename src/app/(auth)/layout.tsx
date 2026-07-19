'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);

  // If loading or user exists, we might want to return null to prevent flash of login page
  // But returning children is fine if we just want them to redirect quickly
  if (!loading && user) return null;

  return <>{children}</>;
}
