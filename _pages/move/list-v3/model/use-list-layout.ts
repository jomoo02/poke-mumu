'use client';

import { useSyncExternalStore } from 'react';

// Tailwind lg 기준(64rem). 이 폭부터 테이블, 미만은 카드
const LG_QUERY = '(min-width: 64rem)';

type ListLayout = 'table' | 'cards' | 'both';

const subscribe = (onChange: () => void) => {
  const query = window.matchMedia(LG_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};

const getSnapshot = (): ListLayout =>
  window.matchMedia(LG_QUERY).matches ? 'table' : 'cards';

// 서버엔 화면 폭이 없어 둘 다 그리고 CSS(lg:)로 하나만 보인다. hydration도 이 값으로 맞춘다
const getServerSnapshot = (): ListLayout => 'both';

/**
 * 결과를 테이블·카드 중 무엇으로 그릴지.
 * 902개를 둘 다 그리면 정렬·필터마다 React가 두 배를 다시 그리므로, hydration 뒤엔 보이는 쪽만 그린다.
 * 첫 화면(서버 HTML·hydration)은 'both'라 화면 폭과 관계없이 바로 맞는 모양이 보인다
 */
export function useListLayout() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
