import { Fragment } from 'react';

export default function Loading() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      <div>
        <div className="mt-8 w-40 h-8 rounded-md bg-muted/50" />
        <div className="mt-3 w-60 h-6 rounded-md bg-muted/50" />
      </div>

      <div className="grid gap-4 sm:gap-6 md:gap-12 sm:grid-cols-[repeat(auto-fill,minmax(128px,1fr))]">
        {Array.from({ length: 50 }).map((_, idx) => (
          <Fragment key={idx}>
            <div className="sm:hidden w-full h-16 rounded-xl bg-muted/70" />
            <div className="hidden sm:flex sm:flex-col w-full">
              <div className="w-full aspect-square rounded-4xl bg-muted/50" />
              <div className="mt-1.5 mx-auto w-14 h-5.25 rounded-md bg-muted/50" />
              <div className="mt-1 mx-auto w-16 h-5 rounded-md bg-muted/50" />
              <div className="mt-1.5 flex justify-center gap-1">
                <div className="size-7 rounded-md bg-muted/50" />
                <div className="size-7 rounded-md bg-muted/50" />
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
