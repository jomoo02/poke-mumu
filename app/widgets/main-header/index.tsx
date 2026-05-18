'use client';

import Link from 'next/link';
import { Suspense } from 'react';

import SearchPoke from '@/app/features/search-poke';

import ThemeToggle from './ui/theme-toggle';
import { useSidebar } from '@/app/shared/ui/sidebar';
import { Button } from '@/app/shared/ui/button';
import { MenuIcon } from 'lucide-react';

export default function MainHeader() {
  const { toggleSidebar } = useSidebar();
  return (
    <header className="sticky top-0 z-50  w-full bg-background flex items-center">
      <div className="flex  h-14 shadow shadow-border  gap-1 sm:gap-3 items-center justify-between backdrop-blur-md  w-full px-4">
        <div className="flex items-center gap-1 sm:gap-3">
          <Button variant={'ghost'} onClick={toggleSidebar} className="size-10">
            <MenuIcon className="size-5" strokeWidth={2.1} />
          </Button>
          <Link
            href="/"
            className="flex items-center text-xl font-extrabold text-foreground"
          >
            포케무무
          </Link>
        </div>
        <div className="flex-1 lg:max-w-72 mx-auto w-full flex items-center justify-end">
          <Suspense>
            <SearchPoke />
          </Suspense>
        </div>
        <div className="flex items-center">
          <Suspense>
            <ThemeToggle />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
