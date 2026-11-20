import Link from 'next/link';
import { Suspense } from 'react';

import ThemeToggle from './theme-toggle';
import MobileNav from './mobile-nav';
import { navItems } from './nav-items';
import { cn } from '@/_shared/lib/cn';

export default function AppHeader() {
  return (
    <header
      className={cn(
        // 불투명 배경 (흐림 효과 없음): 아래로 지나가는 목록·표 머리글이 비치지 않게
        'sticky top-0 z-50 w-full bg-background',
      )}
    >
      <div className="flex h-(--header-height) gap-1 items-center justify-between w-full px-2 sm:px-4 md:px-6">
        <Link href="/" className="px-1 text-xl font-extrabold text-foreground">
          포케무무
        </Link>

        <div className="items-center gap-x-1.5 flex-1 px-6 hidden lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-x-1">
          <Suspense>
            <ThemeToggle />
          </Suspense>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}
function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'font-medium px-4 h-9 inline-flex items-center rounded-2xl border border-transparent',
        'hover:text-primary-text hover:font-semibold',
        'active:bg-accent outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 transition-all duration-200',
      )}
    >
      {children}
    </Link>
  );
}
