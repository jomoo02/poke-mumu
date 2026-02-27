export interface Stats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  total: number;
}

export const STAT_CONFIG = {
  total: { label: '총합' },
  hp: { label: 'HP' },
  attack: { label: '공격' },
  defense: { label: '방어' },
  specialAttack: { label: '특수공격' },
  specialDefense: { label: '특수방어' },
  speed: { label: '스피드' },
} as const;

export type StatKey = keyof typeof STAT_CONFIG;

export const getStatKeys = () => Object.keys(STAT_CONFIG) as StatKey[];

export const getStatLabels = () =>
  Object.values(STAT_CONFIG).map(({ label }) => label);

export const getStatLabel = (stat: StatKey) => STAT_CONFIG[stat].label;

export const isStatKey = (key: string): key is StatKey => {
  return key in STAT_CONFIG;
};

export const resolveStatLabel = (key: string): string | null => {
  if (!isStatKey(key)) {
    return null;
  }

  return STAT_CONFIG[key].label;
};
