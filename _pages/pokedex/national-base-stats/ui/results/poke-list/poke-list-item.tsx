import Link from 'next/link';

import { cn } from '@/_shared/lib/cn';
import {
  PokeSprite,
  formatDexNumber,
  getPokeHref,
  getPokeName,
} from '@/_entities/poke';

import {
  STAT_KEYS,
  STAT_LABEL,
  STAT_SHORT_LABEL,
  type BaseStatsPoke,
} from '../../../model/base-stats-poke';
import type { SortKey } from '../../../model/poke-sort';
import StatValue from '../stat-value';
import PokeTypes from '../poke-types';

interface PokeListItemProps {
  poke: BaseStatsPoke;
  // 지금 정렬 기준. 능력치 기준이면 그 칸을 강조한다
  sortKey: SortKey;
}

// 좁은 본문: 위 [스프라이트 번호/이름 타입], 아래 능력치 7칸
// 넓은 본문(@xl 이상): 한 줄에 [스프라이트 번호/이름 타입 │ 능력치 7칸]
export default function PokeListItem({ poke, sortKey }: PokeListItemProps) {
  return (
    <li
      className={cn(
        'relative -mx-3 flex flex-col gap-4 rounded-2xl px-3 py-4',
        '@xl:flex-row @xl:items-center @xl:gap-8',
        'before:absolute before:inset-x-3 before:top-0 before:h-px before:bg-border first:before:hidden',
        '[@media(hover:hover)]:hover:bg-muted/70',
        '[@media(hover:hover)]:hover:before:opacity-0 [@media(hover:hover)]:[li:hover+&]:before:opacity-0',
        'has-[a:focus-visible]:before:opacity-0 [li:has(a:focus-visible)+&]:before:opacity-0',
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <PokeSprite poke={poke} alt="" className="size-12 shrink-0" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-sm font-medium tabular-nums text-foreground/70">
            {formatDexNumber(poke.dexNumber)}
          </span>
          <Link
            href={getPokeHref(poke)}
            className={cn(
              'truncate font-medium outline-none',
              'focus-visible:rounded-sm focus-visible:ring-[3px] focus-visible:ring-ring/50',
              // 항목 전체를 클릭 영역으로
              'after:absolute after:inset-0 after:rounded-2xl',
            )}
          >
            {getPokeName(poke)}
          </Link>
        </div>
        <PokeTypes poke={poke} className="shrink-0" />
      </div>

      {/* 7칸을 같은 폭으로 나눠 위아래 항목의 수치를 열처럼 맞춘다.
          화면엔 줄인 이름(특공), 스크린리더엔 전체 이름(특수공격) */}
      <dl className="grid grid-cols-7 gap-1 text-center @xl:w-96 @xl:shrink-0">
        {STAT_KEYS.map((key) => {
          const isSorted = key === sortKey;

          return (
            <div key={key} className="flex flex-col gap-0.5">
              <dt
                className={cn(
                  'text-xs font-medium',
                  isSorted ? 'text-foreground' : 'text-foreground/70',
                )}
              >
                <span aria-hidden>{STAT_SHORT_LABEL[key]}</span>
                <span className="sr-only">{STAT_LABEL[key]}</span>
              </dt>
              <dd
                className={cn(
                  'text-md',
                  isSorted || key === 'total' ? 'font-semibold' : 'font-medium',
                )}
              >
                <StatValue value={poke.stats[key]} />
              </dd>
            </div>
          );
        })}
      </dl>
    </li>
  );
}
