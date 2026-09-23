'use client';

import Link from 'next/link';

import { cn } from '@/shared/lib/cn';
import type { Ability } from '@/entities/ability/model';

import {
  getGenerationLabel,
  type AbilityGenerationGroup,
} from './group-by-generation';

interface GenerationTimelineSectionProps {
  group: AbilityGenerationGroup;
  /** 레일을 노드 중심에서 시작한다 */
  isFirst: boolean;
  /** 다음 섹션과의 간격(pb)을 두지 않아 레일이 마지막 행에서 끝난다 */
  isLast: boolean;
}

const BADGE =
  'shrink-0 rounded-full border px-2 py-0.5 text-xs text-muted-foreground';

/**
 * 세대 하나에 해당하는 타임라인 구간.
 *
 * 2열 그리드: [레일 1.5rem | 헤더 + 항목 그리드].
 * 섹션끼리 gap 없이 붙여 레일이 이어지고, 섹션 간격은 항목 목록의 pb로 준다
 * (섹션 padding은 그리드 영역 밖이라 레일이 그 구간에서 끊긴다).
 * 세대 헤더(노드 포함)가 섹션 범위 안에서 sticky로 따라온다.
 */
export default function GenerationTimelineSection({
  group,
  isFirst,
  isLast,
}: GenerationTimelineSectionProps) {
  return (
    <section
      aria-labelledby={group.headingId}
      className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-4 gap-y-2 md:gap-x-8"
    >
      {/* 세로 레일 */}
      <div
        aria-hidden="true"
        className={cn(
          'col-start-1 row-span-2 row-start-1 w-px justify-self-center bg-border',
          // 노드 중심 = 헤더 py-3(12px) + 줄 높이 절반 (text-2xl 32px → 28px, md:text-3xl 36px → 30px)
          isFirst && 'mt-7 md:mt-7.5',
        )}
      />

      <h2
        id={group.headingId}
        className={cn(
          'relative col-start-2 row-start-1 flex items-baseline gap-x-3 self-start',
          // px-3: 항목 목록의 px-3과 맞춰 헤더 글자와 항목 글자의 시작선을 일치시킨다.
          'px-3 py-3',
          // 앱 헤더(sticky h-13 = 52px, z-50) 바로 아래에 붙는다. 헤더 높이 = py-3 24px + 32px(md: 36px) = 56px(md: 60px).
          // 모바일에서도 sticky로 두어, 칩 행이 화면 밖으로 나가도 지금 보는 세대를 알 수 있게 한다.
          // 배경은 헤더 열에만 있고 레일 열에는 없어, sticky 중에도 레일이 끊겨 보이지 않는다.
          // whitespace-nowrap: 레일 시작점(mt-7)이 헤더 한 줄 높이를 전제로 계산되어 있다.
          'sticky top-13 z-10 bg-background/80 backdrop-blur-md whitespace-nowrap',
        )}
      >
        {/*
          노드는 헤더 밖(right-full)의 레일 열에 그린다. 헤더와 함께 sticky로 레일을 따라 내려간다.
          mr = 그리드 gap-x(4 / md:8), 노드 폭 = 레일 열 폭(1.5rem) → 노드 중심이 레일과 겹친다.
        */}
        <span
          aria-hidden="true"
          className="absolute top-1/2 right-full mr-4 flex size-6 -translate-y-1/2 items-center justify-center rounded-full border-2 border-primary bg-background md:mr-8"
        >
          <span className="size-2 rounded-full bg-primary" />
        </span>
        <span className="text-2xl font-bold md:text-3xl">
          {getGenerationLabel(group.gen)}
        </span>
        <span className="text-sm tabular-nums text-muted-foreground">
          {group.abilities.length}개
        </span>
      </h2>

      {/* 포커스 링과 호버 배경이 잘리지 않도록 px-3 bleed 여백을 확보한다. */}
      <ul
        className={cn(
          'col-start-2 row-start-2 grid grid-cols-1 gap-y-2 px-3',
          'md:grid-cols-2 md:gap-x-8 xl:grid-cols-3',
          !isLast && 'pb-12 md:pb-16',
        )}
      >
        {group.abilities.map((ability) => (
          <li key={ability.identifier} className="min-w-0">
            <AbilityEntry ability={ability} />
          </li>
        ))}
      </ul>
    </section>
  );
}

interface AbilityEntryProps {
  ability: Ability;
}

/** 타임라인 항목. 행 전체가 상세 페이지 링크다. 세대는 섹션이 알려주므로 배지를 생략한다. */
function AbilityEntry({ ability }: AbilityEntryProps) {
  return (
    <Link
      href={`/ability/${ability.identifier}`}
      className={cn(
        // -mx bleed: 좌우 여백까지 호버 배경으로 덮이고, 포커스 링도 이 여백 안에서 그려진다.
        '-mx-3 px-3 py-4 rounded-2xl',
        // Tab 포커스로 스크롤될 때 sticky 세대 헤더에 가리지 않게 한다.
        // html scroll-padding-top(72px) + scroll-mt-12(48px) = 120px ≥ 앱 헤더 + 세대 헤더(52 + 60 = 112px).
        'scroll-mt-12',
        // h-full: 같은 행에서 설명이 1줄인 항목도 호버 영역 높이가 맞는다.
        'flex h-full min-w-0 flex-col gap-1.5',
        'outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
        // 모바일 sticky-hover 방지
        '[@media(hover:hover)]:hover:bg-accent',
      )}
    >
      <span className="flex min-w-0 items-center gap-x-2">
        <span className="truncate font-semibold">{ability.nameKo}</span>
        {ability.isChampions && <span className={BADGE}>챔피언스</span>}
      </span>
      <span className="truncate text-sm text-muted-foreground">
        {ability.nameJa
          ? `${ability.nameEn} · ${ability.nameJa}`
          : ability.nameEn}
      </span>
      <span className="line-clamp-2 break-keep text-sm text-foreground/70">
        {ability.flavorText}
      </span>
    </Link>
  );
}
