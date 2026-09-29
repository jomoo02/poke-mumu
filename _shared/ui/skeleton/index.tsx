import { cn } from '@/_shared/lib/cn';

// 블록 자리 표시. 크기는 호출부가 정한다
function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('animate-pulse rounded-sm bg-muted', className)}
      {...props}
    />
  );
}

// 텍스트 한 줄 자리 표시. 부모의 font-size/line-height를 따라 한 줄 높이(1lh)를 그대로 차지해
// 실제 텍스트로 바뀌어도 높이가 변하지 않는다. 폭은 className으로 정한다
function SkeletonLine({ className }: { className?: string }) {
  return (
    <div data-slot="skeleton-line" className="flex h-lh items-center">
      <Skeleton className={cn('h-[0.85em]', className)} />
    </div>
  );
}

export { Skeleton, SkeletonLine };
