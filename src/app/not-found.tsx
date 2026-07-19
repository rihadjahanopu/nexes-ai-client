'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, SearchX } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Abstract Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-destructive/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full max-w-2xl text-center space-y-8"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex justify-center"
            >
              <div className="relative">
                <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary/40 tracking-tighter drop-shadow-sm">
                  404
                </h1>
                <div className="absolute -top-6 -right-6 h-20 w-20 bg-background rounded-full flex items-center justify-center border-4 border-primary/20 shadow-xl">
                  <SearchX className="h-10 w-10 text-primary" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="space-y-4"
            >
              <h2 className="text-3xl font-bold tracking-tight">Oops! Page not found</h2>
              <p className="text-muted-foreground text-lg max-w-md mx-auto">
                The page you're looking for doesn't exist or has been moved. 
                Let's get you back on track.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Button 
                onClick={() => router.back()} 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto h-12 px-8"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
              <Link href="/">
                <Button 
                  size="lg"
                  className="w-full sm:w-auto h-12 px-8"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
