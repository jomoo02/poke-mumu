'use client';

import { useEffect, useRef } from 'react';
import type { Ref } from 'react';

import { cn } from '@/shared/lib/cn';

import {
  getIndexLabel,
  type AbilityIndexChip,
  type IndexKey,
} from './group-by-initial';

interface AbilityIndexBarProps {
  chips: AbilityIndexChip[];
  activeKey: IndexKey | null;
  onSelect: (key: IndexKey) => void;
  ref: Ref<HTMLDivElement>;
}

const CHIP_BASE =
  'flex h-10 min-w-10 flex-col items-center justify-center gap-0.5 rounded-xl px-2';

/**
 * 초성 색인 바. 헤더 바로 아래에 sticky로 고정된다.
 * 각 칩은 순수 앵커라 JS 없이도 섹션으로 점프한다.
 */
export default function AbilityIndexBar({
  chips,
  activeKey,
  onSelect,
  ref,
}: AbilityIndexBarProps) {
  const listRef = useRef<HTMLUListElement>(null);

  // 모바일 가로 스크롤에서 활성 칩이 화면 밖이면 가운데로 끌어온다.
  // scrollIntoView는 진행 중인 창 스크롤을 끊을 수 있어 목록의 scrollLeft만 조정한다.
  useEffect(() => {
    const list = listRef.current;

    if (!list || !activeKey) return;

    const chip = list.querySelector<HTMLElement>('[aria-current="location"]');

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
  }, [activeKey]);

  return (
    <div
      ref={ref}
      className={cn(
        // 헤더(h-13 = 52px, z-50) 바로 아래에 붙고, 본문보다는 위에 뜬다.
        'sticky top-13 z-10',
        // PageLayoutContainer의 좌우 패딩만큼 bleed해 뒤로 지나가는 본문이 옆으로 비치지 않게 한다.
        '-mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-[-4.375vw] md:px-[4.375vw]',
        'border-b bg-background/80 backdrop-blur-md',
      )}
    >
      <nav aria-label="초성 색인">
        {/*
          overflow-x-auto 컨테이너는 box-shadow 포커스 링(3px)을 자른다.
          py-2 / px-1.5 안쪽 여백으로 링이 그려질 공간을 확보하고, -mx-1.5로 칩 정렬 위치는 되돌린다.
        */}
        <ul
          ref={listRef}
          className="-mx-1.5 flex gap-1.5 overflow-x-auto px-1.5 py-2 scrollbar-none"
        >
          {chips.map((chip) => (
            <li key={chip.key} className="shrink-0">
              <IndexChip
                chip={chip}
                active={chip.key === activeKey}
                onSelect={onSelect}
              />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

interface IndexChipProps {
  chip: AbilityIndexChip;
  active: boolean;
  onSelect: (key: IndexKey) => void;
}

function IndexChip({ chip, active, onSelect }: IndexChipProps) {
  const label = getIndexLabel(chip.key);

  if (chip.count === 0) {
    return (
      <span
        aria-disabled="true"
        className={cn(CHIP_BASE, 'text-muted-foreground/40')}
      >
        <span aria-hidden="true" className="text-sm font-semibold leading-none">
          {chip.key}
        </span>
        <span className="sr-only">{`${label}, 결과 없음`}</span>
      </span>
    );
  }

  return (
    <a
      href={`#${chip.anchorId}`}
      aria-current={active ? 'location' : undefined}
      onClick={() => onSelect(chip.key)}
      className={cn(
        CHIP_BASE,
        'outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
        active
          ? 'bg-primary text-primary-foreground'
          : '[@media(hover:hover)]:hover:bg-accent',
      )}
    >
      <span aria-hidden="true" className="text-sm font-semibold leading-none">
        {chip.key}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          'text-[10px] leading-none tabular-nums',
          active ? 'text-primary-foreground/80' : 'text-muted-foreground',
        )}
      >
        {chip.count}
      </span>
      <span className="sr-only">{`${label} ${chip.count}개`}</span>
    </a>
  );
}
