'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SERVICES, SERVICE_ACCENT_COLORS } from '@/lib/constants';
import { ServiceType } from '@/types/landing';
import { useStore } from '@/lib/store';
import { PhoneScreen } from '@/components/sections/PhoneScreen';

const SERVICE_ICONS: Record<ServiceType, React.ReactNode> = {
  ride: <span className="material-symbols-outlined">two_wheeler</span>,
  food: <span className="material-symbols-outlined">restaurant</span>,
  mart: <span className="material-symbols-outlined">shopping_basket</span>,
  express: <span className="material-symbols-outlined">local_shipping</span>,
  pay: <span className="material-symbols-outlined">wallet</span>,
};

const TAB_LIST: ServiceType[] = ['ride', 'food', 'mart', 'express', 'pay'];

export function DynamicServiceSwitcher() {
  const activeService = useStore((s) => s.activeService);
  const setActiveService = useStore((s) => s.setActiveService);

  const activeDetail = SERVICES.find((s) => s.id === activeService);
  const accentColor = SERVICE_ACCENT_COLORS[activeService] || '#00B14F';

  return (
    <section
      id="section-services"
      className="relative mx-auto py-section-gap max-w-container-max px-5 md:px-0"
    >
      {/* Tab pills */}
      <div className="mb-12 flex items-center justify-center">
        <div
          role="tablist"
          aria-label="Service switcher"
          className="glass-surface-1 relative inline-flex items-center gap-1 rounded-full p-2 flex-wrap justify-center"
        >
          {TAB_LIST.map((svc) => {
            const isActive = activeService === svc;
            const Icon = SERVICE_ICONS[svc];
            return (
              <button
                key={svc}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveService(svc)}
                className={cn(
                  'relative z-10 flex items-center gap-2 rounded-full px-5 py-2.5 text-label-md font-semibold transition-colors',
                  isActive ? 'text-on-primary' : 'text-on-surface-variant hover:text-primary',
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="service-pill"
                    className="absolute inset-0 rounded-full bg-primary shadow-sm"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  {Icon}
                  {SERVICES.find((s) => s.id === svc)?.label || svc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeService}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="grid grid-cols-1 items-center gap-bento-gap md:grid-cols-2"
        >
          {/* Left: content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full service-badge px-3 py-1.5 w-max">
              {activeDetail && (
                <>
                  {SERVICE_ICONS[activeDetail.id]}
                  <span className="tracking-widest text-primary uppercase text-xs font-semibold">
                    {activeDetail.badge}
                  </span>
                </>
              )}
            </div>

            <h2 className="font-display-lg text-3xl md:text-5xl font-extrabold leading-tight">
              <span className={cn('text-transparent bg-clip-text bg-gradient-to-r', activeDetail?.gradient || '')}>
                {activeDetail?.headline || ''}
              </span>
            </h2>

            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
              {activeDetail?.description || ''}
            </p>

            <div className="grid grid-cols-1 gap-3 pt-2">
              {activeDetail?.features.map((f) => (
                <div
                  key={f.title}
                  className="flex items-start gap-3 rounded-xl border border-white/8 bg-surface-container p-4"
                >
                  <span className="material-symbols-outlined text-primary text-xl shrink-0">{f.icon}</span>
                  <div>
                    <h4 className="font-semibold text-on-surface text-sm">{f.title}</h4>
                    <p className="text-sm text-on-surface-variant">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <motion.a
              href={activeDetail?.cta.href || '#'}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-label-md font-semibold text-on-primary shadow-[0_0_30px_rgba(0,177,79,0.4)]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {activeDetail?.cta.label || 'Cta'}
            </motion.a>
          </div>

          {/* Right: phone mockup */}
          <div className="relative flex h-[600px] items-center justify-center">
            <div className="phone-mockup relative mx-auto h-[580px] w-[280px] overflow-hidden rounded-[2.5rem] border-[8px] border-zinc-800 bg-zinc-900 shadow-2xl">
              <PhoneScreen activeService={activeService} />
            </div>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full blur-[80px] pointer-events-none transition-colors duration-500"
              style={{ backgroundColor: `${hexToRgba(accentColor, 0.15)}` }}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
