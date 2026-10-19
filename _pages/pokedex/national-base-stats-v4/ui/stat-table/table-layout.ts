import type { CSSProperties } from 'react';

import type { TableColumn } from '@/_shared/ui/data-table';
import type {
  BaseStatsPoke,
  StatKey,
} from '@/_pages/pokedex/national-base-stats/model/base-stats-poke';
import type { SortKey } from '@/_pages/pokedex/national-base-stats/model/poke-sort';
import { POKE_COLUMNS } from '@/_pages/pokedex/national-base-stats/ui/results/poke-table/columns';

/*
 * 레이아웃. 화면 폭이 아닌 본문 폭(@container, @5xl = 1024px)으로 나눈다
 * - @5xl 이상: 한 줄 10열 grid(--table-cols)
 * - @5xl 미만: 2줄 행. [스프라이트 | 번호 / 이름 | 타입] / 능력치 7칸(HP 공격 방어 특공 특방 스피드 총합).
 *   머리글 두 줄도 같은 7칸 grid: [번호] [이름] (고정 안 함) / 능력치 7칸 (고정)
 */

type PokeColumn = TableColumn<BaseStatsPoke, SortKey>;

// 포켓몬 정보 열 (@5xl 미만에선 행 윗줄 하나로 합쳐진다)
const INFO_COLUMN_IDS = ['dexNumber', 'name', 'type'];

const INFO_COLUMNS: readonly PokeColumn[] = POKE_COLUMNS.filter((column) =>
  INFO_COLUMN_IDS.includes(column.id),
);

// 능력치 7열 (총합 → 게임 표시 순서)
const STAT_COLUMNS: readonly PokeColumn[] = POKE_COLUMNS.filter(
  (column) => !INFO_COLUMN_IDS.includes(column.id),
);

const TOTAL_COLUMN_ID = 'total';

// @5xl 미만 머리글 둘째 줄·카드 능력치 줄: 능력치 6종(게임 표시 순서) → 총합 (합계는 끝)
const NARROW_STAT_COLUMNS: readonly PokeColumn[] = [
  ...STAT_COLUMNS.filter((column) => column.id !== TOTAL_COLUMN_ID),
  ...STAT_COLUMNS.filter((column) => column.id === TOTAL_COLUMN_ID),
];

// @5xl 미만 머리글 글자. 7칸이 좁아 능력치는 대전 커뮤니티의 HABCDS 표기
// (H 체력, A 공격, B 방어, C 특공, D 특방, S 스피드), 총합은 그대로. 스크린리더엔 전체 이름(STAT_LABEL)
const NARROW_STAT_LETTER: Record<StatKey, string> = {
  hp: 'H',
  attack: 'A',
  defense: 'B',
  specialAttack: 'C',
  specialDefense: 'D',
  speed: 'S',
  total: '총합',
};

const findColumn = (id: string): PokeColumn => {
  const column = POKE_COLUMNS.find((item) => item.id === id);
  if (!column) {
    throw new Error(`POKE_COLUMNS에 ${id} 열이 없습니다`);
  }
  return column;
};

// @5xl 미만 머리글 첫째 줄: [번호] [이름]
const DEX_COLUMN = findColumn('dexNumber');
const NAME_COLUMN = findColumn('name');

// 행 높이 (border 1 포함)
// - @5xl 이상: 스프라이트(size-12.5, 50)가 셀 패딩 28 + 숫자 줄보다 작아 셀 높이(68) + 1
// - @5xl 미만: py-3 24 + 윗줄 스프라이트 타일(size-16, 64) + gap-y-2 8 + 능력치 text-sm 20 + 1
// 행 크기·위치·바디 높이는 CSS 변수 --row-h로 그려 서버 HTML(본문 폭을 모름)부터 맞는다.
// JS는 이 값을 읽어(useCssRowHeight) 가상화가 보이는 범위를 고르는 데만 쓴다
const ROW_HEIGHT = { narrow: 117, wide: 69 } as const;

// 테이블 루트에 둔다 (@container 안이어야 한다)
const ROW_HEIGHT_VARS_CLASS = '[--row-h:117px] @5xl:[--row-h:69px]';

