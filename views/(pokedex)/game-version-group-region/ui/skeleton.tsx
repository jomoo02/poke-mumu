import { Fragment } from 'react';

import { PageLayoutSection } from '@/shared/ui/page-layout';
import { cn } from '@/shared/lib/cn';

interface SkeletonProps {
  count?: number;
}

const DEFAULT_COUNT = 50;

function HeaderSkeleton() {
  return (
    <div className="flex flex-col gap-1.5">
      {/* title (text-xl) */}
      <div className="h-7 w-40 rounded-md bg-muted/50" />
      {/* description */}
      <div className="h-6 w-72 max-w-[80%] rounded-md bg-muted/50" />
    </div>
  );
}

function MobileItemSkeleton() {
  return (
    <div className="flex sm:hidden gap-x-3.5 items-center w-full">
      <div className="bg-muted/50 rounded-2xl p-1.75">
        <div className="size-12 2xs:size-12.5 rounded-xl bg-muted/70" />
      </div>
      <div className="flex-1 flex flex-col justify-center gap-1.5">
        <div className="w-14 h-4 rounded-md bg-muted/50" />
        <div className="w-24 h-5 rounded-md bg-muted/50" />
      </div>
      <div className="grid grid-cols-2 gap-1">
        <div className="size-7 rounded-md bg-muted/50" />
        <div className="size-7 rounded-md bg-muted/50" />
      </div>
    </div>
  );
}

function DesktopItemSkeleton() {
  return (
    <div className="hidden sm:flex sm:flex-col items-center w-full">
      <div className="w-full aspect-square rounded-4xl bg-muted/50" />
      <div className="mt-1.5 w-14 h-5 rounded-md bg-muted/50" />
      <div className="mt-1 w-16 h-5 rounded-md bg-muted/50" />
      <div className="mt-1.5 flex justify-center gap-1">
        <div className="size-7 rounded-md bg-muted/50" />
        <div className="size-7 rounded-md bg-muted/50" />
      </div>
    </div>
  );
}

export default function Skeleton({ count = DEFAULT_COUNT }: SkeletonProps) {
  const items = Array.from({ length: count }, (_, i) => i);

  return (
    <PageLayoutSection className="mt-0 animate-pulse">
      <HeaderSkeleton />
      <div
        className={cn(
          'grid gap-4',
          'sm:gap-6 md:gap-12 sm:grid-cols-[repeat(auto-fill,minmax(128px,1fr))]',
        )}
      >
        {items.map((i) => (
          <Fragment key={i}>
            <MobileItemSkeleton />
            <DesktopItemSkeleton />
          </Fragment>
        ))}
      </div>
    </PageLayoutSection>
  );
}
