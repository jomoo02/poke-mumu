export interface AbilityEntity {
  id?: number;
  identifier: string;
  nameKo: string;
  flavorText: string;
  nameEn?: string;
  nameJa?: string | null;
  gen?: number | null;
  description?: string | null;
}
