import Link from 'next/link';
import { ChevronRightIcon } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import type { Ability } from '@/entities/ability/model';

import HighlightedText from './highlighted-text';

interface AbilityGlossaryEntryProps {
  ability: Ability;
  /** 이름 강조에 쓸 검색어 */
  query: string;
}

const BADGE =
  'shrink-0 rounded-full border px-2 py-0.5 text-xs text-muted-foreground';

/**
 * 용어집 한 항목. `<dl>` 바로 아래의 `<div>` 그룹(dt + dd)이다.
 *
 * 링크는 dt 안의 이름에만 두고, `after:absolute inset-0`(stretched link)로 행 전체를 클릭 영역으로 넓힌다.
 * dl/dt/dd 시맨틱을 깨지 않으면서 행 전체 호버·클릭 패턴을 유지하기 위한 구조다.
 * 구분선은 행의 ::before로 그린다(dl의 div 그룹에는 dt/dd 외 자식 요소를 둘 수 없다).
 */
export default function AbilityGlossaryEntry({
  ability,
  query,
}: AbilityGlossaryEntryProps) {
  return (
    <div
      className={cn(
        // relative: stretched link(after)와 구분선(before)의 기준.
        // -mx bleed: 좌우 여백까지 호버 배경으로 덮이고, 포커스 링도 목록의 px-3 안에서 그려진다.
        'group relative rounded-2xl ',
        'flex flex-col gap-3 py-6',
        // md 이상: [용어 | 설명] 2열. items-baseline으로 이름과 설명 첫 줄의 기준선을 맞춘다.
        'md:grid md:grid-cols-[14rem_minmax(0,1fr)] md:items-baseline md:gap-x-12 md:py-7',
        // 항목 사이 얇은 구분선. 글자 시작선(inset-x-3)에 맞추고 첫 항목에는 그리지 않는다.
        'before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-border first:before:hidden',
        // 모바일 sticky-hover 방지
        // '[@media(hover:hover)]:hover:bg-accent',
        // 호버·포커스된 행의 위아래 구분선을 숨겨 둥근 배경이 선에 잘려 보이지 않게 한다.
        '[@media(hover:hover)]:hover:before:opacity-0 [@media(hover:hover)]:[div:hover+&]:before:opacity-0',
        'has-[a:focus-visible]:before:opacity-0 [div:has(a:focus-visible)+&]:before:opacity-0',
      )}
    >
      <dt className="flex min-w-0 flex-col gap-1.5">
        <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <Link
            href={`/ability/${ability.identifier}`}
            className={cn(
              'text-base font-semibold break-keep md:text-lg',
              // stretched link: 가장 가까운 positioned 조상(행)을 덮는다.
              'outline-none after:absolute after:inset-0 after:rounded-2xl',
              'focus-visible:after:ring-[3px] focus-visible:after:ring-ring/50',
            )}
          >
            <HighlightedText text={ability.nameKo} query={query} />
          </Link>
          {ability.isChampions && <span className={BADGE}>챔피언스</span>}
        </span>
        <span className="text-sm break-words text-muted-foreground">
          <HighlightedText text={ability.nameEn} query={query} />
          {ability.nameJa && (
            <>
              {' · '}
              <HighlightedText text={ability.nameJa} query={query} />
            </>
          )}
        </span>
      </dt>

      <dd className="flex min-w-0 items-start gap-6">
        <p className="flex-1 text-sm leading-relaxed break-keep text-foreground/70 md:text-base">
          {ability.flavorText}
        </p>
        <ChevronRightIcon
          aria-hidden="true"
          className={cn(
            'hidden size-5 shrink-0 self-center text-muted-foreground opacity-0 transition-opacity md:block',
            '[@media(hover:hover)]:group-hover:opacity-100 group-has-[a:focus-visible]:opacity-100',
          )}
        />
      </dd>
    </div>
  );
}
