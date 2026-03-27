import { cn } from '@/app/shared/lib/cn';

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-xl border bg-card overflow-hidden', className)}>
      {children}
    </div>
  );
}

function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'px-4 py-3 bg-muted/40 border-b text-sm font-semibold text-muted-foreground uppercase tracking-wider',
        className,
      )}
    >
      {children}
    </div>
  );
}

function CardItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('px-4 py-3 border-b last:border-b-0', className)}>
      {children}
    </div>
  );
}

export { Card, CardHeader, CardItem };
