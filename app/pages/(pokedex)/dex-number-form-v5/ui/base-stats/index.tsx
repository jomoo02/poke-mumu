'use client';

import { useState } from 'react';

import { Button } from '@/app/shared/ui/button';
import { cn } from '@/app/shared/lib/cn';

import { type StatView, getRaderChartOrder } from '../../model';
import BarChart from './bar-chart';
import RaderChart from './rader-chart';
import TotalDonut from './total';

interface BaseStatsProps {
  stats: StatView[];
  rankRatio?: number;
}

export default function BaseStats({ stats, rankRatio }: BaseStatsProps) {
  const [isBarChart, setIsBarChart] = useState(true);

  const order = getRaderChartOrder();

  const baseStats = stats.filter(({ stat }) => stat !== 'total');

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
    <div className="">
      <h3 className="text-3xl font-semibold pb-4 w-full">스탯</h3>

      {/* <div className="mb-1">
        <div className="flex p-1 rounded-lg gap-2">
          <Button
            className={cn(
              'py-1.5 font-medium text-sm rounded-lg p-2',
              isBarChart
                ? 'bg-muted text-foreground shadow-sm '
                : 'text-muted-foreground hover:text-foreground',
            )}
            onClick={() => setIsBarChart(true)}
          >
            막대그래프
          </Button>
          <Button
            className={cn(
              'py-1.5 font-medium text-sm rounded-lg p-2',
              !isBarChart
                ? 'bg-muted text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
            )}
            onClick={() => setIsBarChart(false)}
          >
            레이더차트
          </Button>
        </div>
      </div> */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="p-6 border rounded-2xl">
          <h3 className="text-lg font-medium mb-2">종족값</h3>
          <div className="justify-center flex flex-col w-full items-center ">
            {isBarChart ? (
              <BarChart baseStats={baseStats} total={totalStat} />
            ) : (
              <div className="w-full h-full flex justify-center flex-col items-center focus:outline-none">
                {' '}
                <RaderChart data={raderChartData} />
                <div className="text-sm font-medium">
                  총합 : {totalStat?.value}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-6 border rounded-2xl flex flex-col h-full min-h-81.5">
          <h3 className="text-lg font-medium mb-2">총합</h3>
          <div className=" flex justify-center items-center w-full flex-1 ">
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
    </div>
  );
}
