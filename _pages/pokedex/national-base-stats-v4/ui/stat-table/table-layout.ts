import type { CSSProperties } from 'react';

import type { TableColumn } from '@/_shared/ui/data-table';
import type {
  BaseStatsPoke,
  StatKey,
} from '@/_pages/pokedex/national-base-stats-v0/model/base-stats-poke';
import type { SortKey } from '@/_pages/pokedex/national-base-stats-v0/model/poke-sort';
import { POKE_COLUMNS } from '@/_pages/pokedex/national-base-stats-v0/ui/results/poke-table/columns';

/*
 * 레이아웃. 화면 폭이 아닌 본문 폭(@container, @5xl = 1024px)으로 나눈다
 * - @5xl 이상: 한 줄 10열 grid(--table-cols)
 * - @5xl 미만: 2줄 카드. [스프라이트 | 번호 / 이름 | 타입] / 능력치 7칸(HP 공격 방어 특공 특방 스피드 총합).
 *   머리글 없이 칸마다 능력치 이름(text-xs)을 숫자 위에 둔다. 정렬은 결과 줄의 정렬 시트
 */

type PokeColumn = TableColumn<BaseStatsPoke, SortKey>;

// 포켓몬 정보 열 (@5xl 미만에선 행 윗줄 하나로 합쳐진다)
const INFO_COLUMN_IDS = ['dexNumber', 'name', 'type'];

const INFO_COLUMNS: readonly PokeColumn[] = POKE_COLUMNS.filter((column) =>
  INFO_COLUMN_IDS.includes(column.id),
);

const TOTAL_COLUMN_ID = 'total';

// 능력치 7열: 게임 표시 순서(HP … 스피드) → 총합. 합계는 끝 (넓은 본문 열·좁은 본문 카드 칸·정렬 시트 모두 같은 순서)
const STAT_COLUMNS: readonly PokeColumn[] = [
  ...POKE_COLUMNS.filter(
    (column) =>
      !INFO_COLUMN_IDS.includes(column.id) && column.id !== TOTAL_COLUMN_ID,
  ),
  ...POKE_COLUMNS.filter((column) => column.id === TOTAL_COLUMN_ID),
];

// 행 높이 (border 1 포함)
// - @5xl 이상: 스프라이트(size-12.5, 50)가 셀 패딩 28 + 숫자 줄보다 작아 셀 높이(68) + 1
// - @5xl 미만: py-3 24 + 윗줄 스프라이트 타일(size-16, 64) + gap-y-2 8
//   + 능력치 칸(py-0.5 4 + 이름 text-xs 16 + 숫자 text-sm 20) + 1
// 행 크기·위치·바디 높이는 CSS 변수 --row-h로 그려 서버 HTML(본문 폭을 모름)부터 맞는다.
// JS는 이 값을 읽어(useCssRowHeight) 가상화가 보이는 범위를 고르는 데만 쓴다
const ROW_HEIGHT = { narrow: 137, wide: 69 } as const;

// 테이블 루트에 둔다 (@container 안이어야 한다)
const ROW_HEIGHT_VARS_CLASS = '[--row-h:137px] @5xl:[--row-h:69px]';

// @5xl 이상 열 너비. # 열은 번호·스프라이트 두 칸으로 나눈다:
// 좁은 본문에선 스프라이트가 번호와 떨어져(번호는 이름 위) 있어, 같은 요소를 쓰려면 넓은 본문에서도 따로 칸이어야 한다
// - 번호: 셀 왼쪽 패딩 14 + 네 자리 숫자(text-md) 약 40 / 스프라이트: size-12.5
const DEX_TRACKS = '56px 50px';

// 능력치 열 최소 폭. 머리글이 줄이지 않은 이름(특수공격 ▴▾, 버튼 약 85px)이라 두 열을 넓히고,
// 머리글이 짧은 열(HP·총합·공격·방어·스피드)에서 그만큼 줄여 합계(564px)는 기존과 같게 둔다
// (본문 1024px에서 표가 넘치지 않게). 셀 패딩 28 + 머리글 버튼 글자·삼각형 폭이 기준
const STAT_MIN_WIDTH: Record<StatKey, number> = {
  total: 72,
  hp: 64,
  attack: 72,
  defense: 72,
  specialAttack: 100,
  specialDefense: 100,
  speed: 84,
};

