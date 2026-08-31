import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getProgressBetween(progress: number, range: [number, number]): number {
  const [start, end] = range;
  return Math.min(Math.max((progress - start) / (end - start), 0), 1);
}