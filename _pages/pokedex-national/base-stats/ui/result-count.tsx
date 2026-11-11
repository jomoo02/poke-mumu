import { cn } from '@/_shared/lib/cn';

interface ResultCountProps {
  count: number;
  // '포켓몬'과 'N마리'를 두 줄로 쌓는다 (툴바 끝: 옆 버튼 높이 40px에 맞춘다).
  // 쌓지 않으면 'N마리'만 보인다 (모바일 결과 줄)
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
      {stacked && <span>포켓몬</span>}
      <span>{`${count.toLocaleString('ko-KR')}마리`}</span>
    </p>
  );
}
