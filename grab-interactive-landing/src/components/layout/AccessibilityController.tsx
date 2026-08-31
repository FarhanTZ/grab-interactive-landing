'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export function AccessibilityController() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="flex items-center gap-2 rounded-full glass-surface-2 px-4 py-2.5 text-sm font-semibold text-on-surface shadow-lg"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        {theme === 'light' ? 'Dark' : 'Light'}
      </motion.button>
    </motion.div>
  );
}
