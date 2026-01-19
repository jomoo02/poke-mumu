export type SortDirection = 'asc' | 'desc';

export type ColumnSort = {
  id: string;
  isDesc: boolean;
};

export type SortingState = { id: string; isDesc: boolean };
export type FilterState = Record<string, string>;
export type VisibilityState = Record<string, boolean>;
export type SelectionState = Record<string, boolean>;

export type Column = {
  id: string;
  getSortedDirection: () => 'asc' | 'desc' | null;
  getIsSorted: () => boolean;
  toggleSorting: () => void;
  setFilterValue: (val: string) => void;
  getFilterValue: () => string;
  getIsVisible: () => boolean;
  toggleVisibility: () => void;
  getCanHide: () => boolean;
};

export type Row<T> = T & {
  id: string;
  isSelected: boolean;
  toggleSelect: () => void;
};

export type Table = {
  toggleAllPageRowsSelected: (v: boolean) => void;
  getIsAllRowsSelected: () => boolean;
  getIsSomeRowSelected: () => boolean;
};

export type ColumnDef<T> = {
  id: string;
  header: (opts: {
    column: Column;
    table: Table;
    content?: string;
  }) => React.ReactNode;
  cell: (ctx: { row: Row<T> }) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  enableHide?: boolean;
  sortFn?: (a: T, b: T) => number;
};
