const height = 18;

const rx = 7;

interface BarProps {
  value: number;
  color?: string;
}

export default function Bar({ value, color }: BarProps) {
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
