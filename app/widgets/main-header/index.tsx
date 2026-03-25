'use client';

import Link from 'next/link';
import { Suspense } from 'react';

import SearchPoke from '@/app/features/search-poke';

import NavLink from './ui/nav-link';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function MainHeader() {
  return (
    <header className="sticky top-0 z-50  w-full ring-1 ring-border bg-background h-14 ">
      <div className="flex gap-8 items-center justify-between backdrop-blur-md h-full w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <Link
          href="/"
          className="flex items-center text-xl font-extrabold text-foreground"
        >
          포케무무
        </Link>
        <div className="">
          <NavLink href={`/pokedex`}>도감</NavLink>
        </div>
        <Suspense>
          <SearchPoke />
        </Suspense>
      </div>
    </header>
  );
}
