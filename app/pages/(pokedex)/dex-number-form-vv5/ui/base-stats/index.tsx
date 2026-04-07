'use client';

import { cn } from '@/app/shared/lib/cn';
import { type StatView, getRaderChartOrder } from '../../model';
import BarChart from './bar-chart';
import RaderChart from './rader-chart';
import TotalDonut from './total';
import MinMaxStats from '../min-max-stats';
import { useState } from 'react';
import { Button } from '@/app/shared/ui/button';

// import { useSidebar } from '@/app/shared/ui/sidebar';

interface BaseStatsProps {
  stats: StatView[] | null;
  rankRatio?: number;
  name: string;
}

export default function BaseStats({ stats, rankRatio, name }: BaseStatsProps) {
  // const { open } = useSidebar();

  const [isBar, setIsBar] = useState(true);
  if (!stats) {
    return <div>스탯 정보가 없습니다</div>;
  }

  const baseStats = stats.filter(({ stat }) => stat !== 'total');
  const order = getRaderChartOrder();
  const totalStat = stats.find(({ stat }) => stat === 'total');
  const raderChartData = baseStats
    .slice()
    .sort((a, b) => order.indexOf(a.label) - order.indexOf(b.label))
    .map((stat) => ({
      subject: stat.label,
      value1: stat.value,
      fullMark: 280,
    }));

  return (
    <div className="h-full w-full">
      <div className="h-full w-full">
        <div className=" flex flex-col h-full w-full">
          {/* <h3 className="text-xl font-semibold px-6">종족값</h3> */}
          {/* <div className="p-6">
            <div className="bg-muted rounded-lg grid grid-cols-2 items-stretch p-1 h-11">
              <Button
                variant={'secondary'}
                onClick={() => setIsBar(true)}
                className={cn('h-full', isBar ? 'bg-card hover:bg-card' : '')}
              >
                막대형태
              </Button>
              <Button
                variant={'secondary'}
                onClick={() => setIsBar(false)}
                className={cn('h-full', !isBar ? 'bg-card hover:bg-card' : '')}
              >
                레이더형태
              </Button>
            </div>
          </div> */}
          <div className=" flex-1">
            <BarChart baseStats={baseStats} name={name} />
          </div>
          {/* 
          <div className="flex flex-1 justify-center items-center w-full min-h-[245px] h-[245px] shrink-0 px-6">
            {isBar ? (
              <BarChart baseStats={baseStats} name={name} />
            ) : (
              <RaderChart data={raderChartData} />
            )}
          </div> */}
        </div>
        {/* 
        <div className="border rounded-2xl flex flex-col p-6">
          <h3 className="text-xl font-semibold">총합</h3>
          <div className="flex justify-center items-center flex-1">
            <TotalDonut value={totalStat?.value || 0} rankRatio={rankRatio} />
          </div>
        </div> */}

        {/* <MinMaxStats stats={baseStats} /> */}
        {/* <RaderChart /> */}
      </div>
    </div>
  );
}
