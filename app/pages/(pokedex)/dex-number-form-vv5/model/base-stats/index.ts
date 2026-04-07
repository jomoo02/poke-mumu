import {
  getStatKeys,
  getStatLabel,
  type StatKey,
  type Stats,
} from '@/app/entities/stats/model';

export interface StatView {
  stat: StatKey;
  value: number;
  label: string;
}

export const adaptBaseStatsView = (stats: Stats | null): StatView[] | null => {
  if (!stats) {
    return null;
  }
  const statKeys = getStatKeys();

  return statKeys.map((statKey) => {
    const stat = statKey;
    const value = stats[statKey];
    const label = getStatLabel(statKey);

    return {
      stat,
      value,
      label,
    };
  });
};

export const getRaderChartOrder = () => {
  const order: StatKey[] = [
    'hp',
    'attack',
    'defense',
    'speed',
    'specialDefense',
    'specialAttack',
  ];
  return order.map(getStatLabel) as string[];
};
