'use client';

import { cn } from '@/_shared/lib/cn';

import {
  FilterCheckboxPopover,
  type FilterCheckboxPopoverLayout,
} from './filter-checkbox-popover';
import { FilterCheckboxSheet } from './filter-checkbox-sheet';
import type { FilterCheckboxGroup } from './filter-group';

interface FilterCheckboxControlProps {
  group: FilterCheckboxGroup;
  // 시트의 닫기 버튼 문구 (예: '120마리 보기')
  resultLabel: string;
  // 팝오버 목록 모양 (filter-checkbox-popover.tsx)
  popoverLayout?: FilterCheckboxPopoverLayout;
  className?: string;
}

/**
 * 체크박스 필터 하나. md 미만은 바텀시트, 이상은 팝오버 (정렬·이름 언어와 같은 규칙).
 * 둘 다 그려 두고 CSS로 하나만 보인다 (JS matchMedia는 첫 렌더가 한쪽으로 고정돼 트리거가 바뀐다)
 */
export function FilterCheckboxControl({
  group,
  resultLabel,
  popoverLayout,
  className,
}: FilterCheckboxControlProps) {
  return (
    <>
      <FilterCheckboxSheet
        group={group}
        resultLabel={resultLabel}
        className={cn('md:hidden', className)}
      />
      <FilterCheckboxPopover
        group={group}
        layout={popoverLayout}
        className={cn('hidden md:inline-flex', className)}
      />
    </>
  );
}
