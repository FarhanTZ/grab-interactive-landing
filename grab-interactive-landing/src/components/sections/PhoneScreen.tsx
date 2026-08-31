'use client';

import { ServiceType } from '@/types/landing';

const PHONE_SCREENS: Record<ServiceType, React.ReactNode> = {
  ride: (
    <div className="relative h-full w-full bg-[#0f1410] flex flex-col">
      <div className="h-36 w-full bg-gradient-to-br from-primary/30 to-primary/5 flex items-center justify-center">
        <span className="material-symbols-outlined text-5xl text-primary">two_wheeler</span>
      </div>
      <div className="flex-1 rounded-t-3xl border-t border-white/8 bg-surface p-5 flex flex-col gap-3 -mt-4">
        <div className="h-1.5 w-12 rounded-full bg-white/20 mx-auto mb-2" />
        <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-surface-container p-3">
          <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg text-lg">my_location</span>
          <div>
            <div className="text-xs text-on-surface-variant">Pick-up</div>
            <div className="text-sm font-semibold text-on-surface">Pacific Century Place</div>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-surface-container p-3">
          <span className="material-symbols-outlined text-red-400 bg-red-400/10 p-2 rounded-lg text-lg">location_on</span>
          <div>
            <div className="text-xs text-on-surface-variant">Drop-off</div>
            <div className="text-sm font-semibold text-on-surface">Grand Indonesia</div>
          </div>
        </div>
        <div className="mt-2 rounded-full bg-primary py-3 text-center text-sm font-bold text-white">Cari Driver</div>
      </div>
    </div>
  ),
  food: (
    <div className="relative h-full w-full bg-[#0f1410] p-5 pt-10 flex flex-col gap-4">
      <div className="text-lg font-bold text-white">Food Delivery</div>
      <div className="flex gap-3 overflow-x-auto">
        {['Burgers', 'Sushi', 'Ayam Geprek'].map((t) => (
          <div key={t} className="min-w-[100px] rounded-xl bg-surface-container border border-white/8 p-3 text-center">
            <span className="material-symbols-outlined text-primary text-2xl">restaurant</span>
            <div className="text-xs font-semibold text-white mt-1">{t}</div>
            <div className="text-[10px] text-white/60">15-20 min</div>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-surface-container border border-white/8 p-3 flex gap-3 items-center">
        <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary">lunch_dining</span>
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Burger King - 4.8 ★</div>
          <div className="text-xs text-white/60">Free delivery • 20 min</div>
        </div>
      </div>
    </div>
  ),
  mart: (
    <div className="relative h-full w-full bg-[#0f1410] p-5 pt-10">
      <div className="text-lg font-bold text-white mb-4">GrabMart</div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: 'local_florist', label: 'Fresh Produce' },
          { icon: 'shopping_basket', label: 'Daily Needs' },
          { icon: 'medication', label: 'Pharmacy' },
          { icon: 'bakery_dining', label: 'Snacks' },
        ].map((c) => (
          <div key={c.label} className="aspect-square bg-surface-container rounded-xl border border-white/8 flex flex-col items-center justify-center p-4">
            <span className="material-symbols-outlined text-primary text-3xl mb-2">{c.icon}</span>
            <div className="text-xs font-semibold text-white text-center">{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  ),
  express: (
    <div className="relative h-full w-full bg-[#0f1410] p-5 pt-10">
      <div className="text-lg font-bold text-white mb-4">GrabExpress</div>
      <div className="space-y-3">
        {[
          { id: '#GRB-8421', status: 'In Transit' },
          { id: '#GRB-8390', status: 'Delivered' },
        ].map((p) => (
          <div key={p.id} className="w-full rounded-xl border border-white/8 bg-surface-container flex p-3 gap-3 items-center">
            <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">local_shipping</span>
            <div className="flex-1">
              <div className="text-sm font-semibold text-white">{p.id}</div>
              <div className="text-xs text-white/60">{p.status} • Live tracking</div>
            </div>
            <span className="text-xs text-primary">Track</span>
          </div>
        ))}
      </div>
    </div>
  ),
  pay: (
    <div className="relative h-full w-full bg-[#0f1410] p-5 pt-10">
      <div className="text-lg font-bold text-white mb-4">GrabPay</div>
      <div className="rounded-2xl bg-gradient-to-br from-primary to-emerald-700 p-5 text-white">
        <div className="text-xs opacity-80">Saldo OVO</div>
        <div className="text-2xl font-extrabold mt-1">Rp 1.250.000</div>
        <div className="flex gap-2 mt-4">
          <span className="flex-1 rounded-full bg-white/20 py-2 text-center text-xs font-semibold">Top Up</span>
          <span className="flex-1 rounded-full bg-white text-primary py-2 text-center text-xs font-semibold">Transfer</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-4">
        {['Scan', 'Bills', 'History'].map((a) => (
          <div key={a} className="rounded-xl bg-surface-container border border-white/8 py-4 text-center">
            <span className="material-symbols-outlined text-primary">wallet</span>
            <div className="text-xs text-white mt-1">{a}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export function PhoneScreen({ activeService }: { activeService: ServiceType }) {
  return <div className="h-full w-full overflow-hidden">{PHONE_SCREENS[activeService] || PHONE_SCREENS.ride}</div>;
}
