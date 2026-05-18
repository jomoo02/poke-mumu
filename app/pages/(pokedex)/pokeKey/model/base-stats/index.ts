import { Stat, StatIdentifier } from '@/app/entities/stat/model';

interface BaseStatsView {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  total: number;
}

interface EffortValueView {
  value: number;
  identifier: StatIdentifier;
  nameKo: string;
}

export { type BaseStatsView, type EffortValueView };
