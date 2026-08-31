'use client';

import { Container } from '@/components/common/Container';
import Link from 'next/link';

const footerLinks = [
  { label: 'Help Center', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Drive with Grab', href: '#' },
  { label: 'Be a Partner', href: '#' },
  { label: 'Careers', href: '#' },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-white/8 bg-surface-container-lowest py-16 backdrop-blur-3xl">
      <Container className="flex flex-col gap-12">
        {/* Top: Logo + Links */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row">
          <div className="font-headline-lg text-headline-lg font-extrabold text-on-surface">
            Grab
          </div>

          <div className="flex flex-wrap gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-label-md text-on-surface-variant transition-colors duration-300 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* App Download CTA */}
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-white/8 bg-surface-container p-8 text-center md:flex-row md:justify-center md:gap-8">
          <div>
            <h3 className="font-headline-lg text-headline-lg font-bold text-on-surface mb-2">
              Siap Berkendara?
            </h3>
            <p className="text-sm text-on-surface-variant">
              Unduh aplikasi Grab atau jadi mitra kami hari ini.
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              href="#"
              className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-on-primary font-label-md font-semibold shadow-[0_0_20px_rgba(0,177,79,0.3)] transition-transform duration-300 hover:scale-105"
            >
              Download App
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-on-surface-variant border-t border-white/8 pt-8">
          © {new Date().getFullYear()} Grab. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
