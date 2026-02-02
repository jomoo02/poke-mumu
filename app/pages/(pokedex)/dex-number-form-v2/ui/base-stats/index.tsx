'use client';

import { useState } from 'react';

import Button from '@/app/shared/ui/button';
import { cn } from '@/app/shared/lib/cn';

import { type StatView, getRaderChartOrder } from '../../model';
import BarChart from './bar-chart';
import RaderChart from './rader-chart';

interface BaseStatsProps {
  stats: StatView[];
}

export default function BaseStats({ stats }: BaseStatsProps) {
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
    <div className="py-6 w-full bg-card">
      <h3 className="text-lg font-medium mb-2 w-full">종족값</h3>
      {/* <div className="mb-1 flex">
        <div className="flex bg-muted p-1 rounded-lg gap-1 h-11">
          <Button
            className={cn(
              'w-20 py-1.5 font-medium text-sm rounded-lg',
              isBarChart
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
            )}
            onClick={() => setIsBarChart(true)}
          >
            막대그래프
          </Button>
          <Button
            className={cn(
              'w-20 py-1.5 font-medium text-sm rounded-lg',
              !isBarChart
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
            )}
            onClick={() => setIsBarChart(false)}
          >
            레이더차트
          </Button>
        </div>
      </div> */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className=" p-6 border rounded-2xl">
          <div className="flex justify-center mb-4">
            <span className="text-xs py-1 px-2 rounded-sm mx-1 text-muted-foreground font-medium bg-muted">
              막대그래프
            </span>
          </div>

          <BarChart baseStats={baseStats} total={totalStat} />
        </div>
        <div className=" p-6 border rounded-2xl">
          <div className="flex justify-center">
            <span className="text-xs py-1 px-2 rounded-sm mx-1 text-muted-foreground font-medium bg-muted ">
              레이더차트
            </span>
          </div>

          <div className="w-full flex justify-center flex-col items-center focus:outline-none">
            <RaderChart data={raderChartData} />
            <div className="text-sm font-medium">총합 : {totalStat?.value}</div>
          </div>
        </div>
      </div>

      {/* <div className="h-90 p-6 flex w-full items-center border border-border rounded-2xl">
        {isBarChart ? (
          <BarChart baseStats={baseStats} total={totalStat} />
        ) : (
          <div className="w-full h-full flex justify-center flex-col items-center focus:outline-none">
            {' '}
            <RaderChart data={raderChartData} />
            <div className="text-sm font-medium">총합 : {totalStat?.value}</div>
          </div>
        )}
      </div> */}
    </div>
  );
}
