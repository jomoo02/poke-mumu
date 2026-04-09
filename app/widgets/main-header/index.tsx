'use client';

import Link from 'next/link';
import { Suspense } from 'react';

import SearchPoke from '@/app/features/search-poke';

import NavLink from './ui/nav-link';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import MobileNav from './ui/mobile-nav';
import ThemeToggle from './ui/theme-toggle';

const ITEM_LIST = [
  { href: `/pokedex`, label: '도감' },
  { href: `/natures`, label: '성격' },
];

export default function MainHeader() {
  return (
    <header className="sticky top-0 z-50  w-full ring-1 ring-border bg-background h-14 ">
      <div className="flex gap-8 items-center justify-between backdrop-blur-md h-full w-full px-4 sm:px-6 max-w-384 mx-auto xl:px-10">
        <Link
          href="/"
          className="flex items-center text-xl font-extrabold text-foreground"
        >
          포케무무
        </Link>
        <div className="gap-2 lg:flex hidden">
          <div className="">
            <NavLink href={`/pokedex`}>도감</NavLink>
          </div>
          <div className="">
            <NavLink href={`/natures`}>성격</NavLink>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {' '}
          <Suspense>
            <SearchPoke />
            <ThemeToggle />
            <div className="lg:hidden">
              <MobileNav items={ITEM_LIST} />
            </div>
          </Suspense>
        </div>
      </div>
    </header>
  );
}
