import { cn } from '@/_shared/lib/cn';

interface ResultCountProps {
  count: number;
  className?: string;
}

export default function ResultCount({ count, className }: ResultCountProps) {
  return (
    <p
      aria-live="polite"
      className={cn(
        'shrink-0 text-sm font-medium text-foreground/70',
        className,
      )}
    >
      {count.toLocaleString('ko-KR')} Pokémon
    </p>
  );
}
