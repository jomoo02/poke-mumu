export interface Move {
  id: number;
  identifier: string;
  generation: number;
  nameKo: string;
  nameEn: string;
  nameJa: string;
  description: string;
  power: number | null;
  pp: number | null;
  accuracy: number | null;
  typeIdentifier: string;
  typeNameKo: string;
  damageClassIdentifier: string;
  damageClassNameKo: string;
}

export interface VersionMove extends Omit<
  Move,
  'nameEn' | 'nameJa' | 'identifier' | 'id'
> {
  versionGroupId: number;
  versionGroupNameKo: string;
  machineType: string | null;
  machineNumber: number | null;
}
