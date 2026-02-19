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
    // <div className="bg-muted/50 p-6 rou">
    //   <h3 className="text-2xl font-semibold mb-6">스탯</h3>
    //   <div className="max-w-xl ">
    //     <BarChart baseStats={baseStats} />
    //   </div>
    // </div>
    <div className="">
      {/* <div className={cn('grid gap-6 auto-rows-[1fr] md:grid-cols-2')}> */}
      <div className="flex flex-col gap-6">
        {/* <div className="grid grid-cols-3 sm:grid-cols-7 gap-1 overflow-hidden">
          {baseStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="bg-muted/70 p-2 border">{stat.label}</div>

              <div className="p-2 border border-t-0">{stat.value}</div>
            </div>
          ))}
          <div className="text-center col-span-3 sm:col-span-1">
            <div className="p-2 bg-muted/70">{totalStat?.label}</div>
            <div className="p-2">{totalStat?.value}</div>
          </div>
        </div> */}
        <BarChart baseStats={baseStats} />
        <p className="text-muted-foreground rounded-xl hidden sm:block text-pretty break-keep">
          <p> 오른쪽 범위(Min, Max)는 레벨 100 기준 능력치입니다.</p>
          <p>
            Max는 유리한 성격, 노력치 252, 개체값 31 기준이며, Min은 불리한
            성격, 노력치 0, 개체값 0 기준입니다.
          </p>
        </p>
        {/* <div className=" overflow-hidden   rounded-xl grid lg:grid-cols-2 gap-6">
          <div className=" flex flex-col items-center max-w-md mx-auto">
            {' '}
            <div className="w-full mb-2 text-lg font-medium  text-center">
              종족값
            </div>
            <BarChart baseStats={baseStats} />
          </div> */}
        {/* 
          <div
            className="h-full flex flex-col w-full 
          "
          >
            <div className="font-medium pb-2  max-w-md mx-auto">총합</div>
            <div className=" flex justify-center items-center w-full flex-1 p-6  max-w-md bg-card mx-auto">
              {totalStat?.value && rankRatio !== undefined && (
                <TotalDonut
                  value={totalStat.value}
                  max={780}
                  rankRatio={Math.max(1, rankRatio)}
                />
              )}
            </div>
          </div> */}
      </div>
    </div>
  );
}
