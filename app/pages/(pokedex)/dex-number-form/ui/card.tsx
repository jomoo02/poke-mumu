import { cn } from '@/app/shared/lib/cn';

function Card({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
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
        'py-2 px-4 font-medium bg-muted/70 rounded-t-md text-muted-foreground',
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
  return <div className={cn('px-4 py-2 border-t', className)}>{children}</div>;
}

export { Card, CardHeader, CardItem };
