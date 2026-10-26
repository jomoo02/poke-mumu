import type { CSSProperties } from 'react';

import {
  STAT_KEYS,
  STAT_LABEL,
  type StatKey,
} from '../../model/base-stats-poke';
import type { SortKey } from '../../model/poke-sort';

/*
 * 레이아웃. 화면 폭이 아닌 본문 폭(@container, @5xl = 1024px)으로 나눈다
 * - @5xl 이상: 한 줄 11칸 grid(--table-cols). 도감번호 열이 스프라이트·번호 두 칸이다
 * - @5xl 미만: 2줄 카드. [스프라이트 타일 | 번호 | 이름 / 모습 | 타입] / 능력치 7칸(HP 공격 방어 특공 특방 스피드 총합).
 *   머리글 없이 칸마다 능력치 이름(text-xs)을 숫자 위에 둔다. 정렬은 결과 줄의 정렬 시트
 */

type StatTableColumnId = 'dexNumber' | 'name' | 'type' | StatKey;

// 넓은 본문 머리글이 읽는 열 정보 (행은 열마다 직접 그린다)
interface StatTableColumn {
  id: StatTableColumnId;
  // 머리글 글자. 넓은 본문이라 줄이지 않는다 (특수공격 · 특수방어)
  header: string;
  // 머리글·셀 가로 정렬. 숫자 열은 오른쪽(자릿수 끝을 맞춘다)
  align: 'left' | 'right';
  // 있으면 머리글로 정렬할 수 있다
  sortKey?: SortKey;
}

// 포켓몬 정보 열 (@5xl 미만에선 행 윗줄 하나로 합쳐진다).
// 도감번호는 '#' 대신 이름으로 (번호만으로는 무엇의 번호인지 애매하다)
const INFO_COLUMNS: readonly StatTableColumn[] = [
  { id: 'dexNumber', header: '도감번호', align: 'left', sortKey: 'dexNumber' },
  { id: 'name', header: '이름', align: 'left', sortKey: 'name' },
  // 정렬 없음. 타입 아이콘도 칸 왼쪽에서 시작해 머리글 글자와 시작선이 맞는다
  { id: 'type', header: '타입', align: 'left' },
];

// 능력치 7열: 게임 표시 순서(HP … 스피드) → 총합 (STAT_KEYS 순서. 넓은 본문 열·좁은 본문 카드 칸·정렬 시트 모두 같다)
const STAT_COLUMNS: readonly StatTableColumn[] = STAT_KEYS.map((key) => ({
  id: key,
  header: STAT_LABEL[key],
  align: 'right',
  sortKey: key,
}));

// 행 높이 (border 1 포함)
// - @5xl 이상: 스프라이트(size-12.5, 50)가 셀 패딩 28 + 숫자 줄보다 작아 셀 높이(68) + 1
// - @5xl 미만: py-3 24 + 윗줄 스프라이트 타일(size-16, 64) + gap-y-5 20
//   + 능력치 칸(py-0.5 4 + 이름 text-xs 16 + 숫자 text-sm 20) + 1
// 행 크기·위치·바디 높이는 CSS 변수 --row-h로 그려 서버 HTML(본문 폭을 모름)부터 맞는다.
// JS는 이 값을 읽어(useCssRowHeight) 가상화가 보이는 범위를 고르는 데만 쓴다
const ROW_HEIGHT = { narrow: 149, wide: 69 } as const;

// 테이블 루트에 둔다 (@container 안이어야 한다)
const ROW_HEIGHT_VARS_CLASS = '[--row-h:149px] @5xl:[--row-h:69px]';

// @5xl 이상 열 너비 (grid 트랙). 도감번호 열 하나를 스프라이트·번호 두 칸으로 나눈다 (머리글은 두 칸에 걸친다):
// 좁은 본문에선 번호가 타일과 이름 사이의 따로 된 칸이라, 같은 요소를 쓰려면 넓은 본문에서도 따로 칸이어야 한다
// - 스프라이트: 열 왼쪽 여백 14 + size-12.5(50) / 번호: 네 자리 숫자(text-md) 약 40 + 여유 4 (이미지에 8px로 붙인다)
// - 이름 2 : 타입 1 : 능력치 0.75 비율로 남는 폭을 나눈다
// - 능력치 최소 폭: 머리글이 줄이지 않은 이름(특수공격 ▴▾, 버튼 약 85px)이라 두 열을 넓히고,
//   머리글이 짧은 열(HP·총합·공격·방어·스피드)에서 그만큼 줄여 합계(564px)를 맞춘다
//   (본문 1024px에서 표가 넘치지 않게). 셀 패딩 28 + 머리글 버튼 글자·삼각형 폭이 기준
const STAT_MIN_WIDTH: Record<StatKey, number> = {
  total: 72,
  hp: 64,
  attack: 72,
  defense: 72,
  specialAttack: 100,
  specialDefense: 100,
  speed: 84,
};

const getColumnTrack = (id: StatTableColumnId): string => {
  switch (id) {
    case 'dexNumber':
      return '64px 44px';
    case 'name':
      return 'minmax(120px,2fr)';
    case 'type':
      return 'minmax(88px,1fr)';
    default:
      return `minmax(${STAT_MIN_WIDTH[id]}px,0.75fr)`;
  }
};

const TABLE_VARS = {
  '--table-cols': [...INFO_COLUMNS, ...STAT_COLUMNS]
    .map((column) => getColumnTrack(column.id))
    .join(' '),
} as CSSProperties;

// @5xl 미만 윗줄: [스프라이트 타일 | 번호 | 이름 / 모습 | 타입]
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
  hp: '@max-5xl:group-data-[sort=hp]/table:font-semibold @max-5xl:group-data-[sort=hp]/table:text-primary-text @max-5xl:group-data-[sort=hp]/table:*:text-primary-text',
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

// @5xl 이상 한 줄 11칸 grid (기존 테이블의 gap-3)
const WIDE_GRID_CLASS =
  '@5xl:grid-cols-(--table-cols) @5xl:items-center @5xl:gap-3';

// _shared/ui/data-table/table-layout.ts와 같은 값 (공개 API가 아니라 복사)
const HEADER_ROW_CLASS =
  'h-11 rounded-sm bg-muted text-sm font-medium whitespace-nowrap text-foreground/70';

const HEAD_CELL_CLASS = 'px-3.5';

// 머리글 정렬 버튼의 가로 정렬 (열의 정렬을 따른다: 숫자 열은 이름·삼각형이 숫자 바로 위)
const SORTABLE_HEAD_ALIGN_CLASS: Record<StatTableColumn['align'], string> = {
  left: '',
  right: 'flex justify-end',
};

export type { StatTableColumn };

export {
  INFO_COLUMNS,
  STAT_COLUMNS,
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
  SORTABLE_HEAD_ALIGN_CLASS,
};
