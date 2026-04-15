'use client';

import { useState } from 'react';

import {
  calculateMaxStatValue,
  calculateMinStatValue,
} from '@/app/entities/stats/lib';
import {
  Card,
  CardContent,
  CardDescription,
  CardGroup,
  CardGroupLabel,
  CardHeader,
  CardTitle,
} from '@/app/shared/ui/card';

import { type StatView } from '../../model';
import { cn } from '@/app/shared/lib/cn';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/app/shared/ui/button';

const targetLevels = [1, 30, 50, 70, 100];

interface LevelStatsProps {
  stats: StatView[];
}

export default function LevelStats({ stats }: LevelStatsProps) {
  const [openLevel, setOpenLevel] = useState<number | null>(50);

  const targetStats = stats.filter(({ stat }) => stat !== 'total');

  const handleToggle = (level: number) => {
    setOpenLevel((prev) => (prev === level ? null : level));
  };

  const annotation1 = '최댓값은 상승시키는 성격, 노력치 252, 개체값 31';
  const annotation2 = '최솟값은 하락시키는 성격, 노력치 0, 개체값 0';

  return (
    <Card className="" variant="borderless">
      <CardHeader>
        <CardTitle>레벨별 스탯 범위</CardTitle>
        <CardDescription>
          <p className="text-muted-foreground text-pretty break-keep ">
            {annotation1}
          </p>
          <p className="text-muted-foreground text-pretty break-keep">
            {annotation2}
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent variant={'bordered'}>
        <div className="border rounded-2xl overflow-hidden">
          {targetLevels.map((level, index) => {
            const isOpen = openLevel === level;
            const isLast = index === targetLevels.length - 1;

            return (
              <div
                key={level}
                className={cn(!isLast && 'border-b border-border')}
              >
                <Button
                  type="button"
                  variant={'link'}
                  onClick={() => handleToggle(level)}
                  className={cn(
                    'flex w-full items-center justify-between text-left h-14 border-none px-4 font-medium text-foreground text-base rounded-none',
                    isOpen ? 'bg-muted/50' : 'bg-transparent',
                  )}
                >
                  <span className="font-medium">Lv. {level}</span>
                  <ChevronDown
                    className={cn(
                      'size-5 text-muted-foreground transition-transform duration-200',
                      isOpen && 'rotate-180',
                    )}
                  />
                </Button>

                <div
                  className={cn(
                    'grid transition-all duration-200',
                    isOpen
                      ? 'grid-rows-[1fr] bg-muted/50'
                      : 'grid-rows-[0fr] bg-transparent',
                  )}
                >
                  <div className="overflow-hidden ">
                    <div className="py-1.5">
                      <div className="flex flex-col">
                        {targetStats.map(({ stat, label, value }) => {
                          const min = calculateMinStatValue(stat, value, level);
                          const max = calculateMaxStatValue(stat, value, level);

                          return (
                            <div
                              key={stat}
                              className="flex items-center justify-between py-3 px-4 text-md"
                            >
                              <span className="">{label}</span>
                              <span>
                                {min} ~ {max}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
