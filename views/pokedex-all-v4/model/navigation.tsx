'use client';

import {
  createContext,
  useContext,
  useTransition,
  type ReactNode,
} from 'react';

interface NavigationContextValue {
  isPending: boolean;
  start: (fn: () => void) => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

// 필터·정렬·페이지 이동을 하나의 transition으로 공유한다.
// 컴포넌트마다 useTransition을 따로 두면 isPending이 격리되어
// "어떤 네비게이션은 dim되고 어떤 건 안 되는" 불일치가 생기므로 컨텍스트로 묶는다.
export function NavigationProvider({ children }: { children: ReactNode }) {
  const [isPending, startTransition] = useTransition();

  return (
    <NavigationContext.Provider value={{ isPending, start: startTransition }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return ctx;
}
