'use client';

import { CheckIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';

import type { SortMenuOption, SortMenuSelected } from './sort-menu-option';

// 시트(터치 위주) / 드롭다운(마우스)에 따라 호버 배경만 다르다
type SortMenuPlace = 'sheet' | 'popover';

interface SortMenuListProps<K extends string> {
  options: readonly SortMenuOption<K>[];
  selected: SortMenuSelected<K>;
  onSelect: (key: K) => void;
  place: SortMenuPlace;
  className?: string;
}

// 한 줄에 기준 하나: [기준 이름 ········ ✓]
//                   [방향 글자]          ← 선택된 줄에만
// 무엇을 누르면 어떻게 되는지(같은 기준이면 뒤집기 등)는 onSelect를 넘기는 쪽이 정한다.
// 체크 자리는 늘 비워 둬서 선택이 바뀌어도 이름 위치가 흔들리지 않는다
export function SortMenuList<K extends string>({
  options,
  selected,
  onSelect,
  place,
  className,
}: SortMenuListProps<K>) {
  return (
    <ul
      aria-label="정렬 기준"
      className={cn('flex flex-col gap-y-1', className)}
    >
      {options.map((option) => {
        const active = option.key === selected.key;

        // 정렬 글자 뒤에 조사를 붙이지 않는다 ('…순으로'처럼 받침에 따라 틀리지 않게)
        // 예: '이름순, 선택됨. 다시 누르면 이름 역순'
        const label = active
          ? `${selected.sortLabel}, 선택됨. 다시 누르면 ${selected.nextSortLabel}`
          : `${option.label} 기준으로 정렬`;

        return (
          <li key={option.key}>
            <button
              type="button"
              aria-pressed={active}
              aria-label={label}
              onClick={() => onSelect(option.key)}
              className={cn(
                'relative isolate grid min-h-10.5 w-full grid-cols-[1fr_1.25rem] items-center gap-x-2.5 text-left outline-none',
                // 전체 줄 호버·포커스 배경은 양옆으로 bleed
                'after:absolute after:inset-y-0 after:-inset-x-2.5 after:-z-10 after:rounded-lg',
                'focus-visible:after:ring-3 focus-visible:after:ring-ring/50',
                place === 'sheet'
                  ? '[@media(hover:hover)]:hover:after:bg-muted'
                  : '[@media(hover:hover)]:hover:after:bg-muted/70',
                // 선택된 줄은 방향 글자가 붙고 위아래 여백도 조금 더 준다
                active ? 'py-2.5' : 'py-1.5',
              )}
            >
              <span className="flex flex-col gap-1">
                <span
                  className={cn(
                    'text-md leading-6',
                    active
                      ? 'font-semibold text-primary-text'
                      : 'font-medium text-foreground/80',
                  )}
                >
                  {option.label}
                </span>
                {active && (
                  <span aria-hidden className="text-sm text-foreground/70">
                    {selected.orderText}
                  </span>
                )}
              </span>
              <span
                aria-hidden
                className="flex items-center justify-center self-center text-primary-text"
              >
                {active && <CheckIcon className="size-4.5" strokeWidth={2.5} />}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
