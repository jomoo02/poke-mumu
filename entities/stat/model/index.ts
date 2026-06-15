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

export interface StatMeta {
  id: number;
  identifier: StatIdentifier;
  nameKo: string;
  nameEn: string;
  nameJa: string;
  displayOrder: number;
}

export interface Stat {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface StatRow {
  identifier: StatIdentifier;
  label: string;
  value: number;
}
