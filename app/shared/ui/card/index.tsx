import { cn } from '../../lib/cn';

type CardVariant = 'bordered' | 'borderless';

function Card({
  children,
  className,
  variant = 'bordered',
}: {
  children: React.ReactNode;
  className?: string;
  variant?: CardVariant;
}) {
  const cardVariantsMap: Record<CardContentVariant, string> = {
    bordered: 'ring ring-border',
    borderless: '',
  };

  const cardVariant = cardVariantsMap[variant];

  return (
    <div
      className={cn(
        'rounded-4xl py-6 flex flex-col overflow-hidden gap-6 bg-card shadow-sm',
        cardVariant,
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
    <div className={cn('px-6 flex flex-col gap-1.5', className)}>
      {children}
    </div>
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
    <div
      className={cn(
        'text-sm text-muted-foreground text-pretty break-keep',
        className,
      )}
    >
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
  return (
    <div
      className={cn('text-xl font-bold flex gap-1.5 items-center', className)}
    >
      {children}
    </div>
  );
}

type CardContentVariant = 'bordered' | 'borderless';

function CardContent({
  children,
  className,
  variant = 'borderless',
}: {
  children: React.ReactNode;
  className?: string;
  variant?: CardContentVariant;
}) {
  const contentPaddingMap: Record<CardContentVariant, string> = {
    bordered: 'px-4',
    borderless: 'px-6',
  };

  const contentPadding = contentPaddingMap[variant];
  return (
    <div className={cn('px-6 flex flex-col gap-6', contentPadding, className)}>
      {children}
    </div>
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
