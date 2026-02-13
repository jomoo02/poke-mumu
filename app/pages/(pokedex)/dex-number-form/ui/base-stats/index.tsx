'use client';

import { cn } from '@/app/shared/lib/cn';
import { type StatView, getRaderChartOrder } from '../../model';
import BarChart from './bar-chart';
import RaderChart from './rader-chart';
import TotalDonut from './total';

import { useSidebar } from '@/app/shared/ui/sidebar';

interface BaseStatsProps {
  stats: StatView[] | null;
  rankRatio?: number;
}

export default function BaseStats({ stats, rankRatio }: BaseStatsProps) {
  const { open } = useSidebar();
  if (!stats) {
    return <div>스탯 정보가 없습니다</div>;
  }

  const baseStats = stats.filter(({ stat }) => stat !== 'total');

  const totalStat = stats.find(({ stat }) => stat === 'total');

  return (
    <BarChart baseStats={baseStats} />
    // <div
    //   className={cn(
    //     'grid gap-6 auto-rows-[1fr] 2xl:grid-cols-3',
    //     open ? 'lg:grid-cols-2' : 'lg:grid-cols-3',
    //   )}
    // >
    //   <div className="border rounded-2xl shadow-sm overflow-hidden">
    //     <div className="p-6 pb-4 font-medium">종족값</div>
    //     <BarChart baseStats={baseStats} />
    //   </div>

    //   <div className="h-full flex flex-col border rounded-2xl shadow-sm overflow-hidden">
    //     <div className="p-6 pb-4 font-medium">총합</div>
    //     <div className=" flex justify-center items-center w-full flex-1 p-6">
    //       {totalStat?.value && rankRatio !== undefined && (
    //         <TotalDonut
    //           value={totalStat.value}
    //           max={780}
    //           rankRatio={Math.max(1, rankRatio)}
    //         />
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
}
