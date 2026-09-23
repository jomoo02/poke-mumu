'use client';

import Link from 'next/link';

import { cn } from '@/shared/lib/cn';
import type { Ability } from '@/entities/ability/model';

import { getIndexLabel, type AbilityIndexGroup } from './group-by-initial';

interface AbilityIndexSectionProps {
  group: AbilityIndexGroup;
}

const BADGE =
  'shrink-0 rounded-full border px-2 py-0.5 text-xs text-muted-foreground';

/**
 * 초성 하나에 해당하는 사전 섹션.
 * md 이상: 왼쪽 열에 큰 초성이 섹션 범위 안에서 sticky로 따라온다.
 * md 미만: 초성 + 개수가 얇은 섹션 헤더로 위에 붙는다.
 */
export default function AbilityIndexSection({
  group,
}: AbilityIndexSectionProps) {
  const headingId = `${group.anchorId}-heading`;

  return (
    <section
      id={group.anchorId}
      aria-labelledby={headingId}
      className={cn(
        // 앵커 착지 위치 = html scroll-padding-top(72px, globals.css) + scroll-mt-13(52px) = 124px.
        // 헤더 52px + 색인 바 57px = 109px 아래로 15px 여유를 둔다.
        'scroll-mt-13',
        'grid grid-cols-1 gap-y-2 md:grid-cols-[4.5rem_minmax(0,1fr)] md:gap-x-4',
      )}
    >
      <h2
        id={headingId}
        className={cn(
          'flex items-baseline gap-x-2',
          // top-31(124px)은 앵커 착지 위치와 같아서, 점프 직후 초성이 튀지 않는다.
          // pt-3은 첫 항목의 py-3과 글자 기준선을 맞춘다.
          'md:sticky md:top-31 md:flex-col md:gap-y-1.5 md:self-start md:pt-3',
        )}
      >
        <span
          aria-hidden="true"
          className="text-lg font-bold text-muted-foreground md:text-4xl md:leading-none md:text-muted-foreground/60"
        >
          {group.key}
        </span>
        <span className="sr-only">{getIndexLabel(group.key)}</span>
        <span className="text-xs tabular-nums text-muted-foreground">
          {group.abilities.length}개
        </span>
      </h2>

      {/* 포커스 링과 호버 배경이 잘리지 않도록 px-3 bleed 여백을 확보한다. */}
      <ul className="grid grid-cols-1 gap-y-1 px-3 lg:grid-cols-2 lg:gap-x-6">
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

/** 사전 표제어 형태의 항목. 행 전체가 상세 페이지 링크다. */
function AbilityEntry({ ability }: AbilityEntryProps) {
  return (
    <Link
      href={`/ability/${ability.identifier}`}
      className={cn(
        // -mx bleed: 좌우 여백까지 호버 배경으로 덮이고, 포커스 링도 이 여백 안에서 그려진다.
        '-mx-3 px-3 py-3 rounded-2xl',
        // Tab 포커스로 스크롤될 때 sticky 색인 바에 가리지 않게 한다.
        // html scroll-padding-top(72px) + scroll-mt-10(40px) = 112px ≥ 헤더+색인 바(109px).
        'scroll-mt-10',
        'flex min-w-0 flex-col gap-1',
        'outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
        // 모바일 sticky-hover 방지
        '[@media(hover:hover)]:hover:bg-accent',
      )}
    >
      <span className="flex min-w-0 items-center gap-x-1.5">
        <span className="truncate font-semibold">{ability.nameKo}</span>
        <span className={BADGE}>{ability.gen}세대</span>
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
