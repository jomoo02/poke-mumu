import Link from 'next/link';

import { cn } from '@/shared/lib/cn';
import type { Ability } from '@/entities/ability/model';

import { formatSubName } from './useAbilityList';

interface Props {
  abilities: Ability[];
}

// F. 문장형 흐름: 문단처럼 이어지고 가운뎃점으로 구분
export default function AbilityInlineFlow({ abilities }: Props) {
  return (
    <ul className="flex flex-wrap items-baseline gap-y-2 leading-relaxed">
      {abilities.map((ability) => (
        <li
          key={ability.identifier}
          className="after:mx-3 after:text-muted-foreground after:content-['·'] last:after:hidden"
        >
          <Link
            href={`/ability/${ability.identifier}`}
            className={cn(
              'rounded-sm font-semibold underline-offset-4 decoration-foreground/30',
              '[@media(hover:hover)]:hover:underline',
              'outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
            )}
          >
            {ability.nameKo}
          </Link>
          <span className="ml-1.5 text-sm text-foreground/60">
            {formatSubName(ability)}
          </span>
        </li>
      ))}
    </ul>
  );
}
