'use client';

import { cn } from '@/_shared/lib/cn';

import type { SortPanelProps } from './sort-panel';
import SortPopover from './sort-popover';
import SortSheet from './sort-sheet';

interface SortControlProps extends SortPanelProps {
  className?: string;
}

/**
 * [특수공격 높은 순 ⌄] 버튼 → 정렬 기준·순서. 고르면 반영하고 닫는다 (쇼핑앱 정렬 시트와 같은 흐름).
 * md 미만은 바텀시트, 이상은 팝오버 (필터·이름 언어 선택과 같은 규칙).
 * 둘 다 그려 두고 CSS로 하나만 보인다 (JS matchMedia는 첫 렌더가 한쪽으로 고정돼 트리거가 바뀐다)
 */
export default function SortControl({ className, ...props }: SortControlProps) {
  return (
    <div className={cn('flex shrink-0', className)}>
      <SortSheet {...props} />
      <SortPopover {...props} />
    </div>
  );
}