// @5xl 이상 열 너비. # 열은 번호·스프라이트 두 칸으로 나눈다:
// 좁은 본문에선 스프라이트가 번호와 떨어져(번호는 이름 위) 있어, 같은 요소를 쓰려면 넓은 본문에서도 따로 칸이어야 한다
// - 번호: 셀 왼쪽 패딩 14 + 네 자리 숫자(text-md) 약 40 / 스프라이트: size-12.5
const DEX_TRACKS = '56px 50px';

const TABLE_VARS = {
  '--table-cols': POKE_COLUMNS.map((column) =>
    column.id === 'dexNumber' ? DEX_TRACKS : column.width,
  ).join(' '),
} as CSSProperties;

// @5xl 미만 윗줄: [스프라이트 타일 | No.번호 / 이름 | 타입] (/pokedex/national 모바일 행과 같은 모양)
// @5xl 이상에선 display: contents로 풀려 안의 스프라이트·번호·이름·타입이 그대로 grid의 칸이 된다
// (같은 요소를 두 레이아웃이 함께 쓴다)
const NARROW_TOP_CLASS =
  'col-span-7 flex min-w-0 items-center gap-x-3.5 @5xl:contents';

// 테이블 루트. data-sort(지금 보이는 행의 정렬 기준)로 정렬 중인 열을 CSS가 칠한다.
// 행이 정렬 기준을 props로 받지 않아, 정렬을 바꿔도 행(memo)은 다시 그려지지 않고 순서만 바뀐다
const TABLE_GROUP_CLASS = 'group/table';

// @5xl 미만 정렬 중인 칸: 배경 + 굵게. 행마다 같은 자리에 쌓여 열이 칠해진 것처럼 보인다.
// Tailwind가 클래스를 찾을 수 있게 능력치마다 문자열을 그대로 적는다
const SORTED_CELL_CLASS: Record<StatKey, string> = {
  total:
    '@max-5xl:group-data-[sort=total]/table:bg-muted @max-5xl:group-data-[sort=total]/table:font-semibold',
  hp: '@max-5xl:group-data-[sort=hp]/table:bg-muted @max-5xl:group-data-[sort=hp]/table:font-semibold',
  attack:
    '@max-5xl:group-data-[sort=attack]/table:bg-muted @max-5xl:group-data-[sort=attack]/table:font-semibold',
  defense:
    '@max-5xl:group-data-[sort=defense]/table:bg-muted @max-5xl:group-data-[sort=defense]/table:font-semibold',
  specialAttack:
    '@max-5xl:group-data-[sort=specialAttack]/table:bg-muted @max-5xl:group-data-[sort=specialAttack]/table:font-semibold',
  specialDefense:
    '@max-5xl:group-data-[sort=specialDefense]/table:bg-muted @max-5xl:group-data-[sort=specialDefense]/table:font-semibold',
  speed:
    '@max-5xl:group-data-[sort=speed]/table:bg-muted @max-5xl:group-data-[sort=speed]/table:font-semibold',
};

// @5xl 미만 행 grid = 아랫줄 7칸. 머리글과 같은 값을 써야 칸이 맞는다.
// 344px(본문 312px)에서 칸 약 41.1px, 가장 긴 머리글 '총합⇕'·'번호⇕'(text-sm)는 약 38.5px
const NARROW_GRID_CLASS = 'grid grid-cols-7 gap-x-1';

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
  TOTAL_COLUMN_ID,
  NARROW_STAT_COLUMNS,
  NARROW_STAT_LETTER,
  DEX_COLUMN,
  NAME_COLUMN,
  ROW_HEIGHT,
  ROW_HEIGHT_VARS_CLASS,
  TABLE_VARS,
  TABLE_GROUP_CLASS,
  SORTED_CELL_CLASS,
  NARROW_TOP_CLASS,
  NARROW_GRID_CLASS,
  WIDE_GRID_CLASS,
  HEADER_ROW_CLASS,
  HEAD_CELL_CLASS,
  CELL_CLASS,
  CELL_ALIGN_CLASS,
  SORTABLE_HEAD_ALIGN_CLASS,
};
