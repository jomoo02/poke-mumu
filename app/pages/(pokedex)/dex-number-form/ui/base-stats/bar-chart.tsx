'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from '@/app/shared/ui/table';

import { type StatView, useMinMaxStats } from '../../model';
import { cn } from '@/app/shared/lib/cn';

interface BarProps {
  value: number;
  color?: string;
}

function Bar({ value, color }: BarProps) {
  const width = (() => {
    const scaleFactor = 255;
    const barWidth = `${(value / scaleFactor) * 100}%`;

    return barWidth;
  })();

  const ranges = [
    { min: 150, color: 'fill-chart-5' }, // darkest
    { min: 130, color: 'fill-chart-4' }, // primary
    { min: 100, color: 'fill-chart-3' },
    { min: 50, color: 'fill-chart-2' },
    { min: -Infinity, color: 'fill-chart-1' }, // lightest
  ];

  const barColor = color ?? ranges.find((r) => value >= r.min)!.color;

  return (
    <svg width="100%" height="14">
      <g className="bars">
        <rect width="100%" height="14" rx="5" className="fill-muted" />
        <rect className={barColor} width={width} height="14" rx={5} />
      </g>
    </svg>
  );
}

interface BarChartProps {
  baseStats: StatView[];
}

export default function BarChart({ baseStats }: BarChartProps) {
  const isTotal = (stat: StatView) => stat.stat === 'total';
  return (
    <div className="grid gap-2">
      {baseStats.map((stat) => (
        <div
          key={stat.stat}
          className="flex items-center py-2 ring ring-border rounded-lg px-2.5"
        >
          <div className="px-4 pl-0 text-left w-18 xs:w-20 sm:w-22 shrink-0">
            {stat.label}
          </div>
          <div
            className={cn(
              'text-center   w-16 xs:w-17 sm:w-20 shrink-0',
              isTotal(stat) ? 'font-medium' : '',
            )}
          >
            {stat.value}
          </div>
          {!isTotal(stat) && (
            <div className="px-4  pr-0  flex-1">
              <Bar value={stat.value} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
