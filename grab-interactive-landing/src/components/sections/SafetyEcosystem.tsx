'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/common/Container';
import {
  Shield,
  Bell,
  MapPin,
  Wallet,
  ChevronDown,
} from 'lucide-react';

const features = [
  {
    id: 'safeentry',
    title: 'SafeEntry Verification',
    description: 'Verifikasi identitas mitra yang ketat dengan AI.',
    icon: Shield,
    color: 'text-primary',
  },
  {
    id: 'emergency',
    title: 'Emergency Button',
    description: 'Tombol darurat terhubung langsung ke layanan keamanan.',
    icon: Bell,
    color: 'text-primary',
  },
  {
    id: 'tracking',
    title: 'Real-time Trip Tracking',
    description: 'Pantau perjalanan secara live dari origin ke tujuan.',
    icon: MapPin,
    color: 'text-primary',
  },
  {
    id: 'insurance',
    title: 'Insurance Coverage',
    description: 'perlindungan asuransi lengkap untuk setiap perjalanan.',
    icon: Wallet,
    color: 'text-primary',
  },
];

export function SafetyEcosystem() {
  const [openId, setOpenId] = useState<string | null>(features[0].id);

  return (
    <section
      id="section-safety"
      className="relative mx-auto py-section-gap max-w-container-max"
    >
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full service-badge px-3 py-1.5 mb-4">
          <Shield className="h-4 w-4 text-primary" />
          <span className="font-label-sm text-label-sm tracking-widest text-primary uppercase">
            Keamanan Terjamin
          </span>
        </div>
        <h2 className="font-headline-xl text-headline-xl font-bold text-on-surface">
          Ekonomi Keamanan Grab
        </h2>
      </div>

      <div className="mx-auto max-w-3xl space-y-4">
        {features.map((f, index) => {
          const Icon = f.icon;
          const isOpen = openId === f.id;
          return (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-2xl border border-white/8 bg-surface-container p-4"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : f.id)}
                className="flex w-full items-center gap-4 text-left"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className={cn('h-5 w-5', f.color)} />
                </div>
                <span className="font-label-md text-label-md text-on-surface flex-1">
                  {f.title}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-5 w-5 text-on-surface-variant" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 text-sm text-on-surface-variant pl-14">
                      {f.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
