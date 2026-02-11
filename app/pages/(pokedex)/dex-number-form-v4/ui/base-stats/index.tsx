'use client';

import { useState } from 'react';

import { Button } from '@/app/shared/ui/button';
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
    <div className="">
      <h3 className="text-2xl font-bold mb-4">종족값</h3>
      {/* <div className="w-full h-1 bg-border rounded-lg mb-6 " /> */}
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

      <div className="bg-card p-6 rounded-2xl border grid  md:grid-cols-2 gap-6">
        <div className="flex flex-col justify-center items-center">
          <div className="text-xl">총합</div>
          <div className="text-xl">{totalStat?.value}</div>
        </div>
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
    </div>
  );
}
