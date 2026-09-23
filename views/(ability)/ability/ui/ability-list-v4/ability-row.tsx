'use client';

import { ChevronRightIcon } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import type { Ability } from '@/entities/ability/model';

interface AbilityRowProps {
  ability: Ability;
  displayNumber: number;
  selected: boolean;
  onSelect: () => void;
  id: string;
  ref: React.Ref<HTMLButtonElement>;
}

/**
 * 목록의 한 행. 링크가 아니라 '선택' 버튼이다.
 * 선택하면 오른쪽(모바일에서는 아래) 미리보기가 바뀌고, 상세 이동은 미리보기의 링크가 맡는다.
 */
export default function AbilityRow({
  ability,
  displayNumber,
  selected,
  onSelect,
  id,
  ref,
}: AbilityRowProps) {
  return (
    <button
      ref={ref}
      id={id}
      type="button"
      role="option"
      aria-selected={selected}
      // 로빙 탭인덱스: 목록 전체가 탭 정지점 하나로 동작한다.
      tabIndex={selected ? 0 : -1}
      onClick={onSelect}
      onFocus={onSelect}
      className={cn(
        // -mx bleed: 행 전체(좌우 여백 포함)가 호버·선택 배경으로 덮인다.
        // 포커스 링도 이 여백 안에서 그려져 잘리지 않는다.
        '-mx-3 px-3 rounded-2xl w-full text-left',
        'flex items-center gap-x-3 py-2.5',
        'outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
        // 모바일 sticky-hover 방지
        '[@media(hover:hover)]:hover:bg-accent',
        selected && 'bg-accent',
      )}
    >
      <span className="w-9 shrink-0 text-xs tabular-nums text-muted-foreground">
        {String(displayNumber).padStart(3, '0')}
      </span>
      <span className="shrink-0 font-medium">{ability.nameKo}</span>
      <span className="truncate text-sm text-foreground/60">
        {ability.nameJa
          ? `${ability.nameEn} / ${ability.nameJa}`
          : ability.nameEn}
      </span>
      <span className="ml-auto flex shrink-0 items-center gap-x-1">
        <span className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground">
          {ability.gen}세대
        </span>
        <ChevronRightIcon
          className={cn(
            'size-4 text-muted-foreground',
            selected ? 'opacity-100' : 'opacity-0',
          )}
        />
      </span>
    </button>
  );
}
