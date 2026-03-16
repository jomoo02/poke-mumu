import { type Stats, getStatLabel } from '../model';

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
    <svg width="100%" height="12">
      <g className="bars">
        <rect fill="#f2f3f4" width="100%" height="12" rx="5" />
        <rect fill={barColor} width={width} height="12" rx={5} />
      </g>
    </svg>
  );
}

interface StatRowProps {
  label: string;
  value: number;
}

function StatRow({ label, value }: StatRowProps) {
  return (
    <div className="flex gap-2 py-1.5 items-center">
      <div className="w-16 shrink-0 text-base font-medium text-muted-foreground">
        {label}
      </div>
      <div className="w-14 shrink-0 font-medium text-center text-base  tabular-nums">
        {value}
      </div>
      <div className="flex-1">
        <Bar value={value} />
      </div>
    </div>
  );
}

interface BarStatsProps {
  stats: Stats;
}

export default function BarStats({ stats }: BarStatsProps) {
  const { hp, attack, defense, specialAttack, specialDefense, speed } = stats;

  const total = stats.total
    ? stats.total
    : (Object.values(stats).filter((stat) => stat) as number[]).reduce(
        (acc, cur) => acc + cur,
        0,
      );

  const totalWithLabel = {
    label: getStatLabel('total'),
    value: total,
  };

  const statsWithLabel = [
    { label: getStatLabel('hp'), value: hp },
    { label: getStatLabel('attack'), value: attack },
    { label: getStatLabel('defense'), value: defense },
    { label: getStatLabel('specialAttack'), value: specialAttack },
    { label: getStatLabel('specialDefense'), value: specialDefense },
    { label: getStatLabel('speed'), value: speed },
  ];

  return (
    <>
      <div className="flex flex-col">
        {statsWithLabel.map(({ label, value }) => (
          <StatRow key={label} label={label} value={value} />
        ))}
      </div>
      <div className="bg-border w-full h-px my-1.5"></div>
      <div className="flex gap-2 pt-1.5">
        <div className="shrink-0  text-base font-medium text-muted-foreground w-16">
          총합
        </div>
        <div className=" shrink-0  font-semibold tabular-nums text-center text-base w-14 ">
          {total}
        </div>
      </div>
    </>
  );
}
