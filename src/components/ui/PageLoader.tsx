'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function PageLoaderInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [prevPath, setPrevPath] = useState('');

  useEffect(() => {
    const current = pathname + searchParams.toString();

    if (prevPath && prevPath !== current) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
        setPrevPath(current);
      }, 600);
      return () => clearTimeout(timer);
    }

    setPrevPath(current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
        >
          {/* Dark overlay tint */}
          <div className="absolute inset-0 bg-background/60" />

          {/* Fancy loader card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative z-10 flex flex-col items-center gap-6 px-10 py-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl"
          >
            {/* Spinning rings */}
            <div className="relative w-14 h-14">
              {/* Outer ring */}
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-transparent"
                style={{ borderTopColor: 'hsl(var(--primary))', borderRightColor: 'hsl(var(--primary) / 0.3)' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
              />
              {/* Middle ring */}
              <motion.span
                className="absolute inset-[6px] rounded-full border-2 border-transparent"
                style={{ borderBottomColor: 'hsl(var(--primary) / 0.7)', borderLeftColor: 'hsl(var(--primary) / 0.2)' }}
                animate={{ rotate: -360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              />
              {/* Center dot */}
              <motion.span
                className="absolute inset-[14px] rounded-full bg-primary/80"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            {/* Pulsing dots */}
            <div className="flex gap-2 items-center">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary/70"
                  animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 0.7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.15,
                  }}
                />
              ))}
            </div>

            {/* Label */}
            <p className="text-sm font-medium text-foreground/60 tracking-widest uppercase">
              Loading
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// useSearchParams needs Suspense boundary
export function PageLoader() {
  return (
    <Suspense fallback={null}>
      <PageLoaderInner />
    </Suspense>
  );
}
