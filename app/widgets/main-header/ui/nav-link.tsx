'use client';

import Link from 'next/link';

import { cn } from '@/app/shared/lib/cn';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'font-medium hover:bg-accent px-4 h-10 inline-flex items-center rounded-lg active:bg-accent focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 transition-all duration-200',
      )}
    >
      {children}
    </Link>
  );
}
