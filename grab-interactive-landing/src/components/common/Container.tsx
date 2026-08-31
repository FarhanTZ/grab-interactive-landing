import { cn } from '@/lib/utils';

export function Container({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'w-full max-w-[1280px] mx-auto px-5 md:px-[64px]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
