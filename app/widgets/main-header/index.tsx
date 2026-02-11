'use client';

import Link from 'next/link';
import { Button } from '@/app/shared/ui/button';
import { useSidebar } from '@/app/shared/ui/sidebar';
import NavLink from './ui/nav-link';
import SearchPoke from '@/app/features/search-poke';
import { Suspense } from 'react';
import { MenuIcon, SidebarIcon } from 'lucide-react';

export default function MainHeader() {
  const { toggleSidebar } = useSidebar();
  return (
    <header className="sticky top-0 z-50 px-4 sm:px-6 w-full border-b bg-background">
      <div className="flex h-(--header-height) items-center justify-between backdrop-blur-md">
        <Button
          onClick={toggleSidebar}
          className="h-8 w-8"
          variant="ghost"
          size="icon"
        >
          <MenuIcon />
          {/* <SidebarIcon /> */}
        </Button>
        {/* <Link
          href="/"
          className="flex items-center text-xl font-extrabold text-foreground"
        >
          포케무무
        </Link> */}
        <Suspense>
          <SearchPoke />
        </Suspense>
        <div />
      </div>
    </header>
  );
}
