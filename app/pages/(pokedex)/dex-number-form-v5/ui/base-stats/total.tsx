export default function TotalDonut({
  value,
  max = 780,
  rankRatio,
}: {
  value: number;
  max: number;
  rankRatio: number;
}) {
  const size = 180;
  const stroke = 18;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const percent = Math.min(value / max, 1);
  const offset = circumference * (1 - percent);
  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          className="stroke-muted fill-none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="stroke-primary/70 fill-none transition-all duration-500"
        />
      </svg>

      <div className="absolute text-center">
        <div className="text-2xl font-semibold">{value}</div>
        <div className="text-sm text-muted-foreground font-medium">
          {`상위 ${Math.max(1, rankRatio)}%`}
        </div>
      </div>
    </div>
  );
}
