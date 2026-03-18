interface BarProps {
  value: number;
  color?: string;
}

export default function StatBar({ value, color }: BarProps) {
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
