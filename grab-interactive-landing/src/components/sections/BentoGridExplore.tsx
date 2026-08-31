'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, type MouseEvent } from 'react';
import { cn } from '@/lib/utils';
import { BENTO_CARDS } from '@/lib/constants';

const CATEGORY_FILTERS = ['Semua', 'Food', 'Mart', 'Ride'];

export function BentoGridExplore() {
  const [activeFilter, setActiveFilter] = useState('Semua');

  const filtered = BENTO_CARDS.filter((c) => {
    if (activeFilter === 'Semua') return true;
    return c.tag === activeFilter;
  });

  return (
    <section id="section-bento" className="relative mx-auto py-section-gap max-w-container-max px-5 md:px-0">
      <div className="mb-12 text-center">
        <h2 className="font-headline-xl text-headline-xl font-bold text-on-surface mb-4">Jelajahi Layanan Grab</h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto">
          Temukan penawaran dan layanan terbaik dari ekosistem superapp kami.
        </p>
      </div>

      <div className="mb-8 flex justify-center gap-2">
        {CATEGORY_FILTERS.map((f) => (
          <motion.button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={cn(
              'rounded-full px-5 py-2 text-sm font-semibold transition-all',
              activeFilter === f
                ? 'bg-primary text-on-primary shadow-[0_0_20px_rgba(0,177,79,0.3)]'
                : 'glass-surface-1 text-on-surface-variant hover:text-primary',
            )}
            whileTap={{ scale: 0.95 }}
          >
            {f}
          </motion.button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 gap-bento-gap sm:grid-cols-2 md:grid-cols-3">
        <AnimatePresence>
          {filtered.map((card) => (
            <motion.div
              key={card.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={cn(
                'relative group cursor-pointer overflow-hidden rounded-2xl border border-white/8 bg-surface-container hover:border-primary/40',
                card.colSpanDesktop,
              )}
              style={{ willChange: 'transform' }}
            >
              <TiltCard>
                <div className={cn('h-[200px] w-full p-6 flex flex-col justify-between bg-gradient-to-br', card.bgGradient)}>
                  <div className="flex justify-between items-start">
                    <span className="material-symbols-outlined text-3xl text-white/80">
                      {card.mediaType === 'lottie' ? 'restaurant_menu' : card.mediaType === 'image' ? 'local_florist' : 'show_chart'}
                    </span>
                    <span className="text-xs font-medium text-white/70 bg-white/10 px-2 py-1 rounded-full">{card.tag}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{card.title}</h3>
                    <p className="text-sm text-white/70 mt-1">{card.subtitle}</p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTransform({ x: (y - 0.5) * 8, y: (x - 0.5) * -8 });
  };
  const handleMouseLeave = () => setTransform({ x: 0, y: 0 });

  return (
    <motion.div
      className="h-full w-full"
      style={{
        transform: `perspective(1000px) rotateX(${transform.x}deg) rotateY(${transform.y}deg)`,
        willChange: 'transform',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: `radial-gradient(300px circle at ${50 + transform.y * 3}% ${50 + transform.x * 3}%, rgba(255,255,255,0.08), transparent 60%)`,
        }}
      />
    </motion.div>
  );
}
