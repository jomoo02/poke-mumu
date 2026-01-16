import { type Type } from '@/app/entities/type/model';
import { Tables } from '@/types_db';

export type DexInfoEntity = Omit<Tables<'pokedex_info'>, 'poke_id' | 'id'>;

export interface DexInfoDto {
  types: Type[];
  dexNumber: number;
  name: string;
  form: string | null;
  dexInfo: DexInfoEntity | null;
  sprite?: string;
  nameEn: string;
  nameJa: string;
  id: number;
  pokeKey: string;
}

export interface DexInfoView {
  types: Type[];
  dexNumber: number;
  name: string;
  form: string | null;
  weight: string;
  height: string;
  genera: string;
  nameEn: string;
  nameJa: string;
  id: number;
  pokeKey: string;
  sprite?: string;
}

const formatMeasurement = (value: number, unit: string) => {
  const meters = value / 10;

  const formattedMeters = meters.toFixed(1);

  return `${formattedMeters} ${unit}`;
};

export const adpatDexInfoView = (dto: DexInfoDto): DexInfoView => {
  const { dexInfo, ...rest } = dto;

  const height = formatMeasurement(dexInfo?.height || 0, 'm');
  const weight = formatMeasurement(dexInfo?.weight || 0, 'kg');
  const genera = dexInfo?.genera || '포켓몬';

  return {
    ...rest,
    genera,
    height,
    weight,
  };
};
