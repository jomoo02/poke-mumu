import { cn } from '@/_shared/lib/cn';

interface ResultCountProps {
  count: number;
  // '특성'과 'N개'를 두 줄로 쌓는다 (lg 이상 툴바 끝).
  // 쌓지 않으면 'N개'만 보인다 (모바일 결과 줄)
  stacked?: boolean;
  className?: string;
}

export default function ResultCount({
  count,
  stacked = false,
  className,
}: ResultCountProps) {
  return (
    <p
      aria-live="polite"
      className={cn(
        'shrink-0 text-sm lg:text-xs text-foreground/70',
        stacked && 'flex flex-col items-end',
        className,
      )}
    >
      {stacked && <span>특성</span>}
      <span>{`${count.toLocaleString('ko-KR')}개`}</span>
    </p>
  );
}
