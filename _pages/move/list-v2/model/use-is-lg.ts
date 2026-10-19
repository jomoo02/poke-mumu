'use client';

import { useSyncExternalStore } from 'react';

// Tailwind lg 기준(64rem)
const LG_QUERY = '(min-width: 64rem)';

const subscribe = (onChange: () => void) => {
  const query = window.matchMedia(LG_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};

const getSnapshot = () => window.matchMedia(LG_QUERY).matches;

// 서버엔 화면 폭이 없어 lg 미만으로 그린다. hydration은 이 값으로 맞춘 뒤 실제 값으로 다시 그린다
const getServerSnapshot = () => false;

/**
 * lg 이상인지. 행 높이처럼 JS(가상화 간격)가 알아야 하는 값에만 쓴다.
 * 화면 모양 자체는 CSS(lg:)로 나눈다
 */
export function useIsLg() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
