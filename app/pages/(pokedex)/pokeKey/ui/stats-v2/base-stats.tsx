import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardGroup,
  CardGroupLabel,
  CardItem,
} from '@/app/shared/ui/card';
import { type BaseStatsView } from '../../model';
import { Stat } from '@/app/entities/stat/model';
import { Table, TableBody, TableCell, TableRow } from '@/app/shared/ui/table';

interface BaseStatsProps {
  baseStats: BaseStatsView;
  statRows: Stat[];
}

export default function BaseStats({ baseStats, statRows }: BaseStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>종족값</CardTitle>
      </CardHeader>
      <CardContent>
        <CardGroup className="gap-y-1.5">
          <div className="flex flex-col gap-y-3">
            {statRows.map((stat) => (
              <div
                key={stat.identifier}
                className="flex items-center gap-x-3.5 px-3.5 py-1"
              >
                <div className="text-right text-md w-16 shrink-0">
                  {stat.nameKo}
                </div>
                <div className="text-center w-14 text-md shrink-0">
                  {baseStats[stat.identifier]}
                </div>
                <div className=" w-full flex-1 ">
                  <Bar value={baseStats[stat.identifier]} scale={255} />
                </div>
              </div>
            ))}
            <div className="flex items-center gap-x-3.5 px-3.5 py-1">
              <div className="text-right text-md w-16 shrink-0 font-medium">
                총합
              </div>
              <div className="text-center w-14  text-md shrink-0 font-medium">
                {baseStats.total}
              </div>
              <div className=" w-full flex-1 ">
                <Bar value={baseStats.total} scale={780} />
              </div>
            </div>
          </div>
          {/* <Table className="">
            <TableBody>
              {statRows.map((stat) => (
                <TableRow key={stat.identifier} className="border-b-0">
                  <TableCell className="text-right text-md py-2">
                    {stat.nameKo}
                  </TableCell>
                  <TableCell className="text-center py-2">
                    {baseStats[stat.identifier]}
                  </TableCell>
                  <TableCell className="py-2 w-full">
                    <Bar value={baseStats[stat.identifier]} scale={255} />
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="text-right text-md py-2">총합</TableCell>
                <TableCell className="text-center py-2">
                  {baseStats.total}
                </TableCell>
                <TableCell className="py-2">
                  <Bar value={baseStats.total} scale={780} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table> */}
        </CardGroup>
      </CardContent>
    </Card>
  );
}

const height = 20;

const rx = 5;

interface BarProps {
  value: number;
  color?: string;
  scale: number;
}

function Bar({ value, color, scale }: BarProps) {
  const width = (() => {
    const scaleFactor = scale;
    const barWidth = `${(value / scaleFactor) * 100}%`;

    return barWidth;
  })();

  // const ranges = [
  //   { min: 150, color: 'fill-chart-5' }, // darkest
  //   { min: 130, color: 'fill-chart-4' }, // primary
  //   { min: 100, color: 'fill-chart-3' },
  //   { min: 50, color: 'fill-chart-2' },
  //   { min: -Infinity, color: 'fill-chart-1' }, // lightest
  // ];

  // const barColor = color ?? ranges.find((r) => value >= r.min)!.color;

  return (
    <svg width="100%" height={height}>
      <g className="bars">
        <rect width="100%" height={height} rx={rx} className="fill-muted" />
        <rect
          className={'fill-chart-2'}
          width={width}
          height={height}
          rx={rx}
        />
      </g>
    </svg>
  );
}
