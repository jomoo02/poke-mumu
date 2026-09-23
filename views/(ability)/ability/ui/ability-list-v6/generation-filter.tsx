'use client';

import { useEffect, useRef } from 'react';

import { cn } from '@/shared/lib/cn';

import { getGenerationLabel, type GenerationChip } from './group-by-generation';

interface GenerationFilterProps {
  chips: GenerationChip[];
  selectedGen: number | null;
  onSelect: (gen: number | null) => void;
}

// relative: 안쪽 sr-only(absolute)가 칩 행의 overflow-x-auto를 벗어나 문서 가로 넘침을 만들지 않게 가둔다.
const CHIP_BASE =
  'relative inline-flex h-10 items-center gap-x-2 rounded-full border px-4 text-sm font-medium transition-colors';

/**
 * 세대 선택 칩. 단일 선택이지만 aria-pressed 토글 버튼 그룹으로 표현한다.
 * (radiogroup은 화살표 키 로빙 포커스까지 요구해 칩 몇 개에는 과하다)
 *
 * shared/ui/toggle은 hover가 `[@media(hover:hover)]`로 감싸져 있지 않아 쓰지 않는다.
 */
export default function GenerationFilter({
  chips,
  selectedGen,
  onSelect,
}: GenerationFilterProps) {
  const listRef = useRef<HTMLUListElement>(null);

  // 모바일 가로 스크롤에서 선택된 칩이 화면 밖이면(예: `?gen=9`로 진입) 가운데로 끌어온다.
  // scrollIntoView는 창 스크롤까지 움직일 수 있어 목록의 scrollLeft만 조정한다.
  useEffect(() => {
    const list = listRef.current;

    if (!list) return;

    const chip = list.querySelector<HTMLElement>('[aria-pressed="true"]');

    if (!chip) return;

    const listRect = list.getBoundingClientRect();
    const chipRect = chip.getBoundingClientRect();

    if (chipRect.left >= listRect.left && chipRect.right <= listRect.right) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    list.scrollTo({
      left:
        list.scrollLeft +
        (chipRect.left - listRect.left) -
        (listRect.width - chipRect.width) / 2,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, [selectedGen]);

  return (
    <div role="group" aria-label="세대 필터">
      {/*
        모바일: overflow-x-auto 컨테이너가 box-shadow 포커스 링(3px)을 자른다.
        p-1.5 안쪽 여백으로 링이 그려질 공간을 확보하고, -m-1.5로 칩 정렬 위치는 되돌린다.
        md 이상: 칩이 한 줄에 다 들어가지 않을 수 있어 스크롤 대신 줄바꿈한다.
      */}
      <ul
        ref={listRef}
        className="-m-1.5 flex gap-2 overflow-x-auto p-1.5 scrollbar-none md:flex-wrap md:overflow-visible">
        {chips.map((chip) => (
          <li key={chip.gen ?? 'all'} className="shrink-0">
            <FilterChip
              chip={chip}
              active={chip.gen === selectedGen}
              onSelect={onSelect}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

interface FilterChipProps {
  chip: GenerationChip;
  active: boolean;
  onSelect: (gen: number | null) => void;
}

function FilterChip({ chip, active, onSelect }: FilterChipProps) {
  const label = getGenerationLabel(chip.gen);

  // 선택된 세대가 검색으로 0개가 되어도 칩은 눌린 상태로 남겨 현재 필터를 알 수 있게 한다.
  const disabled = chip.count === 0 && !active;

  return (
    <button
      type="button"
      aria-pressed={active}
      disabled={disabled}
      onClick={() => onSelect(chip.gen)}
      className={cn(
        CHIP_BASE,
        'outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'bg-background [@media(hover:hover)]:hover:bg-accent',
        // 비활성 칩은 hover 배경이 뜨지 않게 포인터 이벤트를 막는다.
        'disabled:pointer-events-none disabled:border-dashed disabled:text-muted-foreground/40',
      )}
    >
      <span aria-hidden="true">{label}</span>
      <span
        aria-hidden="true"
        className={cn(
          'text-xs tabular-nums',
          active ? 'text-primary-foreground/80' : 'text-muted-foreground',
          disabled && 'text-inherit',
        )}
      >
        {chip.count}
      </span>
      <span className="sr-only">
        {chip.count === 0 ? `${label}, 결과 없음` : `${label} ${chip.count}개`}
      </span>
    </button>
  );
}
