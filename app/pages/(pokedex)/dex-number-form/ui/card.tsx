import { Tally1Icon, SectionIcon } from 'lucide-react';

import { cn } from '@/app/shared/lib/cn';

function Card({ children }: { children: React.ReactNode }) {
  return <div className="group ">{children}</div>;
}

function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        ' flex items-center bg-muted/70 rounded-md py-2 px-4 text-muted-foreground font-semibold',
        // 'flex items-center py-2 text-muted-foreground font-bold text-lg',
        className,
      )}
    >
      {children}
    </h3>
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
    <div className={cn('py-2 px-4  border-b last:border-b-0', className)}>
      {children}
    </div>
  );
}

export { Card, CardHeader, CardItem };
