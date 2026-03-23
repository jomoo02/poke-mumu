import { cn } from '@/app/shared/lib/cn';
import Link from 'next/link';

interface TocItemProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}
function TocItem({ href, className, children }: TocItemProps) {
  return (
    <li className="w-full p-1.5 inline-flex">
      <Link
        href={href}
        className={cn(
          'hover:font-medium hover:text-foreground text-sm text-nowrap text-muted-foreground w-full',
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
    <div className="px-6 overflow-auto bg-sidebar h-full ">
      <ul className="w-full flex flex-col gap-2 px-2 border-l">
        <TocItem href="#abilities">특성</TocItem>
        <TocItem href="#base-stats">스탯</TocItem>
        <TocItem href="#type-defense">방어 상성</TocItem>
        <TocItem href="#evolution">진화</TocItem>
        <TocItem href="#move">기술</TocItem>
      </ul>
    </div>
  );
}
