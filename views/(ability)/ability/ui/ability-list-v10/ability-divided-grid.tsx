import Link from 'next/link';

import { cn } from '@/shared/lib/cn';
import type { Ability } from '@/entities/ability/model';

import { formatSubName } from './useAbilityList';

interface Props {
  abilities: Ability[];
}

// A. 구분선 그리드: 2~3단으로 흐르는 가벼운 리스트, 행마다 하단 구분선
export default function AbilityDividedGrid({ abilities }: Props) {
  return (
    <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
      {abilities.map((ability) => (
        <li
          key={ability.identifier}
          className="relative isolate border-b border-border py-3"
        >
          <Link
            href={`/ability/${ability.identifier}`}
            className={cn(
              'font-semibold break-keep',
              'outline-none after:absolute after:-inset-x-2 after:inset-y-1 after:rounded-lg',
              '[@media(hover:hover)]:hover:after:bg-muted/70 after:-z-10',
              'focus-visible:after:ring-[3px] focus-visible:after:ring-ring/50',
            )}
          >
            {ability.nameKo}
          </Link>
          <p className="truncate text-sm text-foreground/70">
            {formatSubName(ability)}
          </p>
        </li>
      ))}
    </ul>
  );
}
