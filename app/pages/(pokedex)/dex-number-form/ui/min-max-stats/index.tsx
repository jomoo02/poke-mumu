'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
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
      {/* <div className="w-full mb-2 text-lg font-medium">스탯 범위</div> */}

      <div className="rounded-xl border overflow-hidden h-full p-6">
        <h3 className="text-xl font-semibold">레벨별 스탯 범위</h3>
        {/* <div className="grid grid-cols-2 gap-1 border-b pt-4">
          {levels.map((lv) => (
            <Button
              key={lv}
              variant="ghost"
              className={cn(
                ' h-11 font-medium text-base  transition-none   shadow-none  rounded-none border-b-2  border-transparent hover:bg-transparent',
                level === lv
                  ? 'bg-background text-foreground  border-b-foreground/70 '
                  : 'text-muted-foreground',
              )}
              onClick={() => setLevel(lv)}
            >{`Lv.${lv}`}</Button>
          ))}
        </div> */}
        <div className="pt-2">
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead />
                <TableHead className="text-center">Lv.50 Min</TableHead>
                <TableHead className="text-center">Lv.50 Max</TableHead>
                <TableHead className="text-center">Lv.100 Min</TableHead>
                <TableHead className="text-center">Lv.100 Max</TableHead>
              </TableRow>
            </TableHeader>
            {/* <TableHeader>
              <TableRow>
                {levels.map((lv) => (
                  <TableHead colSpan={2} key={lv}>
                    <Button
                      variant="ghost"
                      className={cn(
                        ' py-1.5 font-medium text-sm rounded-md w-full',
                        level === lv
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground',
                      )}
                      onClick={() => setLevel(lv)}
                    >{`Lv.${lv}`}</Button>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader> */}
            {/* <TableHeader>
              <TableRow>
                <TableHead />
                <TableHead className="text-center ">Lv.50</TableHead>
                <TableHead className="text-center ">Lv.100</TableHead>
              </TableRow>
            </TableHeader> */}
            <TableBody>
              {statsMinMax.map((stat) => (
                <TableRow key={stat.stat} className="border-b">
                  <TableCell>{stat.label}</TableCell>
                  <TableCell className="text-center">{stat.min50}</TableCell>
                  <TableCell className="text-center">{stat.max50}</TableCell>
                  <TableCell className="text-center">{stat.min100}</TableCell>
                  <TableCell className="text-center">{stat.max100}</TableCell>
                  {/* <TableCell className="pl-2">{stat.label}</TableCell>
                  <TableCell className="text-center">{stat.min}</TableCell>
                  <TableCell className="text-center">-</TableCell>
                  <TableCell className="text-center">{stat.max}</TableCell> */}
                  {/* <TableCell className="text-center">{`${stat.min50} - ${stat.max50}`}</TableCell>
                  <TableCell className="text-center">{`${stat.min100} - ${stat.max100}`}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
