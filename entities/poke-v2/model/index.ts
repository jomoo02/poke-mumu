export interface Poke {
  pokeKey: string;
  nameKo: string;
  nameEn?: string;
  nameJa?: string;
  sprite: string;
  dexNumber: number;
  form?: {
    identifier: string;
    nameKo?: string;
    nameEn?: string;
    nameJa?: string;
    shortKo?: string | null;
  } | null;
}
