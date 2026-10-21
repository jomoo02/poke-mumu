import { Skeleton, SkeletonLine } from '@/_shared/ui/skeleton';
import type { TableColumn } from '@/_shared/ui/data-table';

import {
  STAT_KEYS,
  STAT_LABEL,
  STAT_SHORT_LABEL,
  type BaseStatsPoke,
  type StatKey,
} from '@/_pages/pokedex/national-base-stats/model/base-stats-poke';
import type { SortKey } from '@/_pages/pokedex/national-base-stats/model/poke-sort';
import StatValue from '../stat-value';
import PokeTypes from '../poke-types';
import PokeDexCell from './poke-dex-cell';
import PokeNameCell from './poke-name-cell';

// 열이 10개라 기본 간격(gap-5)이면 일반 노트북 폭에 들어가지 않아 줄인다
export const POKE_TABLE_ROW_CLASS = 'gap-3';

// 숫자 셀 스켈레톤. 폭은 세 자리 숫자 정도
const STAT_SKELETON = (
  <div className="text-md">
    <SkeletonLine className="w-7" />
  </div>
);

// 수치 열의 최소 폭 = 헤더 정렬 버튼(라벨 + gap-1.5 + 아이콘 size-4) + 셀 패딩(p-3.5 양쪽)에서
// 버튼 bleed(-mx-2.5 양쪽)를 뺀 값. 라벨 글자 수로 나눈다
// - HP(영문 두 글자) 72px / 두 글자(총합·공격·방어·특공·특방) 80px / 세 글자(스피드) 92px
const STAT_MIN_WIDTH: Record<StatKey, number> = {
  total: 80,
  hp: 72,
  attack: 80,
  defense: 80,
  specialAttack: 80,
  specialDefense: 80,
  speed: 92,
};

const statColumn = (key: StatKey): TableColumn<BaseStatsPoke, SortKey> => ({
  id: key,
  header: STAT_SHORT_LABEL[key],
  headerLabel:
    STAT_SHORT_LABEL[key] === STAT_LABEL[key] ? undefined : STAT_LABEL[key],
  width: `minmax(${STAT_MIN_WIDTH[key]}px,0.75fr)`,
  align: 'right',
  sortKey: key,
  cell: (poke) => (
    <StatValue
      value={poke.stats[key]}
      // 총합은 능력치와 구분되게 굵게
      className={key === 'total' ? 'text-md font-semibold' : 'text-md'}
    />
  ),
  skeleton: STAT_SKELETON,
});

// 폭: 남는 폭을 이름 2 : 타입 1 : 수치 0.75 비율로 나눠 표를 꽉 채운다.
// 최소 폭 합계 884px + 간격(gap-3 × 9) 108px = 약 992px. 이보다 좁으면 리스트로 바뀐다 (results/index.tsx)
// - #: 네 자리 번호 + 스프라이트(size-10). 식별용이라 늘리지 않고 고정
// - 이름: 폼 약칭까지 한 줄 ('나옹 (가라르)'). 최소 폭에서 긴 이름은 말줄임
// - 타입: 아이콘 두 칸(size-7 × 2 + gap-1) + 셀 패딩
// skeleton은 각 cell과 같은 글꼴 크기·간격을 써서 로딩 전후 행 높이를 맞춘다
export const POKE_COLUMNS: readonly TableColumn<BaseStatsPoke, SortKey>[] = [
  {
    id: 'dexNumber',
    header: '#',
    width: '112px',
    sortKey: 'dexNumber',
    cell: (poke) => <PokeDexCell poke={poke} />,
    skeleton: (
      <div className="flex items-center gap-2">
        <div className="text-md">
          <SkeletonLine className="w-9" />
        </div>
        <Skeleton className="size-10 shrink-0 rounded-full" />
      </div>
    ),
  },
  {
    id: 'name',
    header: '이름',
    width: 'minmax(120px,2fr)',
    sortKey: 'name',
    cell: (poke) => <PokeNameCell poke={poke} />,
    skeleton: <SkeletonLine className="w-20" />,
  },
  {
    id: 'type',
    header: '타입',
    width: 'minmax(88px,1fr)',
    align: 'center',
    cell: (poke) => <PokeTypes poke={poke} />,
    skeleton: (
      <div className="flex gap-1">
        <Skeleton className="size-7 rounded-sm" />
        <Skeleton className="size-7 rounded-sm" />
      </div>
    ),
  },
  ...STAT_KEYS.map(statColumn),
];
