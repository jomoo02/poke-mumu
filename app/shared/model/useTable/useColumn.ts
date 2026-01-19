import { useCallback, useMemo } from 'react';

import type {
  Column,
  ColumnDef,
  SortingState,
  VisibilityState,
  FilterState,
} from './type';

export default function useColumn<T>({
  columnDefs,
  sortingState,
  setSortingState,
  visibilityState,
  setVisibilityState,
  filterState,
  setFilterState,
  table,
}: {
  columnDefs: ColumnDef<T>[];
  sortingState?: SortingState | undefined;
  setSortingState: React.Dispatch<
    React.SetStateAction<SortingState | undefined>
  >;
  visibilityState: VisibilityState;
  setVisibilityState: React.Dispatch<React.SetStateAction<VisibilityState>>;
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  table: {
    toggleAllPageRowsSelected: (value: boolean) => void;
    getIsAllRowsSelected: () => boolean;
    getIsSomeRowSelected: () => boolean;
  };
}) {
  const columnsState = useMemo(() => {
    return columnDefs.map((colDef) => {
      const id = colDef.id;

      const getSortedDirection = () => {
        if (!getIsSorted()) {
          return null;
        }
        return sortingState?.isDesc ? 'desc' : 'asc';
      };

      const getIsSorted = () => sortingState?.id === id;

      const toggleSorting = () => {
        if (!colDef.sortable) return;

        const nextSortingState =
          sortingState?.id === id
            ? { ...sortingState, isDesc: !sortingState.isDesc }
            : { id, isDesc: false };

        setSortingState(nextSortingState);
      };

      const getFilterValue = () => filterState[id] ?? '';

      const setFilterValue = (val: string) => {
        if (colDef.filterable) {
          setFilterState((prev) => ({ ...prev, [id]: val }));
        }
      };

      const getIsVisible = () => visibilityState[id] ?? true;

      const toggleVisibility = () => {
        if (colDef.enableHide) {
          setVisibilityState((prev) => ({ ...prev, [id]: !prev[id] }));
        }
      };

      const getCanHide = () => colDef?.enableHide || false;

      const column: Column = {
        id,
        toggleSorting,
        getIsSorted,
        getIsVisible,
        getFilterValue,
        setFilterValue,
        toggleVisibility,
        getSortedDirection,
        getCanHide,
      };

      return {
        ...column,
        render: (content?: string) =>
          colDef.header({
            column,
            table,
            content,
          }),
        cell: colDef.cell,
      };
    });
  }, [
    columnDefs,
    sortingState,
    setSortingState,
    filterState,
    setFilterState,
    visibilityState,
    setVisibilityState,
    table,
  ]);

  // const visibieColumns = useMemo(
  //   () => columnsState.filter((column) => visibilityState[column.id]),
  //   [columnsState, visibilityState],
  // );

  const getColumn = useCallback(
    (columnId: string) => columnsState.find(({ id }) => id === columnId),
    [columnsState],
  );

  const getVisibleColumns = useCallback(
    () => columnsState.filter((col) => visibilityState[col.id]),
    [columnsState, visibilityState],
  );

  return {
    columnsState,
    getColumn,
    getVisibleColumns,
  };
}
