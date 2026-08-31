'use client';

import { ReactNode, useEffect } from 'react';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';

export function RootProvider({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      {children}
    </SmoothScrollProvider>
  );
}
