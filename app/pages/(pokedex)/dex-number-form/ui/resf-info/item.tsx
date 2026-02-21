import { CardItem } from '../card';

interface RestInfoItemProps {
  label: string;
  children: React.ReactNode;
}

export default function RestInfoItem({ label, children }: RestInfoItemProps) {
  return (
    <CardItem key={label}>
      <div className="flex gap-6">
        <div className="w-24 sm:w-36">{label}</div>
        <div className="flex-1">{children}</div>
      </div>
    </CardItem>
  );
}
