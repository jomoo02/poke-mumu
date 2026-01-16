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
    <div className="border border-border rounded-2xl shadow-sm shadow-border py-6 w-full bg-card">
      <h3 className="text-2xl font-semibold mb-4 w-full px-6">종족값</h3>
      <div className="px-6 mb-1">
        <div className="w-full grid grid-cols-2 bg-muted p-1 rounded-lg gap-1 h-11">
          <Button
            className={cn(
              'w-full py-1.5 font-medium text-sm rounded-lg',
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
              'w-full py-1.5 font-medium text-sm rounded-lg',
              !isBarChart
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
            )}
            onClick={() => setIsBarChart(false)}
          >
            레이더차트
          </Button>
        </div>
      </div>
      <div className="px-6 h-84 justify-center flex flex-col w-full items-center  border-border rounded-xl">
        {isBarChart ? (
          <BarChart baseStats={baseStats} total={totalStat} />
        ) : (
          <div className="w-full h-full flex justify-center flex-col items-center focus:outline-none">
            {' '}
            <RaderChart data={raderChartData} />
            <div className="text-sm font-medium">총합 : {totalStat?.value}</div>
          </div>
        )}
      </div>
    </div>
  );
}
