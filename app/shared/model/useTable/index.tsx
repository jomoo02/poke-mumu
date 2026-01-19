import { useCallback, useEffect, useMemo, useState } from 'react';

import type {
  ColumnDef,
  FilterState,
  SortingState,
  VisibilityState,
  SelectionState,
} from './type';
import useColumn from './useColumn';
import useRow from './useRow';

type Options<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  sorting?: SortingState;
  setSorting?: React.Dispatch<React.SetStateAction<SortingState>>;
  getRowId?: (row: T) => string;
};

export default function useTable<T>({
  data,
  columns,
  getRowId,
  sorting,
  setSorting,
}: Options<T>) {
  const initialFilterState: FilterState = columns.reduce((acc, col) => {
    acc[col.id] = '';
    return acc;
  }, {} as FilterState);

  const initialVisibilityState: VisibilityState = columns.reduce((acc, col) => {
    acc[col.id] = true;
    return acc;
  }, {} as VisibilityState);

  const [sortingState, setSortingState] = useState<SortingState | undefined>(
    sorting,
  );

  const [filterState, setFilterState] =
    useState<FilterState>(initialFilterState);

  const [visibilityState, setVisibilityState] = useState<VisibilityState>(
    initialVisibilityState,
  );

  const dataWithId = useMemo(() => {
    return data.map((row, i) => ({
      ...row,
      id: getRowId ? getRowId(row) : String(i),
    }));
  }, [data, getRowId]);

  const [selectionState, setSelectionState] = useState<SelectionState>(() =>
    Object.fromEntries(dataWithId.map(({ id }) => [id, false])),
  );

  const toggleAllPageRowsSelected = useCallback((value: boolean) => {
    setSelectionState((prev) => {
      const next = Object.keys(prev).reduce((acc, id) => {
        acc[id] = value;
        return acc;
      }, {} as SelectionState);
      return next;
    });
  }, []);

  const getIsAllRowsSelected = useCallback(
    () =>
      Object.values(selectionState).length > 0 &&
      Object.values(selectionState).every(Boolean),
    [selectionState],
  );

  const getIsSomeRowSelected = useCallback(
    () => Object.values(selectionState).some(Boolean),
    [selectionState],
  );

  const tableApi = useMemo(
    () => ({
      toggleAllPageRowsSelected,
      getIsAllRowsSelected,
      getIsSomeRowSelected,
    }),
    [toggleAllPageRowsSelected, getIsAllRowsSelected, getIsSomeRowSelected],
  );

  const { columnsState, getColumn, getVisibleColumns } = useColumn({
    sortingState,
    setSortingState,
    filterState,
    setFilterState,
    visibilityState,
    setVisibilityState,
    columnDefs: columns,
    table: tableApi,
  });

  const { rowsState } = useRow({
    columns,
    sortingState,
    filterState,
    selectionState,
    setSelectionState,
    data: dataWithId,
  });

  useEffect(() => {
    if (setSorting && sortingState) {
      setSorting(sortingState);
    }
  }, [setSorting, sortingState]);

  return {
    columns: columnsState,
    rows: rowsState,
    getColumn,
    toggleAllPageRowsSelected,
    getVisibleColumns,
  };
}

export {
  type ColumnDef,
  type FilterState,
  type SortingState,
  type VisibilityState,
  type SelectionState,
} from './type';
