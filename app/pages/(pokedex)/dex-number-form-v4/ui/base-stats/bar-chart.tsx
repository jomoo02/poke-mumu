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
    <svg width="100%" height="13">
      <g className="bars">
        <rect fill="#f2f3f4" width="100%" height="12" rx="5" />
        <rect fill={barColor} width={width} height="12" rx={5} />
      </g>
    </svg>
  );
}

interface BarChartProps {
  baseStats: StatView[];
  total?: StatView;
}

export default function BarChart({ baseStats, total }: BarChartProps) {
  return (
    <div className="w-full overflow-hidden max-w-xl mx-auto h-full rounded-lg">
      <Table className="overflow-hidden">
        <TableBody>
          {baseStats.map((stat) => (
            <TableRow key={stat.stat} className="border-b">
              <TableCell className="text-left text-muted-foreground font-medium">
                {stat.label}
              </TableCell>
              <TableCell className="text-right ">{stat.value}</TableCell>
              <TableCell className="w-full">
                <Bar value={stat.value} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="">
          <TableRow className="hover:bg-transparent">
            <TableCell className="text-left  text-muted-foreground">
              {total?.label || '총합'}
            </TableCell>
            <TableCell className="text-right font-medium ">
              {total?.value || 0}
            </TableCell>
            <TableCell />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
