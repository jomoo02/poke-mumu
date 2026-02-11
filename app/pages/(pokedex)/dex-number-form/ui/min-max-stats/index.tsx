'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from '@/app/shared/ui/table';
import { Button } from '@/app/shared/ui/button';
import { cn } from '@/app/shared/lib/cn';

import { type StatView, useMinMaxStats } from '../../model';

interface MinMaxStatsProps {
  stats: StatView[];
}

export default function MinMaxStats({ stats }: MinMaxStatsProps) {
  const baseStats = stats.filter((stat) => stat.stat !== 'total');

  const { level, setLevel, statsMinMax, levels } = useMinMaxStats(baseStats);

  return (
    <div className="border border-border rounded-2xl shadow-sm shadow-border p-6 w-full bg-card">
      <div className="w-full mb-4 text-2xl font-semibold">레벨별 스탯</div>
      <div className="w-full grid grid-cols-2  bg-muted p-1 rounded-lg gap-1 h-11 mb-1">
        {levels.map((lv) => (
          <Button
            key={lv}
            className={cn(
              ' w-full py-1.5 font-medium text-sm rounded-lg',
              level === lv
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
            )}
            onClick={() => setLevel(lv)}
          >{`Lv.${lv}`}</Button>
        ))}
      </div>
      <div className="px-1 h-84 border-border rounded-xl w-full flex items-center justify-center max-w-xl mx-auto">
        <Table>
          <TableBody>
            {statsMinMax.map((stat) => (
              <TableRow key={stat.stat} className="border-0">
                <TableCell className="text-right py-3 pl-2 border-b border-border">
                  {stat.label}
                </TableCell>
                <TableCell className="w-full border-b border-border">
                  <div className="grid grid-cols-2">
                    <div className="text-center">{stat.min}</div>
                    <div className="text-center">{stat.max}</div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="border-border border-0 bg-transparent">
            <TableRow>
              <TableCell />

              <TableCell className="w-full py-3">
                <div className="grid grid-cols-2 w-full text-muted-foreground">
                  <div className="text-center font-normal">Min</div>
                  <div className="text-center font-normal">Max</div>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
