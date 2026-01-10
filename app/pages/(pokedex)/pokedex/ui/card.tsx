import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

import { cn } from '@/app/shared/lib/cn';

interface CardProps {
  title: string;
  href: string;
  subTitle?: string;
  children?: React.ReactNode;
}

export default function Card({ title, href, subTitle, children }: CardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group w-full border border-border rounded-2xl p-6 bg-card shadow-sm shadow-border relative flex gap-4 overflow-hidden',
        'active:bg-input/50 hover:bg-input/50 focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:border-ring outline-none',
      )}
    >
      <div className="flex-1 flex flex-col">
        <div className="text-xl font-semibold break-all">{title}</div>
        <div className="font-medium text-muted-foreground text-sm">
          {subTitle}
        </div>
        <div className="text-muted-foreground text-pretty pt-1.5">
          {children}
        </div>
      </div>
      <div>
        <div className="bg-primary rounded-xl size-8.5 flex items-center justify-center group-hover:opacity-80">
          <ArrowUpRight className="size-5 text-primary-foreground" />
        </div>
      </div>
    </Link>
  );
}
