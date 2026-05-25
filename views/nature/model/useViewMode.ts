import { useState } from 'react';

export type ViewMode = 'grid' | 'list';

const VIEW_MODES = ['grid', 'list'] as const satisfies readonly ViewMode[];

export const isViewMode = (value: string): value is ViewMode =>
  (VIEW_MODES as readonly string[]).includes(value);

const DEFAULT_VIEW_MODE = 'grid';

export default function useViewMode() {
  const [viewMode, setViewMode] = useState<ViewMode>(DEFAULT_VIEW_MODE);

  const chageViewMode = (mode: string) => {
    if (isViewMode(mode)) {
      setViewMode(mode);
    }
  };

  return {
    viewMode,
    chageViewMode,
  };
}
