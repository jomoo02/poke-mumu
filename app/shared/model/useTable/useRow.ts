import { useMemo } from 'react';

import type {
  ColumnDef,
  FilterState,
  SortingState,
  Row,
  SelectionState,
} from './type';

export default function useRow<T>({
  data,
  columns,
  sortingState,
  filterState,
  selectionState,
  setSelectionState,
}: {
  data: Array<T & { id: string }>;
  columns: ColumnDef<T>[];
  sortingState: SortingState | undefined;
  filterState: FilterState;

  selectionState: SelectionState;
  setSelectionState: React.Dispatch<React.SetStateAction<SelectionState>>;
}) {
  const rowsState: Row<T>[] = useMemo(() => {
    // 1. 필터 적용
    const filtered = data.filter((row) => {
      // 필터값이 있는 컬럼만 추출
      const filterableColumns = columns.filter(
        (column) => column.filterable && filterState[column.id],
      );

      // 필터값이 하나도 없으면 전체 true
      if (filterableColumns.length === 0) return true;

      // OR 조건: 하나라도 맞으면 true
      return filterableColumns.some((column) => {
        const cell = row[column.id as keyof (T & { id: string })];
        return String(cell)
          .toLowerCase()
          .includes(filterState[column.id].toLowerCase());
      });
    });

    // 2. 정렬 적용
    const sorted = sortingState
      ? [...filtered].sort((a, b) => {
          const { id: activeSortId, isDesc: activeIsDesc } = sortingState;
          const colDef = columns.find((c) => c.id === activeSortId);
          if (!colDef) return 0;
          let result = 0;
          if (colDef.sortFn) result = colDef.sortFn(a, b);
          else {
            const aVal = a[activeSortId as keyof T];
            const bVal = b[activeSortId as keyof T];
            result =
              typeof aVal === 'number' && typeof bVal === 'number'
                ? aVal - bVal
                : String(aVal).localeCompare(String(bVal));
          }
          return activeIsDesc === false ? result : -result;
        })
      : filtered;

    // 3. row 객체화
    return sorted.map((row) => {
      return {
        ...row,
        isSelected: selectionState[row.id] ?? false,
        toggleSelect: () => {
          setSelectionState((prev) => ({
            ...prev,
            [row.id]: !prev[row.id],
          }));
        },
      };
    });
  }, [
    sortingState,
    data,
    columns,
    filterState,
    selectionState,
    setSelectionState,
  ]);

  return {
    rowsState,
  };
}
