'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
  useLayoutEffect,
} from 'react';

type ViewMode = 'grid' | 'list';

interface ViewModeContextValue {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const ViewModeContext = createContext<ViewModeContextValue | null>(null);

export function ViewModeProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewModeState] = useState<ViewMode>('grid');
  const [hydrated, setHydrated] = useState(false);

  // useLayoutEffect(() => {
  //   const stored = localStorage.getItem('pokedex-view-mode');
  //   if (stored === 'grid' || stored === 'list') {
  //     setViewModeState(stored);
  //   }
  //   // setHydrated(true);
  // }, []);

  // const setViewMode = useCallback((mode: ViewMode) => {
  //   setViewModeState(mode);
  //   localStorage.setItem('pokedex-view-mode', mode);
  // }, []);

  // SSR 중에는 기본값(grid)으로 렌더, hydration 후 localStorage 값 반영
  return (
    <ViewModeContext.Provider
      value={{ viewMode, setViewMode: setViewModeState }}
    >
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  const ctx = useContext(ViewModeContext);
  if (!ctx) {
    throw new Error('useViewMode must be used within ViewModeProvider');
  }
  return ctx;
}
