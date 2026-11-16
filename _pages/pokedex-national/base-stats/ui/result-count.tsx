import { cn } from '@/_shared/lib/cn';

interface ResultCountProps {
  count: number;
  className?: string;
}

// 결과 줄의 'N마리' (검색어 + 필터를 건 결과). 바뀌면 스크린리더가 읽는다
export default function ResultCount({ count, className }: ResultCountProps) {
  return (
    <p aria-live="polite" className={cn('shrink-0 text-sm', className)}>
      {`${count.toLocaleString('ko-KR')}마리`}
    </p>
  );
}
