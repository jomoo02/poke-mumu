'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardGroup,
  CardHeader,
  CardTitle,
} from '@/app/shared/ui/card';

import { cn } from '@/app/shared/lib/cn';

import { type StatView } from '../../model';
import Bar from './bar';

interface BaseStatsProps {
  stats: StatView[] | null;
  name: string;
}

export default function BaseStats({ stats, name }: BaseStatsProps) {
  if (!stats) {
    return <div>스탯 정보가 없습니다</div>;
  }

  const order = [
    'hp',
    'attack',
    'defense',
    'specialAttack',
    'specialDefense',
    'speed',
    'total',
  ];

  const sorted = [...stats].sort(
    (a, b) => order.indexOf(a.stat) - order.indexOf(b.stat),
  );
  const isTotal = (stat: StatView) => stat.stat === 'total';
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>종족값</CardTitle>
        <CardDescription>{name}의 종족값</CardDescription>
      </CardHeader>
      <CardContent>
        <CardGroup className="gap-2">
          {sorted.map((stat) => (
            <div
              key={stat.stat}
              className="flex items-center py-2.5 border rounded-2xl px-3"
            >
              <div className="px-4 pl-0 text-left w-18 xs:w-20 sm:w-22 shrink-0">
                {stat.label}
              </div>
              <div
                className={cn(
                  'text-center w-16 xs:w-17 sm:w-20 shrink-0',
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
        </CardGroup>
      </CardContent>
    </Card>
  );
}
