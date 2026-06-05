export interface Ability {
  id: number;
  identifier: string;
  nameKo: string;
  flavorText: string;
  nameEn: string;
  nameJa: string | null;
  gen: number;
  description?: string | null;
  isChampions?: boolean;
}
