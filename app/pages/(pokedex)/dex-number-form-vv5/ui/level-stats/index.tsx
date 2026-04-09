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
  const transposedData = targetStats.map(({ label }, statIndex) => ({
    label,
    cells: data.map(({ level, cells }) => ({
      level,
      min: cells[statIndex].min,
      max: cells[statIndex].max,
    })),
  }));

  // 헤더용 레벨 목록
  const levels = data.map(({ level }) => level);

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
                  <TableHead />
                  {levels.map((level) => (
                    <TableHead key={level} className="text-center px-3 text-md">
                      Lv.{level}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {transposedData.map(({ label, cells }) => (
                  <TableRow key={label}>
                    <TableCell className="py-2.5 px-4">{label}</TableCell>
                    {cells.map(({ level, min, max }) => (
                      <TableCell
                        key={level}
                        className="text-center py-2.5 px-4 min-w-26 shrink-0"
                      >
                        {min} ~ {max}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="p-6 pt-0">
            <p className="text-muted-foreground text-pretty break-keep">
              {annotation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
