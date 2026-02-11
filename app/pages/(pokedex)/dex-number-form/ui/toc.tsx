import { cn } from '@/app/shared/lib/cn';
import Link from 'next/link';

interface TocItemProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}
function TocItem({ href, className, children }: TocItemProps) {
  return (
    <Link
      href={href}
      className={cn('p-2 hover:bg-accent w-full text-sm rounded-md', className)}
    >
      {children}
    </Link>
  );
}

export default function Toc() {
  return (
    <div className=" flex flex-col gap-1 px-2 border-l">
      <TocItem href="#abilities">특성</TocItem>
      <TocItem href="#base-stats">스탯</TocItem>
      <TocItem href="#type-defense">방어 상성</TocItem>
      <TocItem href="#evolution">진화</TocItem>
      <TocItem href="#move">기술</TocItem>
    </div>
  );
}
