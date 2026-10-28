import type { CSSProperties } from 'react';

import {
  STAT_KEYS,
  STAT_LABEL,
  type StatKey,
} from '../../model/base-stats-poke';
import type { SortKey } from '../../model/poke-sort';

/*
 * 넓은 본문(@5xl 이상) 표 레이아웃. 한 줄 11칸 grid(--table-cols).
 * 도감번호 열은 스프라이트·번호 두 칸이다 (머리글은 두 칸에 걸친다)
 */

type StatTableColumnId = 'dexNumber' | 'name' | 'type' | StatKey;

// 머리글이 읽는 열 정보 (행은 열마다 직접 그린다)
interface StatTableColumn {
  id: StatTableColumnId;
  // 머리글 글자. 넓은 본문이라 줄이지 않는다 (특수공격 · 특수방어)
  header: string;
  // 머리글·셀 가로 정렬. 숫자 열은 오른쪽(자릿수 끝을 맞춘다)
  align: 'left' | 'right';
  // 있으면 머리글로 정렬할 수 있다
  sortKey?: SortKey;
}

// 도감번호는 '#' 대신 이름으로 (번호만으로는 무엇의 번호인지 애매하다)
const INFO_COLUMNS: readonly StatTableColumn[] = [
  { id: 'dexNumber', header: '도감번호', align: 'left', sortKey: 'dexNumber' },
  { id: 'name', header: '이름', align: 'left', sortKey: 'name' },
  // 정렬 없음. 타입 아이콘도 칸 왼쪽에서 시작해 머리글 글자와 시작선이 맞는다
  { id: 'type', header: '타입', align: 'left' },
];

// 능력치 7열: 게임 표시 순서(HP … 스피드) → 총합 (STAT_KEYS 순서. 카드 칸·정렬 시트와 같다)
const STAT_COLUMNS: readonly StatTableColumn[] = STAT_KEYS.map((key) => ({
  id: key,
  header: STAT_LABEL[key],
  align: 'right',
  sortKey: key,
}));

// 열 너비 (grid 트랙)
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

// 머리글·행이 함께 쓰는 grid (기존 테이블의 gap-3)
const GRID_CLASS = 'grid grid-cols-(--table-cols) items-center gap-3';

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
  TABLE_VARS,
  GRID_CLASS,
  HEADER_ROW_CLASS,
  HEAD_CELL_CLASS,
  SORTABLE_HEAD_ALIGN_CLASS,
};
