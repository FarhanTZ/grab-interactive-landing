'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { DRIVER_CALCULATOR_CONFIG } from '@/lib/constants';
import { useStore } from '@/lib/store';
import { Bike, Car, Store, Wallet } from 'lucide-react';

type PartnerType = 'driver' | 'merchant';

export function PartnerSplitCard() {
  const [activePartner, setActivePartner] = useState<PartnerType>('driver');
  // use global store for calculator so other components can read
  const calculator = useStore((s) => s.calculator);
  const setCalculatorVehicle = useStore((s) => s.setCalculatorVehicle);
  const setCalculatorHours = useStore((s) => s.setCalculatorHours);
  const setCalculatorDays = useStore((s) => s.setCalculatorDays);

  const hourlyRate =
    calculator.vehicleType === 'bike'
      ? DRIVER_CALCULATOR_CONFIG.bikeHourlyRate
      : DRIVER_CALCULATOR_CONFIG.carHourlyRate;
  const dailyEarnings = hourlyRate * calculator.hoursPerDay;
  const weeklyEarnings = dailyEarnings * calculator.daysPerWeek;

  // merchant mock: 30 orders/day avg Rp 25k komisi 15%
  const merchantOrdersPerDay = 30;
  const merchantAvgOrder = 25000;
  const merchantDaily = merchantOrdersPerDay * merchantAvgOrder * 0.15;
  const merchantWeekly = merchantDaily * calculator.daysPerWeek;

  return (
    <section id="section-partner" className="relative mx-auto py-section-gap max-w-container-max px-5 md:px-0">
      <div className="mb-12 text-center">
        <h2 className="font-headline-xl text-headline-xl font-bold text-on-surface mb-4">
          Bergabunglah dengan Ekosistem Grab
        </h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto">
          Dukung mitra driver dan merchant dalam menggerakkan perekonomian digital.
        </p>
      </div>

      <div className="relative mb-12 h-[420px] w-full max-w-4xl mx-auto overflow-hidden rounded-3xl border border-white/8 bg-surface-container">
        <div
          className="absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            background:
              activePartner === 'driver'
                ? 'linear-gradient(90deg, rgba(0,177,79,0.12) 0%, transparent 55%)'
                : 'linear-gradient(90deg, transparent 45%, rgba(0,177,79,0.12) 100%)',
          }}
        />
        <div className="relative z-10 grid h-full grid-cols-1 md:grid-cols-2">
          <button
            onClick={() => setActivePartner('driver')}
            className={cn(
              'relative flex flex-col items-center justify-center p-8 text-center transition-all',
              activePartner === 'driver' ? 'bg-primary/5' : 'text-on-surface-variant hover:bg-white/[0.02]',
            )}
            aria-pressed={activePartner === 'driver'}
          >
            <motion.div animate={{ scale: activePartner === 'driver' ? 1.08 : 1 }} transition={{ duration: 0.3 }}>
              <Bike className="h-20 w-20 text-primary mb-4" />
            </motion.div>
            <h3 className="font-bold text-lg text-on-surface mb-2">Mitra Driver</h3>
            <p className="text-sm text-on-surface-variant max-w-sm">Kalkulasi potensi pendapatan harian & mingguan.</p>
          </button>

          <button
            onClick={() => setActivePartner('merchant')}
            className={cn(
              'relative flex flex-col items-center justify-center p-8 text-center transition-all border-t md:border-t-0 md:border-l border-white/5',
              activePartner === 'merchant' ? 'bg-primary/5' : 'text-on-surface-variant hover:bg-white/[0.02]',
            )}
            aria-pressed={activePartner === 'merchant'}
          >
            <motion.div animate={{ scale: activePartner === 'merchant' ? 1.08 : 1 }} transition={{ duration: 0.3 }}>
              <Store className="h-20 w-20 text-primary mb-4" />
            </motion.div>
            <h3 className="font-bold text-lg text-on-surface mb-2">Mitra Merchant</h3>
            <p className="text-sm text-on-surface-variant max-w-sm">Estimasi kenaikan omzet & komisi GrabFood/Mart.</p>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activePartner === 'driver' ? (
          <motion.div
            key="driver"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-white/8 bg-surface-container p-8 max-w-2xl mx-auto"
          >
            <h3 className="font-bold text-xl text-on-surface mb-6 flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" /> Kalkulator Pendapatan Driver
            </h3>
            <div className="mb-6 flex gap-3">
              <button
                onClick={() => setCalculatorVehicle('bike')}
                className={cn(
                  'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all',
                  calculator.vehicleType === 'bike' ? 'bg-primary text-on-primary' : 'glass-surface-1 text-on-surface-variant',
                )}
              >
                <Bike className="h-4 w-4" /> Motor
              </button>
              <button
                onClick={() => setCalculatorVehicle('car')}
                className={cn(
                  'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all',
                  calculator.vehicleType === 'car' ? 'bg-primary text-on-primary' : 'glass-surface-1 text-on-surface-variant',
                )}
              >
                <Car className="h-4 w-4" /> Mobil
              </button>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-sm font-medium text-on-surface-variant mb-2">
                <span>Jam kerja / hari</span>
                <span className="text-primary font-bold">{calculator.hoursPerDay} jam</span>
              </div>
              <input
                aria-label="Jam kerja per hari"
                type="range"
                min={1}
                max={16}
                value={calculator.hoursPerDay}
                onChange={(e) => setCalculatorHours(Number(e.target.value))}
                className="w-full h-2 bg-surface-variant rounded-full appearance-none accent-[#00B14F]"
              />
            </div>
            <div className="mb-6">
              <div className="flex justify-between text-sm font-medium text-on-surface-variant mb-2">
                <span>Hari kerja / minggu</span>
                <span className="text-primary font-bold">{calculator.daysPerWeek} hari</span>
              </div>
              <input
                aria-label="Hari kerja per minggu"
                type="range"
                min={1}
                max={7}
                value={calculator.daysPerWeek}
                onChange={(e) => setCalculatorDays(Number(e.target.value))}
                className="w-full h-2 bg-surface-variant rounded-full appearance-none accent-[#00B14F]"
              />
            </div>
            <div className="text-center rounded-xl bg-primary/10 p-6 border border-primary/20">
              <p className="text-xs uppercase tracking-widest text-on-surface-variant">Estimasi Mingguan</p>
              <p className="text-3xl font-extrabold text-primary mt-2">Rp {weeklyEarnings.toLocaleString('id-ID')}</p>
              <p className="text-sm text-on-surface-variant mt-1">
                Rp {hourlyRate.toLocaleString('id-ID')}/jam × {calculator.hoursPerDay} jam × {calculator.daysPerWeek} hari
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="merchant"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-white/8 bg-surface-container p-8 max-w-2xl mx-auto"
          >
            <h3 className="font-bold text-xl text-on-surface mb-6 flex items-center gap-2">
              <Store className="h-5 w-5 text-primary" /> Kalkulator Merchant
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl bg-white/5 p-4 text-center">
                <p className="text-xs text-on-surface-variant">Pesanan / hari</p>
                <p className="text-2xl font-bold text-on-surface">{merchantOrdersPerDay}</p>
              </div>
              <div className="rounded-xl bg-white/5 p-4 text-center">
                <p className="text-xs text-on-surface-variant">Rata-rata order</p>
                <p className="text-2xl font-bold text-on-surface">Rp {merchantAvgOrder.toLocaleString('id-ID')}</p>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between text-sm font-medium text-on-surface-variant mb-2">
                <span>Hari aktif / minggu</span>
                <span className="text-primary font-bold">{calculator.daysPerWeek} hari</span>
              </div>
              <input
                aria-label="Hari aktif merchant"
                type="range"
                min={1}
                max={7}
                value={calculator.daysPerWeek}
                onChange={(e) => setCalculatorDays(Number(e.target.value))}
                className="w-full h-2 bg-surface-variant rounded-full appearance-none accent-[#00B14F]"
              />
            </div>
            <div className="text-center rounded-xl bg-primary/10 p-6 border border-primary/20">
              <p className="text-xs uppercase tracking-widest text-on-surface-variant">Estimasi Komisi Mingguan (15%)</p>
              <p className="text-3xl font-extrabold text-primary mt-2">Rp {merchantWeekly.toLocaleString('id-ID')}</p>
              <p className="text-sm text-on-surface-variant mt-1">30 order × Rp 25.000 × 15% × {calculator.daysPerWeek} hari</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
