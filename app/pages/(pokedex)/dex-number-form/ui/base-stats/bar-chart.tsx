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
    <svg width="100%" height="14">
      <g className="bars">
        <rect fill="#f2f3f4" width="100%" height="14" rx="5" />
        <rect fill={barColor} width={width} height="14" rx={5} />
      </g>
    </svg>
  );
}

interface BarChartProps {
  baseStats: StatView[];
}

export default function BarChart({ baseStats }: BarChartProps) {
  return (
    <div className="w-full overflow-hidden">
      <Table className="overflow-hidden">
        <TableBody>
          {baseStats.map((stat) => (
            <TableRow key={stat.stat} className=" bg-card border-b-0">
              <TableCell className="text-left pl-0">{stat.label}</TableCell>
              <TableCell className="text-center ">{stat.value}</TableCell>
              <TableCell className="w-full">
                <Bar value={stat.value} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell>총합</TableCell>
            <TableCell>500</TableCell>
            <TableCell />
          </TableRow>
        </TableFooter> */}
      </Table>
    </div>
  );
}
