import type { ReactNode } from 'react';

import { cn } from '@/_shared/lib/cn';

interface ResultsHeaderProps {
  totalCount: number;
  // 오른쪽 자리 (정렬 버튼). 결과 줄은 무엇이 오는지 모른다
  children?: ReactNode;
  className?: string;
}

// 목록 머리 줄: [개수 ↔ children]
export default function ResultsHeader({
  totalCount,
  children,
  className,
}: ResultsHeaderProps) {
  return (
    // min-h-8: 오른쪽 자리가 비거나 숨어도(넓은 본문의 정렬 버튼) 줄 높이가 같게
    <div
      className={cn(
        'flex min-h-8 items-center justify-between gap-3',
        className,
      )}
    >
      <p
        aria-live="polite"
        className="shrink-0 text-sm font-medium text-foreground/70"
      >
        {totalCount.toLocaleString('ko-KR')} Pokémon
      </p>
      {children}
    </div>
  );
}
