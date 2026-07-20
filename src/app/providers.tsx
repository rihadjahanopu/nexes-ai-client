'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import { PageLoader } from '@/components/ui/PageLoader';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { ConfirmDialogProvider } from '@/components/ui/ConfirmDialog';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'your_google_client_id'}>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ConfirmDialogProvider>
              {children}
            </ConfirmDialogProvider>
            <PageLoader />
            <Toaster position="top-right" />
          </AuthProvider>
        </QueryClientProvider>
      </NextThemesProvider>
    </GoogleOAuthProvider>
  );
}
