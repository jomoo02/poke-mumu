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
  stats: StatView[] | null;
}

export default function LevelStats({ stats }: LevelStatsProps) {
  const [openLevel, setOpenLevel] = useState<number>(50);

  if (!stats) {
    return null;
  }

  const targetStats = stats.filter(({ stat }) => stat !== 'total');

  // const handleToggle = (level: number) => {
  //   setOpenLevel((prev) => (prev === level ? null : level));
  // };

  const annotation1 = '최댓값은 상승시키는 성격, 노력치 252, 개체값 31';
  const annotation2 = '최솟값은 하락시키는 성격, 노력치 0, 개체값 0';

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>레벨별 스탯 범위</CardTitle>
        {/* <CardDescription>
          <p className="text-muted-foreground text-pretty break-keep ">
            {annotation1}
          </p>
          <p className="text-muted-foreground text-pretty break-keep">
            {annotation2}
          </p>
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1.5 justify-end">
          {targetLevels.map((level) => (
            <Button
              key={level}
              className={cn(
                'text-sm h-9',
                level === openLevel
                  ? 'bg-muted dark:bg-input hover:bg-muted dark:hover:bg-input '
                  : '',
              )}
              onClick={() => setOpenLevel(level)}
              variant={'outline'}
            >
              Lv.{level}
            </Button>
          ))}
        </div>
        <div className="@container">
          <div className="grid grid-cols-1 @[500px]:grid-cols-2 @[650px]:grid-cols-3 gap-3">
            {targetStats.map((stat) => (
              <div
                key={stat.stat}
                className="p-4 rounded-4xl border flex justify-between gap-1"
              >
                <div className="text-md font-medium text-muted-foreground">
                  {stat.label}
                </div>
                <div>
                  {`${calculateMinStatValue(stat.stat, stat.value, openLevel)} ~ ${calculateMaxStatValue(stat.stat, stat.value, openLevel)}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
