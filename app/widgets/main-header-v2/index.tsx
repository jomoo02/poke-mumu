'use client';

import Link from 'next/link';
import { Suspense } from 'react';

import SearchPoke from '@/app/features/search-poke';

import ThemeToggle from './ui/theme-toggle';

import { Button } from '@/app/shared/ui/button';
import { MenuIcon } from 'lucide-react';
import NavLink from './ui/nav-link';

export default function MainHeaderV2() {
  return (
    <header className="sticky top-0 z-50  w-full bg-background flex items-center">
      <div className="flex  h-14 shadow shadow-border  gap-1 sm:gap-3 items-center justify-between backdrop-blur-md  w-full px-4 sm:px-6  mx-auto">
        <div className="flex items-center gap-1 sm:gap-3">
          <Link
            href="/"
            className="flex items-center text-xl font-extrabold text-foreground"
          >
            포케무무
          </Link>
        </div>
        <div className="flex items-center gap-x-1.5 flex-1 sm:px-6">
          <NavLink href="/pokedex">도감</NavLink>
          <NavLink href="/ability">특성</NavLink>
          <NavLink href="/move">기술</NavLink>
          <NavLink href="/natures">성격</NavLink>
        </div>
        <div className="flex items-center gap-x-3">
          <Suspense>
            <SearchPoke />
          </Suspense>
          <Suspense>
            <ThemeToggle />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
