import { CardItem } from '../card';

interface RestInfoItemProps {
  label: string;
  children: React.ReactNode;
}

export default function RestInfoItem({ label, children }: RestInfoItemProps) {
  return (
    <CardItem key={label}>
      <div className="flex">
        <div className="font-medium text-muted-foreground w-1/3">{label}</div>
        <div className="break-keep text-pretty">{children}</div>
      </div>
    </CardItem>
  );
}
