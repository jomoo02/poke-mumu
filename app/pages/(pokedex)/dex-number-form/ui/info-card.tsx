import { cn } from '@/app/shared/lib/cn';

interface ItemProps {
  subject: string;
  children: React.ReactNode;
  className?: string;
}

function Item({ subject, children, className }: ItemProps) {
  return (
    <div className={cn('grid grid-cols-3', className)}>
      <div className="flex items-center text-muted-foreground font-medium">
        {subject}
      </div>
      <div className="flex-1 flex text-pretty font-medium break-keep col-span-2">
        {children}
      </div>
    </div>
  );
}

interface CardProps {
  title: string;
  children: React.ReactNode;
}

function Container({ title, children }: CardProps) {
  return (
    <div className="py-6 border border-border rounded-2xl shadow-sm shadow-border bg-card">
      <h3 className="text-xl font-semibold px-6">{title}</h3>
      <div className="grid gap-4 p-6 pb-0 pt-4">{children}</div>
    </div>
  );
}

const InfoCard = {
  Container,
  Item,
};

export default InfoCard;
