'use client';

import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';
import {
  SortByMenu,
  SortMatrixSheet,
  SortRadioSheet,
  SortSplitSheet,
  toSortMatrixOptions,
} from '@/_shared/ui/sort-menu';
// 비교용 페이지라 전국도감 종족값의 정렬 상태·정렬 메뉴(md 이상)를 그대로 쓴다
import {
  SORT_OPTIONS,
  getSortLabel,
  usePokeSort,
} from '@/_pages/pokedex/national-base-stats/model/poke-sort';
import PokeSortMenu from '@/_pages/pokedex/national-base-stats/ui/results/poke-sort-menu';

import type { SortSheetUi } from '../model/use-sort-ui';

const MATRIX_OPTIONS = toSortMatrixOptions(SORT_OPTIONS);

// _shared/ui/sort-menu의 기준 칸과 같은 모양 (방향 칸이 없어 양쪽 모두 둥글다)
const TRIGGER_CLASS = cn(
  'group h-10 gap-1.5 rounded-4xl border border-border pr-3 pl-4 text-sm font-medium text-foreground transition-none',
  'cursor-pointer bg-transparent dark:bg-input/50',
  '[@media(hover:hover)]:hover:bg-muted dark:[@media(hover:hover)]:hover:bg-input/70',
  'active:bg-muted dark:active:bg-input/70',
  'aria-expanded:bg-muted dark:aria-expanded:bg-input/70',
);

interface RadioSortMenuProps {
  sheet: SortSheetUi;
}

/**
 * 정렬 시트 UI (/move와 같은 패턴)
 * - md 미만: [정렬: 스피드 높은 순 ▾] → 바텀시트 (기준은 테이블 머리글과 같은 9개)
 *   - radio: 정렬 방향 / 정렬 기준 radio
 *   - split: 정렬 기준 / 정렬 방향 버튼. 어느 칸을 눌러도 닫힘
 *   - matrix: 기준마다 한 줄 [기준 | 첫 방향 | 반대 방향] 버튼. 한 번 누르면 닫힘
 * - md 이상: 기존 정렬 메뉴 [정렬: 기준 ▾ │ ↓]
 * 정렬 메뉴(menu)면 모든 화면 폭에서 정렬 메뉴(팝오버) 하나
 * 다른 기준을 고르면 그 기준의 첫 방향(번호·이름은 오름차순, 능력치는 내림차순)부터
 */
export default function RadioSortMenu({ sheet }: RadioSortMenuProps) {
  const { sortState, setSort, selectKey, toggleOrder } = usePokeSort();

  const label = getSortLabel(sortState);

  // radio·분리형은 기준·방향을 따로 고른다 (같은 props)
  const KeyDirectionSheet = sheet === 'split' ? SortSplitSheet : SortRadioSheet;

  const trigger = (
    <Button
      type="button"
      aria-label={`정렬: ${label}`}
      className={TRIGGER_CLASS}
    >
      <span className="-mr-0.5 font-normal text-foreground/70">정렬:</span>
      {label}
      <ChevronDownIcon
        aria-hidden
        className="size-4.5 text-foreground/70 transition-transform duration-200 group-data-popup-open:rotate-180"
      />
    </Button>
  );

  if (sheet === 'menu') {
    return (
      <SortByMenu
        options={MATRIX_OPTIONS}
        selectedKey={sortState.sort}
        direction={sortState.order}
        onSelect={(sort, order) => setSort({ sort, order })}
        trigger={trigger}
      />
    );
  }

  return (
    <>
      <div className="md:hidden">
        {sheet === 'matrix' ? (
          <SortMatrixSheet
            options={MATRIX_OPTIONS}
            selectedKey={sortState.sort}
            direction={sortState.order}
            onSelect={(sort, order) => setSort({ sort, order })}
            trigger={trigger}
          />
        ) : (
          <KeyDirectionSheet
            options={SORT_OPTIONS}
            selectedKey={sortState.sort}
            onSelectKey={selectKey}
            direction={sortState.order}
            // 방향은 둘뿐이라 다른 쪽을 고르면 반전
            onSelectDirection={toggleOrder}
            trigger={trigger}
          />
        )}
      </div>
      <div className="hidden md:block">
        <PokeSortMenu />
      </div>
    </>
  );
}
