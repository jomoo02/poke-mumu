import { Fragment } from 'react';

export default function PokeListSkeleton() {
  return (
    <div className="flex flex-col gap-6 mt-6">
      <div className="h-7 w-40 bg-muted/70 rounded-md" />

      <div className="grid gap-4 sm:gap-6 md:gap-12 sm:grid-cols-[repeat(auto-fill,minmax(128px,1fr))]">
        {Array.from({ length: 6 }, (_, i) => i + 1).map((i) => (
          <Fragment key={i}>
            <MobileItemSkeleton />
            <DesktopItemSkeleton />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function MobileItemSkeleton() {
  return (
    <div className="flex sm:hidden gap-x-3.5 items-center w-full">
      <div className="bg-muted/70 rounded-2xl p-1.75">
        <div className="size-12 2xs:size-12.5 rounded-xl bg-muted/70/70" />
      </div>
      <div className="flex-1 flex flex-col justify-center gap-1.5">
        <div className="w-14 h-4 rounded-md bg-muted/70" />
        <div className="w-24 h-5 rounded-md bg-muted/70" />
      </div>
      <div className="grid grid-cols-2 gap-1">
        <div className="size-7 rounded-md bg-muted/70" />
        <div className="size-7 rounded-md bg-muted/70" />
      </div>
    </div>
  );
}

function DesktopItemSkeleton() {
  return (
    <div className="hidden sm:flex sm:flex-col items-center w-full">
      <div className="w-full aspect-square rounded-4xl bg-muted/70" />
      <div className="mt-1.5 w-14 h-5 rounded-md bg-muted/70" />
      <div className="mt-1 w-16 h-5 rounded-md bg-muted/70" />
      <div className="mt-1.5 flex justify-center gap-1">
        <div className="size-7 rounded-md bg-muted/70" />
        <div className="size-7 rounded-md bg-muted/70" />
      </div>
    </div>
  );
}
