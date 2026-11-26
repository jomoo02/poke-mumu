'use client';

import { CheckIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';

import { SORT_OPTIONS, getOrderOptions } from '../../model/sort';
import type { SortProps } from './sort-props';

/**
 * 정렬 선택지 (모든 폭 1열):
 *   이름
 *   위력                    ✓     ← 고른 줄: 이름 아래 작은 글자로 지금 방향
 *   높은 순                           ← 방향은 글자로만 (높은 순·낮은 순 · 이름순·이름 반대순)
 *   명중
 *   PP
 * 다른 줄을 누르면 그 기준의 첫 방향(수치 높은 순 · 이름순)으로, 고른 줄을 다시 누르면 반대 방향 (표 머리글과 같은 규칙).
 * 방향은 이름 아래(왼쪽)에 둔다: 모바일에서 줄 오른쪽을 엄지로 누르면 오른쪽 글자가 가려 바뀐 방향이 안 보여서.
 * 고르는 즉시 반영되고 닫지 않는다. 전체 패널(드로어·다이얼로그)과 정렬 패널(드로어·팝오버)이 함께 쓴다
 */
export default function SortOptions({
  sortState,
  onSelectKey,
  onSelectOrder,
}: SortProps) {
  const orderOptions = getOrderOptions(sortState.sort);
  const current = orderOptions.find(({ order }) => order === sortState.order);
  const next = orderOptions.find(({ order }) => order !== sortState.order);

  return (
    <ul className="-mx-3 flex flex-col">
      {SORT_OPTIONS.map(({ key, label }) => {
        const isSelected = key === sortState.sort;

        return (
          <li key={key}>
            <button
              type="button"
              aria-pressed={isSelected}
              aria-label={
                isSelected && current && next
                  ? `${label}, ${current.label}. 다시 누르면 ${next.label}`
                  : label
              }
              onClick={() => {
                if (!isSelected) {
                  onSelectKey(key);
                } else if (next) {
                  onSelectOrder(next.order);
                }
              }}
              className={cn(
                'flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-3 text-left text-md outline-none',
                'focus-visible:ring-3 focus-visible:ring-ring/30 [@media(hover:hover)]:hover:bg-accent active:bg-accent',
                isSelected ? 'h-14 font-semibold' : 'h-11',
              )}
            >
              <span aria-hidden className="flex min-w-0 flex-col">
                <span className="truncate">{label}</span>
                {isSelected && current && (
                  <span className="truncate text-sm font-normal text-foreground/70">
                    {current.label}
                  </span>
                )}
              </span>
              {isSelected && (
                <CheckIcon aria-hidden className="size-4.75 shrink-0" />
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
