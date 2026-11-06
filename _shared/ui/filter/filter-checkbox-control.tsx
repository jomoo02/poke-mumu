'use client';

import { cn } from '@/_shared/lib/cn';

import { FilterCheckboxMenu } from './filter-checkbox-menu';
import { FilterCheckboxSheet } from './filter-checkbox-sheet';
import type { FilterCheckboxGroup } from './filter-group';

interface FilterCheckboxControlProps {
  group: FilterCheckboxGroup;
  // 시트의 닫기 버튼 문구 (예: '120마리 보기')
  resultLabel: string;
  // false면 시트에 그룹별 초기화를 두지 않는다 (결과 버튼만).
  // 필터가 몇 개 없어 페이지의 전체 초기화 하나로 충분할 때. 메뉴에는 늘 목록만 있다
  showGroupReset?: boolean;
  className?: string;
}

/**
 * 체크박스 필터 하나. md 미만은 바텀시트, 이상은 드롭다운 메뉴 (정렬과 같은 규칙).
 * 둘 다 그려 두고 CSS로 하나만 보인다 (JS matchMedia는 첫 렌더가 한쪽으로 고정돼 트리거가 바뀐다)
 */
export function FilterCheckboxControl({
  group,
  resultLabel,
  showGroupReset = true,
  className,
}: FilterCheckboxControlProps) {
  return (
    <>
      <FilterCheckboxSheet
        group={group}
        resultLabel={resultLabel}
        showReset={showGroupReset}
        className={cn('md:hidden', className)}
      />
      <FilterCheckboxMenu
        group={group}
        className={cn('hidden md:inline-flex', className)}
      />
    </>
  );
}
