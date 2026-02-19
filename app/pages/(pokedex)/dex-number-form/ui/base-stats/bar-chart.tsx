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
        {/* <rect
          // fill="#f2f3f4"
          width="100%"
          height="14"
          rx="5"
          className="fill-background"
        /> */}
        <rect fill={barColor} width={width} height="14" rx={5} />
      </g>
    </svg>
  );
}

interface BarChartProps {
  baseStats: StatView[];
}

export default function BarChart({ baseStats }: BarChartProps) {
  const { statsMinMax } = useMinMaxStats(baseStats);
  return (
    <div className="w-full rounded-xl  bg-card ">
      <Table className="">
        <TableBody>
          {statsMinMax.map((stat) => (
            <Fragment key={stat.stat}>
              <TableRow
                key={stat.stat}
                className=" border-b bg-transparent  hover:bg-muted/50"
              >
                <TableCell className="text-left">{stat.label}</TableCell>
                <TableCell className="text-right">{stat.value}</TableCell>
                <TableCell className="w-full">
                  <Bar value={stat.value} />
                </TableCell>
                <TableCell className="text-right hidden sm:table-cell">
                  {stat.min100}
                </TableCell>
                <TableCell className="text-right hidden sm:table-cell">
                  {stat.max100}
                </TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
        <TableFooter className="">
          <TableRow className="">
            <TableCell>총합</TableCell>
            <TableCell>500</TableCell>
            <TableCell />
            <TableCell className="text-right text-muted-foreground hidden sm:table-cell">
              Min
            </TableCell>
            <TableCell className="text-right text-muted-foreground hidden sm:table-cell">
              Max
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
