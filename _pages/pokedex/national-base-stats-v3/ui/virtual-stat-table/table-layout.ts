import type { CSSProperties } from 'react';

import type { TableColumn } from '@/_shared/ui/data-table';
import type {
  BaseStatsPoke,
  StatKey,
} from '@/_pages/pokedex/national-base-stats/model/base-stats-poke';
import type { SortKey } from '@/_pages/pokedex/national-base-stats/model/poke-sort';
import { POKE_COLUMNS } from '@/_pages/pokedex/national-base-stats/ui/results/poke-table/columns';

/*
 * 레이아웃. 기존 페이지처럼 화면 폭이 아닌 본문 폭(@container, @5xl = 1024px)으로 나눈다
 * - @5xl 이상: 기존과 같은 한 줄 10열 grid(--table-cols)
 * - @5xl 미만: 2줄 행. 정렬 UI(sortUi)에 따라
 *   - 7칸 머리글(letter·segment): 윗줄 [스프라이트 번호 | 이름 타입], 아랫줄 H A B C D S 합 7칸.
 *     머리글도 같은 7칸이라 가로 스크롤 없이 칸이 맞고, 머리글을 눌러 정렬한다
 *   - 칩 바(chip): 윗줄 [스프라이트 번호 | 이름 타입 | 종족값], 아랫줄 라벨 붙은 능력치 6칸
 */

type PokeColumn = TableColumn<BaseStatsPoke, SortKey>;

// 포켓몬 정보 열(@5xl 미만에선 행 윗줄 하나로 합쳐진다)
const INFO_COLUMN_IDS = ['dexNumber', 'name', 'type'];

const INFO_COLUMNS: readonly PokeColumn[] = POKE_COLUMNS.filter((column) =>
  INFO_COLUMN_IDS.includes(column.id),
);

// 능력치 7열 (종족값 → 게임 표시 순서)
const STAT_COLUMNS: readonly PokeColumn[] = POKE_COLUMNS.filter(
  (column) => !INFO_COLUMN_IDS.includes(column.id),
);

const findColumn = (id: string): PokeColumn => {
  const column = POKE_COLUMNS.find((item) => item.id === id);
  if (!column) {
    throw new Error(`POKE_COLUMNS에 ${id} 열이 없습니다`);
  }
  return column;
};

// @5xl 미만 윗줄 정렬 칸
const DEX_COLUMN = findColumn('dexNumber');
const NAME_COLUMN = findColumn('name');
const TOTAL_COLUMN = findColumn('total');

// 능력치 6종 (칩 바에선 아랫줄 6칸, 종족값은 윗줄)
const SIX_STAT_COLUMNS: readonly PokeColumn[] = STAT_COLUMNS.filter(
  (column) => column.id !== TOTAL_COLUMN.id,
);

// 7칸 머리글·아랫줄 순서: H A B C D S 합 (합계는 끝)
const NARROW_HEAD_COLUMNS: readonly PokeColumn[] = [
  ...SIX_STAT_COLUMNS,
  TOTAL_COLUMN,
];

// 행 높이 (border 1 포함)
// - @5xl 이상: # 칸 스프라이트(size-10, 40) + 셀 패딩 28 + 1
// - @5xl 미만: py-3 24 + 윗줄 스프라이트(size-12, 48) + 줄 간격 gap-2 8 + 능력치 text-sm 20 + 1
//   능력치 위에 라벨(text-xs 16)이 붙으면(칩 바, 또는 표 머리글이 없는 정렬) 16 더 높다
// 행 크기·위치·바디 높이는 CSS 변수 --row-h로 그려 서버 HTML(본문 폭을 모름)부터 맞는다.
// JS는 이 값을 읽어(useCssRowHeight) 가상화가 보이는 범위를 고르는 데만 쓴다
const ROW_HEIGHT = { narrow: 101, narrowWithLabel: 117, wide: 69 } as const;

// 테이블 루트에 둔다 (@container 안이어야 한다). 능력치 위 라벨이 있으면 labeled
const ROW_HEIGHT_VARS_CLASS = {
  plain: '[--row-h:101px] @5xl:[--row-h:69px]',
  labeled: '[--row-h:117px] @5xl:[--row-h:69px]',
} as const;

// 능력치 한 글자 라벨. 대전 커뮤니티에서 쓰는 HABCDS 표기 (H 체력, A 공격, B 방어, C 특공, D 특방, S 스피드) + 합계
const STAT_LETTER: Record<StatKey, string> = {
  total: '합',
  hp: 'H',
  attack: 'A',
  defense: 'B',
  specialAttack: 'C',
  specialDefense: 'D',
  speed: 'S',
};

const TABLE_VARS = {
  '--table-cols': POKE_COLUMNS.map((column) => column.width).join(' '),
} as CSSProperties;

// @5xl 미만 윗줄. 7칸 머리글: [스프라이트(48) + 번호 | 이름 + 타입], 칩 바: 끝에 종족값 칸
const NARROW_TOP_GRID_CLASS = {
  column: 'grid grid-cols-[96px_minmax(0,1fr)] items-center gap-x-2',
  chip: 'grid grid-cols-[96px_minmax(0,1fr)_64px] items-center gap-x-2',
} as const;

// @5xl 미만 행 grid = 아랫줄 칸. 7칸 머리글은 머리글과 같은 값을 써야 칸이 맞는다
const NARROW_GRID_CLASS = {
  column: 'grid grid-cols-7 gap-x-1',
  chip: 'grid grid-cols-6 gap-x-1',
} as const;

// 윗줄이 아랫줄 칸을 모두 차지하게
const NARROW_TOP_SPAN_CLASS = {
  column: 'col-span-7',
  chip: 'col-span-6',
} as const;

// @5xl 이상 한 줄 10열 grid (기존 테이블의 gap-3)
const WIDE_GRID_CLASS =
  '@5xl:grid-cols-(--table-cols) @5xl:items-center @5xl:gap-3';

// _shared/ui/data-table/table-layout.ts와 같은 값 (공개 API가 아니라 복사)
const HEADER_ROW_CLASS =
  'h-11 rounded-sm bg-muted text-sm font-medium whitespace-nowrap text-foreground/70';

const HEAD_CELL_CLASS = 'px-3.5';

const CELL_CLASS = 'p-3.5';

const CELL_ALIGN_CLASS = {
  left: '',
  center: 'flex justify-center',
  right: 'text-right',
} as const;

const SORTABLE_HEAD_ALIGN_CLASS = {
  left: '',
  center: 'flex justify-center',
  right: 'flex justify-end',
} as const;

export type { PokeColumn };

export {
  INFO_COLUMNS,
  STAT_COLUMNS,
  DEX_COLUMN,
  NAME_COLUMN,
  TOTAL_COLUMN,
  SIX_STAT_COLUMNS,
  NARROW_HEAD_COLUMNS,
  ROW_HEIGHT,
  ROW_HEIGHT_VARS_CLASS,
  STAT_LETTER,
  TABLE_VARS,
  NARROW_TOP_GRID_CLASS,
  NARROW_GRID_CLASS,
  NARROW_TOP_SPAN_CLASS,
  WIDE_GRID_CLASS,
  HEADER_ROW_CLASS,
  HEAD_CELL_CLASS,
  CELL_CLASS,
  CELL_ALIGN_CLASS,
  SORTABLE_HEAD_ALIGN_CLASS,
};
