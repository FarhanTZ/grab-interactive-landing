'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/common/Button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '@/lib/store';

const navLinks = [
  { label: 'Ride', href: '#ride', service: 'ride' as const },
  { label: 'Food', href: '#food', service: 'food' as const },
  { label: 'Mart', href: '#mart', service: 'mart' as const },
  { label: 'Express', href: '#express', service: 'express' as const },
  { label: 'Finance', href: '#pay', service: 'pay' as const },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeService = useStore((s) => s.activeService);
  const setActiveService = useStore((s) => s.setActiveService);

  const handleNavClick = (service: typeof navLinks[number]['service']) => {
    setActiveService(service);
    // scroll via Lenis if available, else native
    const el = document.getElementById('section-services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/8 bg-surface/40 backdrop-blur-2xl">
      <Container className="flex h-20 items-center justify-between">
        <Link href="#" className="font-bold text-2xl text-primary">
          Grab
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.service)}
              className={cn(
                'text-sm font-semibold transition-colors duration-300',
                link.service === activeService ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary',
              )}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Button variant="primary" size="md" className="hidden sm:inline-flex">
            Download App
          </Button>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            className="md:hidden text-on-surface focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {mobileMenuOpen && (
        <div className="md:hidden bg-surface/95 backdrop-blur-xl border-t border-white/8">
          <div className="container mx-auto flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  handleNavClick(link.service);
                  setMobileMenuOpen(false);
                }}
                className={cn(
                  'px-6 py-3 text-left text-sm font-semibold transition-colors',
                  link.service === activeService ? 'text-primary bg-primary/10' : 'text-on-surface-variant hover:text-primary',
                )}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
