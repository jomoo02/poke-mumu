'use client';

import { cn } from '@/app/shared/lib/cn';
import { type StatView, getRaderChartOrder } from '../../model';
import BarChart from './bar-chart';
import RaderChart from './rader-chart';
import TotalDonut from './total';

// import { useSidebar } from '@/app/shared/ui/sidebar';

interface BaseStatsProps {
  stats: StatView[] | null;
  rankRatio?: number;
}

export default function BaseStats({ stats, rankRatio }: BaseStatsProps) {
  // const { open } = useSidebar();
  if (!stats) {
    return <div>스탯 정보가 없습니다</div>;
  }

  const baseStats = stats.filter(({ stat }) => stat !== 'total');

  const totalStat = stats.find(({ stat }) => stat === 'total');

  return (
    <div className="">
      <div className="flex flex-col gap-6">
        <BarChart baseStats={baseStats} />
        <div className="text-muted-foreground rounded-xl hidden sm:block text-divretty break-keep">
          <p> 오른쪽 범위(Min, Max)는 레벨 100 기준 능력치입니다.</p>
          <p>
            Max는 유리한 성격, 노력치 252, 개체값 31 기준이며, Min은 불리한
            성격, 노력치 0, 개체값 0 기준입니다.
          </p>
        </div>
      </div>
    </div>
  );
}
