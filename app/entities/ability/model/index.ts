// export interface Ability {
//   id?: number;
//   name: string;
//   flavorText: string;
// }

export interface Ability {
  id?: number;
  identifier: string;
  nameKo: string;
  flavorText: string;

  nameEn?: string;
  nameJa?: string | null;
  gen?: number | null;
  description?: string | null;
}
