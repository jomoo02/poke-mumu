import { cn } from '@/app/shared/lib/cn';
import Link from 'next/link';

interface TocItemProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}
function TocItem({ href, className, children }: TocItemProps) {
  return (
    <li className="w-full inline-flex">
      <Link
        href={href}
        className={cn(
          'font-medium py-1 hover:text-foreground text-sm text-nowrap text-muted-foreground w-full',
          className,
        )}
      >
        {children}
      </Link>
    </li>
  );
}

export default function Toc() {
  return (
    <ul className="w-full flex flex-col gap-y-1.5 h-full">
      <TocItem href="#abilities">특성</TocItem>
      <TocItem href="#base-stats">스탯</TocItem>
      <TocItem href="#type-defense">방어 상성</TocItem>
      <TocItem href="#evolution">진화</TocItem>
      <TocItem href="#move">기술</TocItem>
    </ul>
  );
}
