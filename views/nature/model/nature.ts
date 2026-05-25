import { resolveStatLabel } from '@/app/entities/stats/model';

type Stat = 'attack' | 'defense' | 'speed' | 'specialAttack' | 'specialDefense';

export interface Nature {
  ko: string;
  ja: string;
  en: string;
  identifier: string;
  increase: Stat | null;
  decrease: Stat | null;
}

export const getStatLabelKo = (stat: Stat | null) => {
  if (!stat) {
    return null;
  }

  return resolveStatLabel(stat);
};
