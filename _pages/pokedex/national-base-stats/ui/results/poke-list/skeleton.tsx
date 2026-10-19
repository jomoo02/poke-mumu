import { cn } from '@/_shared/lib/cn';
import { Skeleton, SkeletonLine } from '@/_shared/ui/skeleton';

interface PokeListSkeletonProps {
  count: number;
}

// PokeListItem과 같은 구조·글꼴 크기·간격으로 자리를 잡는다
export default function PokeListSkeleton({ count }: PokeListSkeletonProps) {
  return (
    <ul aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <li
          key={index}
          className={cn(
            'relative -mx-3 flex flex-col gap-4 px-3 py-4',
            '@xl:flex-row @xl:items-center @xl:gap-8',
            'before:absolute before:inset-x-3 before:top-0 before:h-px before:bg-border first:before:hidden',
          )}
        >
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <Skeleton className="size-12 shrink-0 rounded-full" />
            <div className="flex flex-1 flex-col gap-0.5">
              <div className="text-sm">
                <SkeletonLine className="w-16" />
              </div>
              <SkeletonLine className="w-24" />
            </div>
            <div className="grid shrink-0 grid-cols-2 gap-1">
              <Skeleton className="size-7 rounded-sm" />
              <Skeleton className="size-7 rounded-sm" />
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 @xl:w-96 @xl:shrink-0">
            {Array.from({ length: 7 }, (_, statIndex) => (
              <div
                key={statIndex}
                className="flex flex-col items-center gap-0.5"
              >
                <div className="text-xs">
                  <SkeletonLine className="w-6" />
                </div>
                <div className="text-md">
                  <SkeletonLine className="w-7" />
                </div>
              </div>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
