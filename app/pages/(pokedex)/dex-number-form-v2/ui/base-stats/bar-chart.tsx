import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from '@/app/shared/ui/table';

import { useMinMaxStats, type StatView } from '../../model';

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
  const { statsMinMaxAll } = useMinMaxStats(baseStats);
  return (
    <Table className="max-w-3xl">
      <TableBody>
        {statsMinMaxAll.map((stat) => (
          <TableRow
            key={stat.stat}
            className="border-border hover:bg-transparent"
          >
            <TableCell className="text-right py-3 pl-2 border-b border-border">
              {stat.label}
            </TableCell>
            <TableCell className="text-center py-3 border-b border-border">
              {stat.value}
            </TableCell>
            <TableCell className="py-3 pr-2 border-b border-border w-full min-w-40">
              <Bar value={stat.value} />
            </TableCell>
            <TableCell>
              {stat.min50}-{stat.max50}
            </TableCell>
            <TableCell>
              {stat.min100}-{stat.max100}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className=" bg-transparent">
        <TableRow className="hover:bg-transparent">
          <TableCell className="text-right py-3 pl-2">
            {total?.label || '총합'}
          </TableCell>
          <TableCell className="text-center py-3 ">
            {total?.value || 0}
          </TableCell>
          <TableCell />
          <TableCell>Lv.50</TableCell>
          <TableCell>Lv.100</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
