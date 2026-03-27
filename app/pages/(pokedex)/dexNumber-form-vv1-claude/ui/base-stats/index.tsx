'use client';

import { type StatView } from '../../../dex-number-form-vv1/model';
import BarChart from './bar-chart';

interface BaseStatsProps {
  stats: StatView[] | null;
  rankRatio?: number;
}

export default function BaseStats({ stats, rankRatio }: BaseStatsProps) {
  if (!stats) {
    return (
      <p className="text-sm text-muted-foreground">스탯 정보가 없습니다.</p>
    );
  }

  const baseStats = stats.filter(({ stat }) => stat !== 'total');

  return (
    <div className="flex flex-col gap-3">
      <BarChart baseStats={baseStats} />
      <p className="text-xs text-muted-foreground hidden sm:block break-keep">
        Min/Max는 레벨 100 기준 — Max: 유리한 성격·노력치 252·개체값 31,
        Min: 불리한 성격·노력치 0·개체값 0
      </p>
    </div>
  );
}
