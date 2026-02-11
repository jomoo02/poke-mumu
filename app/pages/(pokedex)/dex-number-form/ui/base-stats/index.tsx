'use client';

import { type StatView, getRaderChartOrder } from '../../model';
import BarChart from './bar-chart';
import RaderChart from './rader-chart';
import TotalDonut from './total';

interface BaseStatsProps {
  stats: StatView[] | null;
  rankRatio?: number;
}

export default function BaseStats({ stats, rankRatio }: BaseStatsProps) {
  if (!stats) {
    return <div>스탯 정보가 없습니다</div>;
  }

  const baseStats = stats.filter(({ stat }) => stat !== 'total');

  const totalStat = stats.find(({ stat }) => stat === 'total');

  return (
    <div className="grid lg:grid-cols-2 gap-6 auto-rows-[1fr]">
      <div className="border rounded-xl shadow-sm overflow-hidden">
        <div className="py-2 px-4 bg-muted/70">종족값</div>
        <BarChart baseStats={baseStats} />
      </div>

      <div className="h-full flex flex-col border rounded-xl shadow-sm overflow-hidden">
        <h3 className="py-2 border-b px-4 bg-muted/70">총합</h3>
        <div className=" flex justify-center items-center w-full flex-1 p-6">
          {totalStat?.value && rankRatio !== undefined && (
            <TotalDonut
              value={totalStat.value}
              max={780}
              rankRatio={Math.max(1, rankRatio)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
