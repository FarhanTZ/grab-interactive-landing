import { cn } from '@/lib/utils';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}) {
  const variants = {
    primary:
      'bg-primary-container text-on-primary-container shadow-[0_0_30px_rgba(0,177,79,0.4)] hover:shadow-[0_0_40px_rgba(0,177,79,0.6)]',
    secondary: 'glass-surface-1 text-on-surface hover:bg-white/5',
    ghost: 'text-on-surface-variant hover:text-primary',
  };
  const sizes = {
    sm: 'px-4 py-2 text-label-sm',
    md: 'px-6 py-3 text-label-md',
    lg: 'px-8 py-4 text-label-md',
  };

  return (
    <button
      className={cn(
        'rounded-full font-semibold transition-all duration-300 ease-out',
        'hover:scale-105 active:scale-95',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
