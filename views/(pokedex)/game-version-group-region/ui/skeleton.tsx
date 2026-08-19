import { PageLayoutSection } from '@/shared/ui/page-layout';
import { cn } from '@/shared/lib/cn';

import { DEFAULT_MODE, type PokeListMode } from '../model';

interface SkeletonProps {
  mode?: PokeListMode;
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

function ModeTabSkeleton() {
  return (
    <div className="flex justify-end">
      <div className="h-12 w-28 rounded-2xl bg-muted/50" />
    </div>
  );
}

function GridItemSkeleton() {
  return (
    <div className="flex flex-col items-center w-full">
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

function ListItemSkeleton() {
  return (
    <div className="flex gap-x-3.5 items-center w-full">
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

function PokeListSkeleton({
  mode,
  count,
}: {
  mode: PokeListMode;
  count: number;
}) {
  const items = Array.from({ length: count }, (_, i) => i);

  if (mode === 'grid') {
    return (
      <div
        className={cn(
          'grid gap-6',
          'md:gap-12 grid-cols-[repeat(auto-fill,minmax(128px,1fr))]',
        )}
      >
        {items.map((i) => (
          <GridItemSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 max-w-lg mx-auto w-full">
      {items.map((i) => (
        <ListItemSkeleton key={i} />
      ))}
    </div>
  );
}

export default function Skeleton({
  mode = DEFAULT_MODE,
  count = DEFAULT_COUNT,
}: SkeletonProps) {
  return (
    <PageLayoutSection className="mt-0 animate-pulse">
      <HeaderSkeleton />
      <ModeTabSkeleton />
      <PokeListSkeleton mode={mode} count={count} />
    </PageLayoutSection>
  );
}
