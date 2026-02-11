import { cn } from '@/app/shared/lib/cn';

interface ItemProps {
  subject: string;
  children: React.ReactNode;
  className?: string;
}

function Item({ subject, children, className }: ItemProps) {
  return (
    <div className={cn('flex', className)}>
      <div className="flex items-center text-muted-foreground min-w-32">
        {subject}
      </div>
      <div className="flex-1 flex text-pretty break-keep ">{children}</div>
    </div>
  );
}

interface CardProps {
  title: string;
  children: React.ReactNode;
}

function Container({ title, children }: CardProps) {
  return (
    <div className="flex flex-col">
      {/* <h3 className="text-2xl font-semibold mb-4">{title}</h3> */}
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

const InfoCard = {
  Container,
  Item,
};

export default InfoCard;
