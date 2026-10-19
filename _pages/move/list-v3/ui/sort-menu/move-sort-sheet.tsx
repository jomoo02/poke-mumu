'use client';

import type { ReactElement } from 'react';

import {
  SortMatrixSheet,
  SortRadioSheet,
  SortSplitSheet,
} from '@/_shared/ui/sort-menu';
import { SORT_OPTIONS, useMoveSort } from '@/_pages/move/list/model/move-sort';

import { useSortSheetUi } from '../../model/use-sort-sheet-ui';
import { MOVE_SORT_MATRIX_OPTIONS } from '../../model/move-sort-option';

interface MoveSortSheetProps {
  trigger: ReactElement;
}

/**
 * md 미만 정렬 시트 (비교용 ?sortui=). 기준은 테이블 머리글과 같은 항목이고, 같은 URL 상태(useMoveSort)를 쓴다.
 * radio·분리형: 다른 기준을 고르면 그 기준의 첫 방향(번호·이름은 오름차순, 수치는 내림차순)부터
 */
export default function MoveSortSheet({ trigger }: MoveSortSheetProps) {
  const { sortSheetUi } = useSortSheetUi();

  const { sortState, setSort, selectKey, toggleOrder } = useMoveSort();

  if (sortSheetUi === 'matrix') {
    return (
      <SortMatrixSheet
        options={MOVE_SORT_MATRIX_OPTIONS}
        selectedKey={sortState.sort}
        direction={sortState.order}
        onSelect={(sort, order) => setSort({ sort, order })}
        trigger={trigger}
      />
    );
  }

  const Sheet = sortSheetUi === 'split' ? SortSplitSheet : SortRadioSheet;

  return (
    <Sheet
      options={SORT_OPTIONS}
      selectedKey={sortState.sort}
      onSelectKey={selectKey}
      direction={sortState.order}
      // 방향은 둘뿐이라 다른 쪽을 고르면 반전
      onSelectDirection={toggleOrder}
      trigger={trigger}
    />
  );
}
