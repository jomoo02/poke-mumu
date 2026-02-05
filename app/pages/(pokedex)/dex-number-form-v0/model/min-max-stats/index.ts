'use client';

import { useMemo, useState } from 'react';

import {
  calculateMaxStatValue,
  calculateMinStatValue,
} from '@/app/entities/stats/lib';

import { StatView } from '../base-stats';

export type StatLevel = '50' | '100';

export function useMinMaxStats(stats: StatView[]) {
  const [level, setLevel] = useState<StatLevel>('50');
  const levels: StatLevel[] = ['50', '100'];

  const statsMinMax = useMemo(() => {
    const targetLevel = Number(level);

    return stats.map(({ stat, value, label }) => {
      const max = calculateMaxStatValue(stat, value, targetLevel);
      const min = calculateMinStatValue(stat, value, targetLevel);
      return {
        max,
        min,
        stat,
        label,
      };
    });
  }, [level, stats]);

  return {
    level,
    levels,
    setLevel,
    statsMinMax,
  };
}
