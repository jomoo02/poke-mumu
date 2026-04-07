'use client';

import { Fragment, useState } from 'react';

import {
  calculateMaxStatValue,
  calculateMinStatValue,
} from '@/app/entities/stats/lib';

import { type StatView } from '../../model';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/shared/ui/table';
import { cn } from '@/app/shared/lib/cn';
import { Button } from '@/app/shared/ui/button';
import { ChevronDown } from 'lucide-react';

const targetLevels = [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

interface MinMaxStatsProps {
  stats: StatView[];
}

export default function LevelStats({ stats }: MinMaxStatsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const targetStats = stats.filter(({ stat }) => stat !== 'total');

  const data = targetLevels.map((lv) => {
    const level = lv;

    const cells = targetStats.map(({ stat, value }) => {
      const min = calculateMinStatValue(stat, value, level);
      const max = calculateMaxStatValue(stat, value, level);
      return { min, max, stat };
    });
    return { level, cells };
  });

  const annotation =
    '최댓값은 상승시키는 성격, 노력치 252, 개체값 31 기준이며, 최솟값은 하락시키는 성격, 노력치 0, 개체값 0 기준입니다.';

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="border rounded-2xl">
      <Button
        className="w-full h-full text-foreground p-6 transition-all justify-between"
        variant={'link'}
        onClick={handleClick}
      >
        <h3 className="text-xl font-semibold ">레벨별 스탯 범위</h3>
        <ChevronDown
          data-state={isOpen ? 'open' : 'close'}
          className={cn(
            'size-7 transition-all duration-300 text-muted-foreground',
            isOpen ? 'rotate-180' : '',
          )}
        />
      </Button>
      <div
        data-state={isOpen ? 'open' : 'close'}
        className={cn(
          'grid transition-all duration-300 ',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          'data-open:animate-accordion-down data-close:animate-accordion-up transition-all',
        )}
      >
        <div className=" overflow-hidden">
          <div className="p-6 pt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text- px-3 text-md">레벨</TableHead>
                  {targetStats.map(({ label }) => (
                    <TableHead key={label} className="text-center px-3 text-md">
                      {label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map(({ level, cells }) => (
                  <TableRow
                    key={level}
                    className={cn(
                      level % 50 === 0 || level === 1
                        ? 'bg-muted/70'
                        : 'bg-transparent',
                    )}
                  >
                    <TableCell className="text- p-3 text-md">
                      Lv.{level}
                    </TableCell>
                    <Fragment>
                      {cells.map(({ min, max, stat }) => (
                        <TableCell
                          key={stat}
                          className="text-center p-3 text-md min-w-26 shrink-0"
                        >
                          {min} ~ {max}
                        </TableCell>
                      ))}
                    </Fragment>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="p-6 pt-0">
            <p className="text-muted-foreground text-pretty break-keep text-sm">
              {annotation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
