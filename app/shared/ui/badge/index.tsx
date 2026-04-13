import { cn } from '../../lib/cn';

const badgeVariants: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-800',
  red: 'bg-red-50 text-red-800',
  secondary: 'bg-secondary text-secondary-foreground',
};

function Badge({
  className,
  children,
  variant,
}: {
  className?: string;
  children: React.ReactNode;
  variant?: string;
}) {
  return (
    <span
      className={cn(
        'px-2 py-px text-xs  bg-primary text-primary-foreground rounded-xl font-medium border border-transparent flex justify-center items-center shrink-0  w-fit overflow-hidden whitespace-nowrap',
        variant && badgeVariants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

export { Badge };
