import type { MoveFilterConfig } from './filter-config';

type FilterColumns = MoveFilterConfig['columns'];

// columns(최대 열 수) → 레이아웃. national 도감 필터와 같은 프리셋
// - popover: 그리드 + 폭. 3열은 lg부터(md~lg는 폭이 좁아 2열)
// - sheet: 화면이 좁아 최대 2열
const DESKTOP_LAYOUT: Record<FilterColumns, { grid: string; width: string }> = {
  1: { grid: '', width: 'w-58 max-h-100' },
  2: { grid: 'grid grid-cols-2', width: 'w-114 max-h-100' },
  3: {
    grid: 'grid grid-cols-2 lg:grid-cols-3',
    width: 'w-114 lg:w-170 max-h-100',
  },
};

const MOBILE_GRID: Record<FilterColumns, string> = {
  1: '',
  2: 'grid-cols-2',
  3: 'grid-cols-2',
};

const getDesktopLayout = (columns: FilterColumns) => DESKTOP_LAYOUT[columns];

const getMobileGrid = (columns: FilterColumns) => MOBILE_GRID[columns];

export { getDesktopLayout, getMobileGrid };
