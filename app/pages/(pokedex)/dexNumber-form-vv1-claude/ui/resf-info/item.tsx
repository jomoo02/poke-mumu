import { CardItem } from '../card';

interface RestInfoItemProps {
  label: string;
  children: React.ReactNode;
}

export default function RestInfoItem({ label, children }: RestInfoItemProps) {
  return (
    <CardItem>
      <div className="flex items-baseline gap-2">
        <span className="w-24 sm:w-32 shrink-0 text-sm text-muted-foreground">
          {label}
        </span>
        <span className="flex-1 text-sm">{children}</span>
      </div>
    </CardItem>
  );
}