const isStatColumnId = (id: string): id is StatKey => id in STAT_MIN_WIDTH;

// 열 순서는 이 페이지의 순서(INFO → STAT_COLUMNS, 총합이 끝)를 따른다 (POKE_COLUMNS는 총합이 앞)
const TABLE_VARS = {
  '--table-cols': [...INFO_COLUMNS, ...STAT_COLUMNS].map((column) => {
    if (column.id === 'dexNumber') {
      return DEX_TRACKS;
    }
    return isStatColumnId(column.id)
      ? `minmax(${STAT_MIN_WIDTH[column.id]}px,0.75fr)`
      : column.width;
  }).join(' '),
} as CSSProperties;

// @5xl 미만 윗줄: [스프라이트 타일 | No.번호 / 이름 | 타입] (/pokedex/national 모바일 행과 같은 모양)
// @5xl 이상에선 display: contents로 풀려 안의 스프라이트·번호·이름·타입이 그대로 grid의 칸이 된다
// (같은 요소를 두 레이아웃이 함께 쓴다)
const NARROW_TOP_CLASS =
  'col-span-7 flex min-w-0 items-center gap-x-3.5 @5xl:contents';

// 테이블 루트. data-sort(지금 보이는 행의 정렬 기준)로 정렬 중인 열을 CSS가 칠한다.
// 행이 정렬 기준을 props로 받지 않아, 정렬을 바꿔도 행(memo)은 다시 그려지지 않고 순서만 바뀐다
const TABLE_GROUP_CLASS = 'group/table';

// @5xl 미만 정렬 중인 칸: 숫자·이름을 primary 글자색 + 숫자 굵게 (배경 없음).
// 선택된 상태 = primary (정렬 시트 radio·필터 checkbox와 같은 색). 행마다 같은 자리라 세로 줄처럼 이어진다.
// 이름(span)은 자기 글자색(text-foreground/70)이 있어 *: 로 자식까지 칠한다.
// Tailwind가 클래스를 찾을 수 있게 능력치마다 문자열을 그대로 적는다
const SORTED_CELL_CLASS: Record<StatKey, string> = {
  total:
    '@max-5xl:group-data-[sort=total]/table:font-semibold @max-5xl:group-data-[sort=total]/table:text-primary-text @max-5xl:group-data-[sort=total]/table:*:text-primary-text',
  hp:
    '@max-5xl:group-data-[sort=hp]/table:font-semibold @max-5xl:group-data-[sort=hp]/table:text-primary-text @max-5xl:group-data-[sort=hp]/table:*:text-primary-text',
  attack:
    '@max-5xl:group-data-[sort=attack]/table:font-semibold @max-5xl:group-data-[sort=attack]/table:text-primary-text @max-5xl:group-data-[sort=attack]/table:*:text-primary-text',
  defense:
    '@max-5xl:group-data-[sort=defense]/table:font-semibold @max-5xl:group-data-[sort=defense]/table:text-primary-text @max-5xl:group-data-[sort=defense]/table:*:text-primary-text',
  specialAttack:
    '@max-5xl:group-data-[sort=specialAttack]/table:font-semibold @max-5xl:group-data-[sort=specialAttack]/table:text-primary-text @max-5xl:group-data-[sort=specialAttack]/table:*:text-primary-text',
  specialDefense:
    '@max-5xl:group-data-[sort=specialDefense]/table:font-semibold @max-5xl:group-data-[sort=specialDefense]/table:text-primary-text @max-5xl:group-data-[sort=specialDefense]/table:*:text-primary-text',
  speed:
    '@max-5xl:group-data-[sort=speed]/table:font-semibold @max-5xl:group-data-[sort=speed]/table:text-primary-text @max-5xl:group-data-[sort=speed]/table:*:text-primary-text',
};

// @5xl 미만 행 grid = 아랫줄 7칸.
// 344px(본문 312px)에서 칸 약 41.1px, 가장 긴 이름 '스피드'(text-xs)는 약 36px
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
