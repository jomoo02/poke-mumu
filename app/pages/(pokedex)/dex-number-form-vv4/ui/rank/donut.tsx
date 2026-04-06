export default function RankDonut({
  stat,
  max = 255,
}: {
  stat: number;
  max?: number;
}) {
  const size = 20;
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const percent = Math.min(stat / max, 1);
  const offset = circumference * (1 - percent);

  return (
    <svg width={size} height={size} className="-rotate-90 shrink-0">
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
        strokeLinecap="round"
        className="stroke-primary/70 fill-none transition-all duration-500"
      />
    </svg>
  );
}
