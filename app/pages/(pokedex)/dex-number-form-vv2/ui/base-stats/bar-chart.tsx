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
        <rect
          // fill="#f2f3f4"
          width="100%"
          height="14"
          rx="5"
          className="fill-muted"
        />
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
    <div className="w-full bg-card overflow-hidden">
      <Table className="">
        <TableHeader className="h-12">
          <TableRow className="border-b-0 ">
            <TableHead colSpan={1}>{`종족값`}</TableHead>
            <TableHead colSpan={2} className="py-3" />
            <TableHead className="text-right  hidden sm:table-cell ">
              Min
            </TableHead>
            <TableHead className="text-right  hidden sm:table-cell">
              Max
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {statsMinMax.map((stat) => (
            <Fragment key={stat.stat}>
              <TableRow key={stat.stat} className=" bg-transparent">
                <TableCell className="w-[12%]  py-3 ">{stat.label}</TableCell>
                <TableCell className="text-center w-[10%]  ">
                  {stat.value}
                </TableCell>
                <TableCell className="w-[76%] sm:w-[52%] ">
                  <Bar value={stat.value} />
                </TableCell>
                <TableCell className="text-right hidden sm:table-cell w-[12%] ">
                  {stat.min100}
                </TableCell>
                <TableCell className="text-right hidden sm:table-cell w-[12%] ">
                  {stat.max100}
                </TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
        <TableFooter className="border-t bg-transparent">
          <TableRow className="">
            <TableCell className="py-3">총합</TableCell>
            <TableCell className=" text-center">500</TableCell>
            <TableCell colSpan={3} />
            {/* <TableCell className="text-center hidden sm:table-cell ">
              Min
            </TableCell>
            <TableCell className="text-center hidden sm:table-cell ">
              Max
            </TableCell> */}
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
