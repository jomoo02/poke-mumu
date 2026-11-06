'use client';

import { cn } from '@/_shared/lib/cn';

import {
  SORT_OPTIONS,
  getOrderLabel,
  getToggledSort,
  type PokeSort,
  type SortKey,
} from '../../model/sort';
import SortTriangles from '../sort-triangles';

type SortOptionListPlace = 'sheet' | 'popover';

// 줄 높이. 시트는 터치 목표 44px, 팝오버는 마우스·태블릿이라 조금 촘촘하게 (필터 목록과 같다)
const OPTION_ROW_CLASS: Record<SortOptionListPlace, string> = {
  sheet: 'h-11',
  popover: 'h-10.5',
};

// 고른 줄: 배경·굵은 글씨
const SELECTED_ROW_CLASS =
  'font-medium after:bg-muted [@media(hover:hover)]:hover:after:bg-muted';

interface SortOptionListProps {
  sortState: PokeSort;
  onToggle: (key: SortKey) => void;
  close: () => void;
  place: SortOptionListPlace;
  className?: string;
}

// 접근 이름. 고른 줄은 지금 방향과 다시 누르면 바뀔 방향을, 나머지는 누르면 될 정렬을 읽는다
const getRowLabel = (sortState: PokeSort, key: SortKey, label: string) => {
  const next = getOrderLabel(getToggledSort(sortState, key));

  return sortState.sort === key
    ? `${label}, ${getOrderLabel(sortState)}. 다시 누르면 ${next}`
    : `${label}, ${next}`;
};

/**
 * 시트·팝오버 본문: 기준 목록 한 줄씩 (SORT_OPTIONS 순서). 표 머리글과 같은 규칙 (결정 2026-11-04)
 * - 다른 기준을 누르면 그 기준의 첫 방향(번호·이름은 오름, 능력치는 높은 순)으로
 * - 고른 기준을 다시 누르면 방향을 뒤집는다
 * - 누를 때마다 반영하고 닫는다 (닫힌 뒤 트리거에 '총합 낮은 순'처럼 결과가 보인다)
 * 고른 줄에만 방향 이름 + 삼각형(지금 방향만 칠함)을 보인다. 나머지 줄은 이름만
 */
export default function SortOptionList({
  sortState,
  onToggle,
  close,
  place,
  className,
}: SortOptionListProps) {
  return (
    <ul className={cn('flex flex-col gap-y-1', className)}>
      {SORT_OPTIONS.map(({ key, label }) => {
        const isCurrent = sortState.sort === key;

        return (
          <li key={key}>
            <button
              type="button"
              aria-label={getRowLabel(sortState, key, label)}
              onClick={() => {
                onToggle(key);
                close();
              }}
              className={cn(
                'relative isolate flex w-full items-center gap-2.5 text-md cursor-pointer outline-none',
                // 줄 배경은 글자보다 양옆으로 넓게 (필터 목록 줄과 같다)
                'after:absolute after:inset-y-0 after:-inset-x-3 after:-z-10 after:rounded-lg',
                '[@media(hover:hover)]:hover:after:bg-muted/70',
                'focus-visible:after:ring-[3px] focus-visible:after:ring-ring/50',
                OPTION_ROW_CLASS[place],
                // isCurrent && SELECTED_ROW_CLASS,
              )}
            >
              <span aria-hidden className="min-w-0 flex-1 truncate text-left">
                {label}
              </span>
              {isCurrent && (
                <span
                  aria-hidden
                  className="flex shrink-0 items-center gap-2 text-sm pr-1"
                >
                  {getOrderLabel(sortState)}
                  <SortTriangles order={sortState.order} />
                </span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
