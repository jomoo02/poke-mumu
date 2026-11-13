import { cn } from '@/_shared/lib/cn';

interface ResultCountProps {
  count: number;
  className?: string;
}

// 'N개': lg 미만은 결과 줄(개수 · 정렬), lg 이상은 검색 줄 끝
export default function ResultCount({ count, className }: ResultCountProps) {
  return (
    <p
      aria-live="polite"
      className={cn('shrink-0 text-sm text-foreground/70', className)}
    >
      {`${count.toLocaleString('ko-KR')}개`}
    </p>
  );
}
