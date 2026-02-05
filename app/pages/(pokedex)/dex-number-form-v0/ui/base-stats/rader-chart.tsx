import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';

export type ChartData = {
  subject: string;
  value1: number;
  fullMark: number;
};

const CustomTick = ({
  x,
  y,
  payload,
  data,
}: {
  x?: number | string;
  y?: number | string;
  payload?: { value: string; index: number };
  data: ChartData[];
}) => {
  if (!payload) return null;

  const px = Number(x);
  const py = Number(y);

  const { index, value: subject } = payload;
  const value1 = data[index]?.value1;

  const OFFSET = 16;
  const LINE_GAP = 18;

  let dx = 0;
  let dy = 0;

  switch (subject) {
    case 'HP':
      dy = -OFFSET - 6;
      break;
    case '공격':
      dx = OFFSET;
      dy = -OFFSET;
      break;
    case '방어':
      dx = OFFSET;
      dy = OFFSET;
      break;
    case '스피드':
      dy = OFFSET;
      break;
    case '특수방어':
      dx = -OFFSET;
      dy = OFFSET;
      break;
    case '특수공격':
      dx = -OFFSET;
      dy = -OFFSET;
      break;
  }

  const tx = px + dx;
  const ty = py + dy;

  return (
    <text x={tx} y={ty} textAnchor="middle" dominantBaseline="middle">
      <tspan x={tx} dy={0} fill="#020817" fontSize={14} fontWeight={500}>
        {subject}
      </tspan>
      <tspan x={tx} dy={LINE_GAP} fill="#020817" fontSize={14} fontWeight={500}>
        {value1}
      </tspan>
    </text>
  );
};

interface RaderChartProps {
  data: ChartData[];
}

export default function RaderChart({ data }: RaderChartProps) {
  return (
    <RadarChart
      style={{
        width: '100%',
        height: '100%',
        maxWidth: '280px',
        maxHeight: '50vh',
        // aspectRatio: 1,
      }}
      responsive
      outerRadius="80%"
      data={data}
      margin={{
        top: 48,
        left: 48,
        right: 48,
        bottom: 48,
      }}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" tick={<CustomTick data={data} />} />
      <PolarRadiusAxis domain={[0, 260]} tick={false} axisLine={false} />
      <Radar
        dataKey="value1"
        stroke="#023db6"
        fill="#023db6"
        fillOpacity={0.6}
        style={{ outline: 'none' }}
      />
    </RadarChart>
  );
}
