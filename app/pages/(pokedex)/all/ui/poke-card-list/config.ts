import { useLayoutEffect, useState } from 'react';

// const CARD_HEIGHT = 393;
const CARD_HEIGHT = 420;
const GAP = 24; // gap-6 = 1.5rem = 24px

const BREAKPOINTS = [
  { query: '(min-width: 1280px)', cols: 4 },
  { query: '(min-width: 1024px)', cols: 3 },
  { query: '(min-width: 640px)', cols: 2 },
] as const;

const getColCount = (): number => {
  for (const { query, cols } of BREAKPOINTS) {
    if (window.matchMedia(query).matches) return cols;
  }
  return 1;
};

const chunk = <T>(arr: T[], size: number): T[][] => {
  const rows: T[][] = [];

  for (let i = 0; i < arr.length; i += size) {
    rows.push(arr.slice(i, i + size));
  }

  return rows;
};

function useGridCols() {
  const [cols, setCols] = useState<number>(1);

  useLayoutEffect(() => {
    // 초기값 설정
    setCols(getColCount());

    const mqls = BREAKPOINTS.map(({ query }) => {
      const mql = window.matchMedia(query);
      const onChange = () => setCols(getColCount());
      mql.addEventListener('change', onChange);
      return { mql, onChange };
    });

    return () => {
      mqls.forEach(({ mql, onChange }) => {
        mql.removeEventListener('change', onChange);
      });
    };
  }, []);

  return cols;
}

export { CARD_HEIGHT, GAP, BREAKPOINTS, getColCount, chunk, useGridCols };
