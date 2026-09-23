'use client';

import type { MouseEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronsUpDownIcon,
} from 'lucide-react';

import type { Ability } from '@/entities/ability/model';
import { cn } from '@/shared/lib/cn';

import {
  formatSubName,
  getAbilityHref,
  type AbilitySort,
  type SortKey,
} from './lib';

// sticky 헤더가 페이지 스크롤에 붙어야 하므로 overflow 래퍼가 있는 shared/ui/table 대신 raw <table>을 쓴다.
const HEADER_CELL =
  'sticky top-13 z-10 h-10 border-b bg-background/85 px-3 text-xs font-medium whitespace-nowrap text-muted-foreground backdrop-blur-md';

const BODY_CELL = 'border-b px-3 py-3 align-middle group-last/row:border-b-0';

const SHRINK = 'w-px whitespace-nowrap';

const INTERACTIVE_SELECTOR = 'a, button, input, [role="button"]';

interface AbilityTableProps {
  abilities: Ability[];
  sort: AbilitySort;
  onToggleSort: (key: SortKey) => void;
}

export default function AbilityTable({
  abilities,
  sort,
  onToggleSort,
}: AbilityTableProps) {
  const router = useRouter();

  // 행 전체 클릭 → 상세. 키보드 접근은 이름 Link가 담당한다.
  const handleRowClick = (
    event: MouseEvent<HTMLTableRowElement>,
    href: string,
  ) => {
    if (
      event.target instanceof Element &&
      event.target.closest(INTERACTIVE_SELECTOR)
    ) {
      return;
    }
    // 드래그로 텍스트를 선택한 경우는 이동하지 않는다
    if (window.getSelection()?.toString()) return;

    router.push(href);
  };

  return (
    // -mx-3 + 폭 보정: 셀 px-3만큼 바깥으로 빼서 첫 열 텍스트를 제목과 맞추고, 행 호버 배경은 bleed
    <table
      aria-label="특성 목록"
      className="-mx-3 hidden w-[calc(100%+1.5rem)] border-separate border-spacing-0 text-sm @2xl:table"
    >
      <thead>
        <tr>
          <SortableHeader
            label="이름"
            sortKey="name"
            sort={sort}
            onToggleSort={onToggleSort}
          />
          <th scope="col" className={cn(HEADER_CELL, 'text-left')}>
            설명
          </th>
          <SortableHeader
            label="세대"
            sortKey="gen"
            align="right"
            sort={sort}
            onToggleSort={onToggleSort}
          />
        </tr>
      </thead>
      <tbody>
        {abilities.map((ability) => {
          const href = getAbilityHref(ability.identifier);

          return (
            <tr
              key={ability.identifier}
              onClick={(event) => handleRowClick(event, href)}
              className="group/row cursor-pointer [@media(hover:hover)]:hover:bg-muted/50"
            >
              <td className={cn(BODY_CELL, SHRINK)}>
                <div className="flex max-w-64 flex-col gap-0.5">
                  <Link
                    href={href}
                    className={cn(
                      'truncate font-semibold outline-none',
                      'focus-visible:rounded-sm focus-visible:ring-[3px] focus-visible:ring-ring/50',
                      '[@media(hover:hover)]:hover:underline',
                    )}
                  >
                    {ability.nameKo}
                  </Link>
                  <span className="truncate text-xs text-muted-foreground">
                    {formatSubName(ability)}
                  </span>
                </div>
              </td>
              <td className={cn(BODY_CELL, 'min-w-64')}>
                <p className="line-clamp-2 break-keep text-foreground/70">
                  {ability.flavorText}
                </p>
              </td>
              <td className={cn(BODY_CELL, SHRINK, 'text-right')}>
                <span className="text-foreground/70 tabular-nums">
                  {ability.gen}세대
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

interface SortableHeaderProps {
  label: string;
  sortKey: SortKey;
  align?: 'left' | 'right';
  sort: AbilitySort;
  onToggleSort: (key: SortKey) => void;
}

function SortableHeader({
  label,
  sortKey,
  align = 'left',
  sort,
  onToggleSort,
}: SortableHeaderProps) {
  const isActive = sort.key === sortKey;

  const ariaSort = !isActive
    ? 'none'
    : sort.order === 'asc'
      ? 'ascending'
      : 'descending';

  const Icon = !isActive
    ? ChevronsUpDownIcon
    : sort.order === 'asc'
      ? ChevronUpIcon
      : ChevronDownIcon;

  return (
    <th
      scope="col"
      aria-sort={ariaSort}
      className={cn(
        HEADER_CELL,
        SHRINK,
        align === 'right' ? 'text-right' : 'text-left',
      )}
    >
      <button
        type="button"
        onClick={() => onToggleSort(sortKey)}
        className={cn(
          '-mx-1.5 inline-flex items-center gap-1 rounded-md px-1.5 py-1 outline-none',
          'focus-visible:ring-[3px] focus-visible:ring-ring/50',
          '[@media(hover:hover)]:hover:bg-muted',
          align === 'right' && 'flex-row-reverse',
          isActive && 'text-foreground',
        )}
      >
        {label}
        <Icon
          aria-hidden="true"
          className={cn('size-3.5', !isActive && 'opacity-30')}
        />
      </button>
    </th>
  );
}
