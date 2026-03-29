import { CardItem } from '../card';

interface RestInfoItemProps {
  label: string;
  children: React.ReactNode;
}

export default function RestInfoItem({ label, children }: RestInfoItemProps) {
  return (
    <CardItem key={label}>
      <div className="flex flex-col p-6 bg-card rounded-xl border">
        <div className="font-medium text-muted-foreground">{label}</div>
        <div className="flex-1 break-keep text-pretty text-lg pt-1">
          {children}
        </div>
      </div>
    </CardItem>
  );
}
