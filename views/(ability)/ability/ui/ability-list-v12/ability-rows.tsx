import Link from 'next/link';

import type { Ability } from '@/entities/ability/model';
import { cn } from '@/shared/lib/cn';

import { formatSubName, getAbilityHref } from './lib';

interface AbilityRowsProps {
  abilities: Ability[];
}

/** 좁은 폭(@2xl 미만) 1열 리스트. 행 전체가 이름 Link의 stretched link. */
export default function AbilityRows({ abilities }: AbilityRowsProps) {
  return (
    <ul aria-label="특성 목록" className="flex flex-col px-3 @2xl:hidden">
      {abilities.map((ability) => (
        <li
          key={ability.identifier}
          className={cn(
            'relative -mx-3 grid grid-cols-[minmax(0,1fr)_auto] content-start gap-x-3 gap-y-1.5 rounded-2xl px-3 py-4',
            // 구분선: 첫 행 제외. 호버/포커스된 행의 위아래 선은 숨겨 배경·링과 겹치지 않게 한다.
            'before:absolute before:inset-x-3 before:top-0 before:h-px before:bg-border first:before:hidden',
            '[@media(hover:hover)]:hover:bg-muted',
            '[@media(hover:hover)]:hover:before:opacity-0 [@media(hover:hover)]:[li:hover+&]:before:opacity-0',
            'has-[a:focus-visible]:before:opacity-0 [li:has(a:focus-visible)+&]:before:opacity-0',
          )}
        >
          <div className="flex min-w-0 flex-col gap-0.5">
            <Link
              href={getAbilityHref(ability.identifier)}
              className={cn(
                'truncate font-semibold outline-none',
                'after:absolute after:inset-0 after:rounded-2xl',
                'focus-visible:after:ring-[3px] focus-visible:after:ring-ring/50',
              )}
            >
              {ability.nameKo}
            </Link>
            <span className="truncate text-sm text-muted-foreground">
              {formatSubName(ability)}
            </span>
          </div>
          <span className="inline-flex h-6 items-center self-start rounded-md border px-2 text-xs text-foreground/70 tabular-nums">
            {ability.gen}세대
          </span>
          <p className="col-span-2 line-clamp-2 text-sm break-keep text-foreground/70">
            {ability.flavorText}
          </p>
        </li>
      ))}
    </ul>
  );
}
