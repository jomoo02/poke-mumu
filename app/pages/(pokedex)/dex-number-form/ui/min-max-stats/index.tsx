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
    <div className="">
      <div className="w-full mb-2 text-lg font-medium">스탯 범위</div>
      {/* <div className="w-full grid grid-cols-2  bg-muted p-1 rounded-lg gap-1 h-11 mb-1">
        {levels.map((lv) => (
          <Button
            key={lv}
            variant="ghost"
            className={cn(
              ' w-full py-1.5 font-medium text-sm rounded-lg',
              level === lv
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
            )}
            onClick={() => setLevel(lv)}
          >{`Lv.${lv}`}</Button>
        ))}
      </div> */}
      <div className="rounded-xl border overflow-hidden">
        {' '}
        <Table>
          <TableBody>
            {statsMinMax.map((stat) => (
              <TableRow key={stat.stat} className="border-b">
                <TableCell className="text-left border-border">
                  {stat.label}
                </TableCell>
                <TableCell className="text-center">{`${stat.min50} - ${stat.max50}`}</TableCell>
                <TableCell className="text-center">{`${stat.min100} - ${stat.max100}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="">
            <TableRow className="text-muted-foreground">
              <TableCell>레벨</TableCell>
              <TableCell className="text-center">Lv.50</TableCell>
              <TableCell className="text-center">Lv.100</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
