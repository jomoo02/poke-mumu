import { type BaseStatsView } from '../../model';
import { Stat } from '@/app/entities/stat/model';

interface BaseStatsProps {
  baseStats: BaseStatsView;
  statRows: Stat[];
}

export default function BaseStats({ baseStats, statRows }: BaseStatsProps) {
  return (
    <div className="p-6 border rounded-4xl bg-card ">
      <h3 className="text-xl font-medium">종족값</h3>
      <div className="max-w-xl mx-auto ">
        <div className="mt-3 flex flex-col">
          {statRows.map((stat) => (
            <div key={stat.identifier} className="flex items-center py-3 gap-3">
              <div className="w-18 shrink-0">{stat.nameKo}</div>
              <div className="w-18 text-center shrink-0">
                {baseStats[stat.identifier]}
              </div>

              <Bar value={baseStats[stat.identifier]} />
            </div>
          ))}
          <div className="flex items-center py-3 gap-3">
            <div className="w-18 shrink-0">총합</div>
            <div className="w-18 shrink-0 text-center">{baseStats.total}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const height = 12;

const rx = 6;

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
    { min: 150, color: 'fill-chart-5' }, // darkest
    { min: 130, color: 'fill-chart-4' }, // primary
    { min: 100, color: 'fill-chart-3' },
    { min: 50, color: 'fill-chart-2' },
    { min: -Infinity, color: 'fill-chart-1' }, // lightest
  ];

  const barColor = color ?? ranges.find((r) => value >= r.min)!.color;

  return (
    <svg width="100%" height={height}>
      <g className="bars">
        <rect width="100%" height={height} rx={rx} className="fill-muted" />
        <rect className={barColor} width={width} height={height} rx={rx} />
      </g>
    </svg>
  );
}
