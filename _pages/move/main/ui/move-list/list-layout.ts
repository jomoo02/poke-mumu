// 카드 목록 격자 (목록·skeleton이 같이 쓴다). 간격은 특성·전국도감 종족값 카드 목록과 같다.
// 화면이 넓어지면(sm 이상) 두 줄로
const LIST_GRID_CLASS = 'grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6';

// 카드 껍데기 (목록·skeleton이 같이 쓴다). 특성 카드(h-14 px-4 rounded-2xl)와 같은 모양에 수치 줄만 더한다.
// 위아래 여백 py-3.5: 첫 줄(아이콘 28px)이 특성 카드 한 줄(56px)과 같은 자리에 온다
const CARD_CLASS =
  'flex flex-col gap-y-3.5 px-4 py-3.5 justify-center rounded-2xl bg-card border';

// 첫 줄: 특성 카드 한 줄과 같은 간격
const FIRST_ROW_CLASS = 'flex min-w-0 items-center gap-x-3.5';

// 번호 칸: 특성 카드와 같다 (세 자리 번호 폭으로 고정해 위아래 카드의 이름 시작선이 맞는다)
const NUMBER_CLASS =
  'w-9 shrink-0 text-sm font-medium tabular-nums text-foreground/70';

// 수치 줄: '위력 40'처럼 이름·값을 칩 하나로 묶어 늘어놓는다 (칩 높이 26px, 폭은 내용만큼)
const STAT_ROW_CLASS = 'flex gap-x-3 text-sm';

const STAT_ITEM_CLASS =
  'flex w-fit gap-1.5 bg-muted/70 dark:bg-muted rounded-lg py-0.75 px-2.5';

export {
  LIST_GRID_CLASS,
  CARD_CLASS,
  FIRST_ROW_CLASS,
  NUMBER_CLASS,
  STAT_ROW_CLASS,
  STAT_ITEM_CLASS,
};
