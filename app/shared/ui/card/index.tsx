import { cn } from '../../lib/cn';

function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-4xl py-6 flex flex-col overflow-hidden gap-6 border bg-card',
        className,
      )}
    >
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
    <div className={cn('px-6 flex flex-col gap-2', className)}>{children}</div>
  );
}

function CardDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('text-sm text-muted-foreground', className)}>
      {children}
    </div>
  );
}

function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('text-xl font-bold', className)}>{children}</div>;
}

function CardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('px-6 flex flex-col gap-6', className)}>{children}</div>
  );
}

function CardGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('flex flex-col gap-3', className)}>{children}</div>;
}

function CardGroupLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('font-medium text-lg', className)}>{children}</div>;
}

function CardItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('', className)}>{children}</div>;
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardGroup,
  CardGroupLabel,
  CardItem,
};
