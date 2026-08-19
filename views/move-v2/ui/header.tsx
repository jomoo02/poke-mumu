'use client';
import { SidebarTrigger } from '@/shared/ui/sidebar';
import { Suspense } from 'react';
import MoveSearch from './move-search';
// import { Suspense } from 'react';
import ThemeToggle from '@/app/widgets/main-header/ui/theme-toggle';

export default function Header() {
  return (
    <div className="sticky top-0 z-20">
      <div className="flex gap-2 h-16 items-center justify-between p-2 bg-background">
        <div className="flex gap-2 items-center">
          <SidebarTrigger className="size-9 rounded-lg" />
          <h1 className="text-sm font-semibold truncate hidden sm:block">
            기술
          </h1>
        </div>

        <Suspense>
          <MoveSearch />
        </Suspense>
        <Suspense>
          <ThemeToggle />
        </Suspense>
      </div>
    </div>
  );
}
