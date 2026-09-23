import Link from 'next/link';

import { cn } from '@/shared/lib/cn';
import type { Ability } from '@/entities/ability/model';

interface Props {
  abilities: Ability[];
}

// E. 신문 단: CSS columns로 세로로 채우고 단 사이에 세로 괘선
export default function AbilityRuledColumns({ abilities }: Props) {
  return (
    <ul className="columns-1 gap-10 sm:columns-2 lg:columns-3 [column-rule:1px_solid_var(--color-border)]">
      {abilities.map((ability) => (
        <li
          key={ability.identifier}
          className="relative isolate break-inside-avoid py-2"
        >
          <div className="flex items-baseline justify-between gap-3">
            <Link
              href={`/ability/${ability.identifier}`}
              className={cn(
                'font-semibold break-keep',
                'outline-none after:absolute after:-inset-x-2 after:inset-y-0 after:rounded-md after:-z-10',
                '[@media(hover:hover)]:hover:after:bg-muted/70',
                'focus-visible:after:ring-[3px] focus-visible:after:ring-ring/50',
              )}
            >
              {ability.nameKo}
            </Link>
            <span className="truncate text-sm text-foreground/70">
              {ability.nameEn}
            </span>
          </div>
          {ability.nameJa && (
            <p className="text-right text-xs text-muted-foreground">
              {ability.nameJa}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
