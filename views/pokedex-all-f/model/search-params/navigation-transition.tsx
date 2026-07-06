'use client';

import {
  createContext,
  useContext,
  useTransition,
  type ReactNode,
} from 'react';

interface NavigationTransitionValue {
  /** 진행 중인 URL 갱신(필터·정렬·페이지·검색)이 있으면 true. */
  isPending: boolean;
  /** URL 갱신을 하나의 공유 transition으로 실행한다. */
  startTransition: (fn: () => void) => void;
}

const NavigationTransitionContext =
  createContext<NavigationTransitionValue | null>(null);

/**
 * 흩어진 트리거(필터/정렬/페이지/검색)의 URL 갱신을 '하나의' useTransition으로 묶는다.
 * useTransition의 isPending은 호출한 컴포넌트 인스턴스에 국한되므로, 컴포넌트마다
 * 두면 신호가 흩어져 "어떤 변경은 dim되고 어떤 건 안 되는" 불일치가 생긴다.
 * 상위에서 한 번 만들어 컨텍스트로 공유해 단일 isPending을 보장한다.
 */
export function NavigationTransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <NavigationTransitionContext.Provider
      value={{ isPending, startTransition }}
    >
      {children}
    </NavigationTransitionContext.Provider>
  );
}

export function useNavigationTransition() {
  const ctx = useContext(NavigationTransitionContext);

  if (!ctx) {
    throw new Error(
      'useNavigationTransition must be used within a NavigationTransitionProvider',
    );
  }
  return ctx;
}
