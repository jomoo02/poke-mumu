'use client';

import { useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/shared/ui/table';
import {
  calculateMaxStatValue,
  calculateMinStatValue,
} from '@/app/entities/stats/lib';
import Button from '@/app/shared/ui/button';
import { cn } from '@/app/shared/lib/cn';

import { type StatView, useMinMaxStats } from '../../model';
import { ChevronDown } from 'lucide-react';

interface MinMaxStatsProps {
  stats: StatView[];
}

export default function MinMaxStats({ stats }: MinMaxStatsProps) {
  const baseStats = stats.filter((stat) => stat.stat !== 'total');
  const [isVisible, setIsVisible] = useState(false);

  const { level, setLevel, statsMinMax, levels } = useMinMaxStats(baseStats);

  const data = baseStats.map(({ stat, value, label }) => {
    const max50 = calculateMaxStatValue(stat, value, 50);
    const min50 = calculateMinStatValue(stat, value, 50);
    const max100 = calculateMaxStatValue(stat, value, 100);
    const min100 = calculateMinStatValue(stat, value, 100);
    return {
      max50,
      min50,
      max100,
      min100,
      label,
      stat,
    };
  });

  return (
    <div className="w-full bg-card border py-4 px-6 rounded-2xl">
      <Button
        onClick={() => setIsVisible((prev) => !prev)}
        className="flex justify-between w-full items-center group"
      >
        <div className="w-full text-lg font-medium text-left group-hover:underline">
          레벨별 스탯
        </div>
        <ChevronDown
          className={cn(
            'size-6 transition-transform transform duration-400 will-change-transform',
            isVisible ? ' rotate-180' : '',
          )}
        />
      </Button>

      {isVisible && (
        <div className="p-4">
          <Table className="">
            <TableHeader>
              <TableRow className="hover:bg-muted/50">
                <TableHead className="sm:w-36" />
                <TableHead className="text-center">Lv.50</TableHead>
                <TableHead className="text-center">Lv.100</TableHead>
                {/* <TableHead className="text-right">min</TableHead>
                <TableHead className="text-right">max</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((stat) => (
                <TableRow key={stat.stat} className="hover:bg-muted/50">
                  <TableCell className="text-right ">{stat.label}</TableCell>
                  <TableCell className=" text-center">
                    {`${stat.min50} - ${stat.max50}`}
                    {/* <div className="flex gap-2 justify-center">
            
                    </div> */}
                  </TableCell>

                  <TableCell className=" text-center">
                    {`${stat.min100} - ${stat.max100}`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            {/* <TableFooter className="border-border border-0 bg-transparent">
            <TableRow>
              <TableCell />

              <TableCell className="w-full py-3">
                <div className="grid grid-cols-2 w-full text-muted-foreground">
                  <div className="text-center font-normal">Min</div>
                  <div className="text-center font-normal">Max</div>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter> */}
          </Table>
        </div>
      )}
    </div>
  );
}
