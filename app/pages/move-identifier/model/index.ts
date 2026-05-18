export type MoveDetail = {
  id: number;
  identifier: string;
  generation: number;
  nameKo: string;
  nameEn: string;
  nameJa: string | null;
  power: number | null;
  pp: number | null;
  accuracy: number | null;
  typeIdentifier: string;
  typeNameKo: string;
  damageClassIdentifier: string;
  damageClassNameKo: string;
  versionGroupId: number | null;
};

export type VersionMoveEntry = {
  versionGroupId: number;
  versionGroupNameKo: string;
  generation: number;
  power: number | null;
  pp: number | null;
  accuracy: number | null;
  typeIdentifier: string;
  typeNameKo: string;
  damageClassIdentifier: string;
  damageClassNameKo: string;
  description: string | null;
  machineType: string | null;
  machineNumber: number | null;
  nameKo: string;
};

export type PokemonWithMove = {
  pokeKey: string;
  nameKo: string;
  sprite: string;
  learnMethodIdentifier: string;
  learnMethodNameKo: string;
  level: number | null;
  dexNumber: number;
};
