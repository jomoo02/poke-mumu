// entities/stat/types.ts

export const STAT_IDENTIFIERS = [
  'hp',
  'attack',
  'defense',
  'specialAttack',
  'specialDefense',
  'speed',
] as const;

export type StatIdentifier = (typeof STAT_IDENTIFIERS)[number];

export const STAT_IDENTIFIERS_ROW_MAP: Record<string, StatIdentifier> = {
  hp: 'hp',
  attack: 'attack',
  defense: 'defense',
  special_attack: 'specialAttack',
  special_defense: 'specialDefense',
  speed: 'speed',
};

export interface Stat {
  id: number;
  identifier: StatIdentifier;
  nameKo: string;
  nameEn: string;
  nameJa: string;
  displayOrder: number;
}
