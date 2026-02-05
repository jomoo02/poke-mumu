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
    <svg width="100%" height="16">
      <g className="bars">
        <rect fill="#f2f3f4" width="100%" height="15" rx="5" />
        <rect fill={barColor} width={width} height="15" rx={5} />
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
    <div className="w-full overflow-hidden max-w-xl mx-auto h-full">
      <Table className="overflow-hidden">
        <TableBody>
          {baseStats.map((stat) => (
            <TableRow key={stat.stat} className="">
              <TableCell className="text-right py-2.5 text-muted-foreground font-medium">
                {stat.label}
              </TableCell>
              <TableCell className="text-center py-2.5">{stat.value}</TableCell>
              <TableCell className="py-2.5">
                <Bar value={stat.value} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="border-border bg-transparent">
          <TableRow className="hover:bg-transparent">
            <TableCell className="text-right py-2.5">
              {total?.label || '총합'}
            </TableCell>
            <TableCell className="text-center py-2.5">
              {total?.value || 0}
            </TableCell>
            <TableCell />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
