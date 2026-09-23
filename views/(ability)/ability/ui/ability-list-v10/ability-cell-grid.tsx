import Link from 'next/link';

import { cn } from '@/shared/lib/cn';
import type { Ability } from '@/entities/ability/model';

import { formatSubName } from './useAbilityList';

interface Props {
  abilities: Ability[];
}

// C. 셀 그리드: 스프레드시트처럼 1px 선을 공유하는 칸
export default function AbilityCellGrid({ abilities }: Props) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(13rem,1fr))] gap-px overflow-hidden rounded-xl border bg-border">
      {abilities.map((ability) => (
        <li key={ability.identifier} className="bg-background">
          <Link
            href={`/ability/${ability.identifier}`}
            className={cn(
              'flex h-full flex-col px-4 py-3 transition-colors',
              '[@media(hover:hover)]:hover:bg-muted/70',
              // 부모가 overflow-hidden이라 링을 안쪽으로 그려 잘림 방지
              'outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/50',
            )}
          >
            <span className="font-semibold break-keep">{ability.nameKo}</span>
            <span className="truncate text-xs text-foreground/70">
              {formatSubName(ability)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
