import { useMemo, useState } from 'react';

import type { Nature } from './nature';
import { NATURE_LIST } from '../config';

const STAT_PRIORITY = {
  attack: 0,
  defense: 1,
  specialAttack: 2,
  specialDefense: 3,
  speed: 4,
} as const;

type DirectionalStat = keyof typeof STAT_PRIORITY;

type DirectionalNature = Nature & {
  increase: DirectionalStat;
  decrease: DirectionalStat;
};

const isDirectional = (n: Nature): n is DirectionalNature =>
  n.increase !== null && n.decrease !== null;

export type SortMode = 'increase' | 'decrease';

const SORT_MODES = [
  'increase',
  'decrease',
] as const satisfies readonly SortMode[];

export const isSortMode = (value: string): value is SortMode =>
  (SORT_MODES as readonly string[]).includes(value);

const sortNatures = (natures: Nature[], mode: SortMode): Nature[] => {
  const secondary: SortMode = mode === 'increase' ? 'decrease' : 'increase';

  const directional: DirectionalNature[] = [];

  const neutral: Nature[] = [];

  for (const nature of natures) {
    if (isDirectional(nature)) {
      directional.push(nature);
    } else {
      neutral.push(nature);
    }
  }

  directional.sort((a, b) => {
    const primaryDiff = STAT_PRIORITY[a[mode]] - STAT_PRIORITY[b[mode]];

    if (primaryDiff !== 0) {
      return primaryDiff;
    }

    return STAT_PRIORITY[a[secondary]] - STAT_PRIORITY[b[secondary]];
  });

  return [...directional, ...neutral];
};

export default function useNature() {
  const [sortMode, setSortMode] = useState<SortMode>('increase');

  const sortedNatures = useMemo(
    () => sortNatures(NATURE_LIST, sortMode),
    [sortMode],
  );

  const changeSortMode = (mode: string) => {
    if (isSortMode(mode)) {
      setSortMode(mode);
    }
  };

  return {
    sortedNatures,
    sortMode,
    changeSortMode,
  };
}
