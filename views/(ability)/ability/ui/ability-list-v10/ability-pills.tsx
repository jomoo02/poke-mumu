import Link from 'next/link';

import { cn } from '@/shared/lib/cn';
import type { Ability } from '@/entities/ability/model';

import { formatSubName } from './useAbilityList';

interface Props {
  abilities: Ability[];
}

// B. 한 줄 필: 이름 길이만큼만 차지하며 옆으로 흐름
export default function AbilityPills({ abilities }: Props) {
  return (
    <ul className="flex flex-wrap gap-2">
      {abilities.map((ability) => (
        <li key={ability.identifier}>
          <Link
            href={`/ability/${ability.identifier}`}
            className={cn(
              'flex h-9 items-center gap-2 rounded-full border bg-card px-4 text-sm transition-colors',
              '[@media(hover:hover)]:hover:bg-muted',
              'outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring',
            )}
          >
            <span className="font-semibold whitespace-nowrap">
              {ability.nameKo}
            </span>
            <span className="text-foreground/60 whitespace-nowrap">
              {formatSubName(ability)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
