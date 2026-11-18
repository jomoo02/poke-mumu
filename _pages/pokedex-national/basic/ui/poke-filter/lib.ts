import type { FilterConfig } from '../../model/poke-filter';

export const getTriggerText = (config: FilterConfig, selected: string[]) => {
  const selectedLabels = selected
    .map(
      (identifier) =>
        config.items.find((item) => item.identifier === identifier)?.label,
    )
    .filter((label): label is string => Boolean(label));

  return selectedLabels.length === 0
    ? `${config.title}: ${config.defaultTriggerLabel}`
    : `${config.title}: ${selectedLabels.join(', ')}`;
};

type FilterColumns = NonNullable<FilterConfig['columns']>;

// columns(최대 열 수) → 레이아웃. desktop은 그리드+팝오버 폭, mobile은 그리드만.
// mobile은 항상 최대 2열로 클램프한다.
const DESKTOP_COLUMN_PRESET: Record<
  FilterColumns,
  { grid: string; width: string }
> = {
  1: { grid: '', width: 'w-58 max-h-100' },
  2: { grid: 'grid grid-cols-2', width: 'w-114 max-h-100' },
  3: {
    grid: 'grid grid-cols-2 lg:grid-cols-3',
    width: 'w-114 lg:w-170 max-h-100',
  },
};

const MOBILE_COLUMN_PRESET: Record<FilterColumns, string> = {
  1: '',
  2: 'grid-cols-2',
  3: 'grid-cols-2',
};

export const getDesktopColumn = (columns: FilterConfig['columns']) =>
  DESKTOP_COLUMN_PRESET[columns ?? 1];

export const getMobileColumn = (columns: FilterConfig['columns']) =>
  MOBILE_COLUMN_PRESET[columns ?? 1];
