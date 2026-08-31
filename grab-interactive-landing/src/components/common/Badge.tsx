import { cn } from '@/lib/utils';

export function Badge({
  children,
  variant = 'default',
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'default' | 'primary' | 'service';
}) {
  const variants = {
    default: 'bg-surface-container-high text-on-surface-variant',
    primary: 'bg-primary/20 text-primary border border-primary/30',
    service:
      'bg-gradient-to-b from-primary/20 to-primary/5 border border-primary/30 text-primary',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 font-label-sm',
        'text-xs tracking-widest uppercase',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
