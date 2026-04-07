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

import { type StatView } from '../../model';
import { useMinMaxStats } from '../../model';
import { Fragment } from 'react/jsx-runtime';

interface BarProps {
  value: number;
  color?: string;
}

function Bar({ value, color }: BarProps) {
  const width = (() => {
    const scaleFactor = 255;
    const barWidth = `${(value / scaleFactor) * 100}%`;

    return barWidth;
  })();

  const ranges = [
    { min: 150, color: '#023DB6' }, // darkest
    { min: 125, color: '#0355FB' },
    { min: 100, color: '#2F74FD' }, // primary
    { min: 75, color: '#8CB2FE' },
    { min: 50, color: '#A3C1FE' },
    { min: -Infinity, color: '#BAD1FE' }, // lightest
  ];

  const barColor = color ?? ranges.find((r) => value >= r.min)!.color;

  return (
    <svg width="100%" height="14">
      <g className="bars">
        <rect width="100%" height="14" rx="5" className="fill-muted" />
        <rect fill={barColor} width={width} height="14" rx={5} />
      </g>
    </svg>
  );
}

interface BarChartProps {
  baseStats: StatView[];

  name: string;
}

export default function BarChart({ baseStats, name }: BarChartProps) {
  const { statsMinMax } = useMinMaxStats(baseStats);
  return (
    <div className="w-full  bg-card">
      <Table className="">
        <colgroup>
          <col className="w-20 sm:w-24" />
          <col className="w-17 sm:w-22" />
          <col className="" />
        </colgroup>
        <TableBody className="">
          {statsMinMax.map((stat) => (
            <Fragment key={stat.stat}>
              <TableRow key={stat.stat} className="border-b-0 bg-transparent">
                <TableCell className=" px-3 text-left">{stat.label}</TableCell>
                <TableCell className="text-center  px-3 ">
                  {stat.value}
                </TableCell>
                <TableCell className="  px-3">
                  <Bar value={stat.value} />
                </TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
        <TableFooter className="border-t bg-transparent">
          <TableRow className="">
            <TableCell className=" px-3 text-left">총합</TableCell>
            <TableCell className="text-center px-3">300</TableCell>
            <TableCell />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
