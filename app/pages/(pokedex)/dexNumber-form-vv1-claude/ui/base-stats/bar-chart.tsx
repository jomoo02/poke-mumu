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
import { type StatView } from '../../../dex-number-form-vv1/model';
import { useMinMaxStats } from '../../../dex-number-form-vv1/model';
import { Fragment } from 'react/jsx-runtime';

interface BarProps {
  value: number;
}

function Bar({ value }: BarProps) {
  const width = `${(value / 255) * 100}%`;

  const barColor = (() => {
    if (value >= 150) return '#1d4ed8';
    if (value >= 110) return '#3b82f6';
    if (value >= 75) return '#60a5fa';
    if (value >= 50) return '#93c5fd';
    return '#bfdbfe';
  })();

  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width, backgroundColor: barColor }}
        />
      </div>
    </div>
  );
}

interface BarChartProps {
  baseStats: StatView[];
}

export default function BarChart({ baseStats }: BarChartProps) {
  const { statsMinMax } = useMinMaxStats(baseStats);

  return (
    <div className="w-full rounded-xl border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            <TableHead className="w-[14%] text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              스탯
            </TableHead>
            <TableHead className="w-[8%] text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground" />
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" />
            <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden sm:table-cell w-[8%]">
              Min
            </TableHead>
            <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden sm:table-cell w-[8%]">
              Max
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {statsMinMax.map((stat) => (
            <Fragment key={stat.stat}>
              <TableRow className="bg-transparent hover:bg-muted/20">
                <TableCell className="text-sm text-muted-foreground">
                  {stat.label}
                </TableCell>
                <TableCell className="text-center font-semibold tabular-nums">
                  {stat.value}
                </TableCell>
                <TableCell className="pr-4">
                  <Bar value={stat.value} />
                </TableCell>
                <TableCell className="text-center text-sm text-muted-foreground hidden sm:table-cell tabular-nums">
                  {stat.min100}
                </TableCell>
                <TableCell className="text-center text-sm text-muted-foreground hidden sm:table-cell tabular-nums">
                  {stat.max100}
                </TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
        <TableFooter className="bg-muted/20">
          <TableRow>
            <TableCell className="text-sm font-semibold text-muted-foreground">
              총합
            </TableCell>
            <TableCell className="text-center font-bold tabular-nums">
              {baseStats.reduce((acc, s) => acc + s.value, 0)}
            </TableCell>
            <TableCell colSpan={3} />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
