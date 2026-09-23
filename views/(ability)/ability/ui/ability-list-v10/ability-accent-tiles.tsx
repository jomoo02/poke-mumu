import Link from 'next/link';

import { cn } from '@/shared/lib/cn';
import type { Ability } from '@/entities/ability/model';

interface Props {
  abilities: Ability[];
}

// D. 액센트 타일: 왼쪽 세로 바가 있는 낮은 높이의 타일
export default function AbilityAccentTiles({ abilities }: Props) {
  return (
    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {abilities.map((ability) => (
        <li key={ability.identifier}>
          <Link
            href={`/ability/${ability.identifier}`}
            className={cn(
              'group flex h-full items-stretch gap-3 rounded-lg bg-muted/50 py-2.5 pr-3 pl-2.5 transition-colors',
              '[@media(hover:hover)]:hover:bg-muted',
              'outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
            )}
          >
            <span
              aria-hidden
              className="w-1 shrink-0 rounded-full bg-foreground/15 transition-colors [@media(hover:hover)]:group-hover:bg-foreground/60"
            />
            <span className="flex min-w-0 flex-col">
              <span className="font-semibold break-keep">{ability.nameKo}</span>
              <span className="truncate text-xs text-foreground/70">
                {ability.nameEn}
              </span>
              {ability.nameJa && (
                <span className="truncate text-xs text-muted-foreground">
                  {ability.nameJa}
                </span>
              )}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
