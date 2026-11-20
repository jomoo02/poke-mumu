import { cn } from '@/_shared/lib/cn';

interface ResultCountProps {
  // 검색어 + 필터를 건 결과 수
  count: number;
  // 이 페이지가 보여 주는 범위 (1부터, 끝 포함)
  start: number;
  end: number;
  className?: string;
}

// 'N개 중 a–b': 목록 아래 페이지 이동 위. 바뀌면 스크린리더가 읽는다 (위치와 관계없이)
export default function ResultCount({
  count,
  start,
  end,
  className,
}: ResultCountProps) {
  const format = (value: number) => value.toLocaleString('ko-KR');

  return (
    <p
      aria-live="polite"
      className={cn(
        'shrink-0 text-sm text-foreground/70 tabular-nums',
        className,
      )}
    >
      {`${format(count)}개 중 ${format(start)}–${format(end)}`}
    </p>
  );
}
