import Link from 'next/link';
import { Suspense } from 'react';

import { SidebarTrigger } from '@/_shared/ui/sidebar';

import ThemeToggle from './theme-toggle';

export default function AppHeader({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/70 backdrop-blur-md">
      <div className="flex h-(--header-height) gap-1 items-center justify-between w-full px-2 sm:px-4">
        <div className="flex items-center gap-2.5">
          <SidebarTrigger className="rounded-4xl size-10 border-0" />
          <Link
            href="/"
            className="px-1 text-xl font-extrabold text-foreground"
          >
            포케무무
          </Link>
        </div>
        {children}
        <div className="flex items-center gap-x-1">
          {/* <Suspense>
            <SearchPoke />
          </Suspense> */}
          <Suspense>
            <ThemeToggle />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
