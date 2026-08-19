import SearchPoke from '@/app/features/search-poke';
import ThemeToggle from './theme-toggle';
import { SidebarTrigger } from '@/shared/ui/sidebar';
import { Suspense } from 'react';

export default function AppHeader({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/70">
      <div className="flex h-14 gap-1 sm:gap-3 items-center justify-between w-full px-4">
        <SidebarTrigger className="size-9.5 rounded-lg" />
        {children}
        <div className="flex items-center gap-x-1 sm:gap-x-3">
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
