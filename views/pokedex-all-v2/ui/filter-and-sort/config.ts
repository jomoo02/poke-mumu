import { useEffect, useState } from 'react';

type Tab = 'type' | 'sort';

const TABS: { id: Tab; label: string }[] = [
  { id: 'type', label: '타입 필터' },
  { id: 'sort', label: '정렬 기준' },
];

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);
  return matches;
}

export { type Tab, TABS, useMediaQuery };
