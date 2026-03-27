import { CardItem } from '../card';

interface RestInfoItemProps {
  label: string;
  children: React.ReactNode;
}

export default function RestInfoItem({ label, children }: RestInfoItemProps) {
  return (
    <CardItem key={label}>
      <div className="flex ">
        <div className="w-34 text-muted-foreground">{label}</div>
        <div className="flex-1 break-keep text-pretty">{children}</div>
      </div>
    </CardItem>
  );
}
