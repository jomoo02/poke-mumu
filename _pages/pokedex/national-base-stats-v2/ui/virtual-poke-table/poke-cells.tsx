import Link from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/_shared/lib/cn';
import { PokeSprite, getPokeHref, getPokeName } from '@/_entities/poke';
import type { BaseStatsPoke } from '@/_pages/pokedex/national-base-stats/model/base-stats-poke';
import StatValue from '@/_pages/pokedex/national-base-stats/ui/results/stat-value';
import PokeTypes from '@/_pages/pokedex/national-base-stats/ui/results/poke-types';

/*
 * 기존 열의 셀을 @5xl 미만에 맞게 바꾼 것
 * - #: @5xl 미만은 번호만(text-sm), 이상은 기존처럼 번호 + 스프라이트
 * - 이름: @5xl 미만은 스프라이트(48px) + 이름(text-md), 이상은 기존처럼 이름만.
 *   stretched link(after:inset-0)는 뺐다. 행 전체 클릭은 행의 오버레이 링크가 맡는다
 * - 타입: @5xl 미만은 아이콘을 세로로 쌓는다. 단일 타입도 두 칸 높이를 잡아 첫째 타입이 행마다 같은 높이에 온다
 * - 능력치: @5xl 미만 text-sm
 * 스프라이트는 이름이 글자로 있어 장식(alt='')이고, 안 보이는 쪽은 display:none이다
 */

const STAT_TEXT_CLASS = 'text-md @max-5xl:text-sm';

function DexCell({ poke }: { poke: BaseStatsPoke }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-md tabular-nums @max-5xl:text-sm">
        {String(poke.dexNumber).padStart(4, '0')}
      </span>
      <PokeSprite
        poke={poke}
        alt=""
        className="hidden size-10 shrink-0 @5xl:block"
      />
    </div>
  );
}

function NameCell({ poke }: { poke: BaseStatsPoke }) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <PokeSprite poke={poke} alt="" className="size-12 shrink-0 @5xl:hidden" />
      <Link
        href={getPokeHref(poke)}
        className={cn(
          'relative block min-w-0 truncate font-medium outline-none @max-5xl:text-md',
          'focus-visible:rounded-sm focus-visible:ring-[3px] focus-visible:ring-ring/50',
        )}
      >
        {getPokeName(poke)}
      </Link>
    </div>
  );
}

const statCell = (key: keyof BaseStatsPoke['stats']) => {
  const StatCell = (poke: BaseStatsPoke) => (
    <StatValue
      value={poke.stats[key]}
      // 종족값(합계)은 능력치와 구분되게 굵게
      className={cn(STAT_TEXT_CLASS, key === 'total' && 'font-semibold')}
    />
  );
  return StatCell;
};

const CELLS: Partial<Record<string, (poke: BaseStatsPoke) => ReactNode>> = {
  dexNumber: (poke) => <DexCell poke={poke} />,
  name: (poke) => <NameCell poke={poke} />,
  type: (poke) => (
    <PokeTypes
      poke={poke}
      className="@max-5xl:grid-cols-1 @max-5xl:grid-rows-2"
    />
  ),
  total: statCell('total'),
  hp: statCell('hp'),
  attack: statCell('attack'),
  defense: statCell('defense'),
  specialAttack: statCell('specialAttack'),
  specialDefense: statCell('specialDefense'),
  speed: statCell('speed'),
};

// 바꾼 셀이 없으면 기존 열의 셀을 그대로 쓴다
const renderCell = (
  columnId: string,
  poke: BaseStatsPoke,
  fallback: (poke: BaseStatsPoke) => ReactNode,
) => (CELLS[columnId] ?? fallback)(poke);

export { renderCell };
