'use client';

import Link from 'next/link';
import { Suspense } from 'react';

import SearchPoke from '@/app/features/search-poke';

import ThemeToggle from './ui/theme-toggle';

import { Button } from '@/app/shared/ui/button';
import { MenuIcon } from 'lucide-react';
import NavLink from './ui/nav-link';
import MobileNav from './ui/mobile-nav';

const navItmes = [
  { href: '/pokedex', label: '도감' },
  { href: '/ability', label: '특성' },
  { href: '/move', label: '기술' },
  { href: '/nature', label: '성격' },
];

export default function MainHeaderV2() {
  return (
    <header className="sticky top-0 z-50  w-full bg-background flex items-center">
      <div className="flex  h-14 shadow shadow-border gap-1 sm:gap-3 items-center justify-between backdrop-blur-md  w-full px-4 sm:px-6  mx-auto">
        <div className="flex items-center gap-1 sm:gap-3">
          <Link
            href="/"
            className="flex items-center text-xl font-extrabold text-foreground"
          >
            포케무무
          </Link>
        </div>
        <div className="items-center gap-x-1.5 flex-1 sm:px-6 hidden lg:flex">
          {navItmes.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-x-2.5 lg:gap-x-3">
          <Suspense>
            <SearchPoke />
          </Suspense>
          <Suspense>
            <ThemeToggle />
          </Suspense>
          <div className="lg:hidden">
            <Suspense>
              <MobileNav items={navItmes} />
            </Suspense>
          </div>
        </div>
      </div>
    </header>
  );
}
