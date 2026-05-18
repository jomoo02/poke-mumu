import { createClient } from '@/app/shared/lib/supabase/client';

import {
  type MoveDetail,
  type VersionMoveEntry,
  type PokemonWithMove,
} from '../model';

// ── 1. 기술 헤더 ──

export const getMoveByIdentifier = async (
  identifier: string,
): Promise<MoveDetail | null> => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase
    .from('move_current')
    .select(
      `
        id,
        identifier,
        generation,
        nameKo:name_ko,
        nameEn:name_en,
        nameJa:name_ja,
        power,
        pp,
        accuracy,
        typeIdentifier:type_identifier,
        typeNameKo:type_name_ko,
        damageClassIdentifier:damage_class_identifier,
        damageClassNameKo:damage_class_name_ko,
        versionGroupId:version_group_id
      `,
    )
    .eq('identifier', identifier)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return toMoveDetail(data);
};

function toMoveDetail(row: Record<string, unknown>): MoveDetail {
  return {
    id: row.id as number,
    identifier: row.identifier as string,
    generation: row.generation as number,
    nameKo: (row.nameKo as string) ?? '',
    nameEn: (row.nameEn as string) ?? '',
    nameJa: (row.nameJa as string) ?? null,
    power: row.power as number | null,
    pp: row.pp as number | null,
    accuracy: row.accuracy as number | null,
    typeIdentifier: (row.typeIdentifier as string) ?? 'unknown',
    typeNameKo: (row.typeNameKo as string) ?? '',
    damageClassIdentifier: (row.damageClassIdentifier as string) ?? 'unknown',
    damageClassNameKo: (row.damageClassNameKo as string) ?? '',
    versionGroupId: row.versionGroupId as number | null,
  };
}

// ── 2. 버전별 변천사 ──

export const getVersionHistory = async (
  moveId: number,
): Promise<VersionMoveEntry[]> => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase
    .from('version_move')
    .select(
      `
        versionGroupId:version_group_id,
        power,
        pp,
        accuracy,
        description,
        machineType:machine_type,
        machineNumber:machine_number,
        nameKo:name_ko,
        versionGroup:version_group!version_move_version_group_id_fkey(nameKo:name_ko, generation, sortOrder:sort_order),
        type:type!version_move_type_id_fkey(identifier, nameKo:name_ko),
        damageClass:damage_class!version_move_damage_class_id_fkey(identifier, nameKo:name_ko)
      `,
    )
    .eq('move_id', moveId)
    .order('version_group_id', { ascending: true });

  if (error) throw error;

  return (data ?? []).map(toVersionMoveEntry);
};

function toVersionMoveEntry(row: Record<string, unknown>): VersionMoveEntry {
  const vg = row.versionGroup as Record<string, unknown> | null;
  const t = row.type as Record<string, unknown> | null;
  const dc = row.damageClass as Record<string, unknown> | null;

  return {
    versionGroupId: row.versionGroupId as number,
    versionGroupNameKo: (vg?.nameKo as string) ?? '',
    generation: (vg?.generation as number) ?? 0,
    power: row.power as number | null,
    nameKo: row.nameKo as string,
    pp: row.pp as number | null,
    accuracy: row.accuracy as number | null,
    typeIdentifier: (t?.identifier as string) ?? 'unknown',
    typeNameKo: (t?.nameKo as string) ?? '',
    damageClassIdentifier: (dc?.identifier as string) ?? 'unknown',
    damageClassNameKo: (dc?.nameKo as string) ?? '',
    description: row.description as string | null,
    machineType: row.machineType as string | null,
    machineNumber: row.machineNumber as number | null,
  };
}

// ── 3. 보유 포켓몬 (특정 vg 기준) ──

export const getPokemonsByMove = async (
  moveId: number,
  versionGroupId: number,
): Promise<PokemonWithMove[]> => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase
    .from('poke_move')
    .select(
      `
      level,
      poke:poke!poke_move_poke_key_fkey(
        pokeKey:poke_key,
        nameKo:name_ko,
        sprite,
        species:species!inner(dexNumber:dex_number)
      ),
      learnMethod:move_learn_method!poke_move_learn_method_id_fkey(identifier, nameKo:name_ko)
    `,
    )
    .eq('move_id', moveId)
    .eq('version_group_id', versionGroupId);
  if (error) throw error;

  return (data ?? [])
    .map(toPokemonWithMove)
    .sort((a, b) => a.dexNumber - b.dexNumber);
};

function toPokemonWithMove(row: Record<string, unknown>): PokemonWithMove {
  const poke = row.poke as Record<string, unknown> | null;
  const species = poke?.species as Record<string, unknown> | null;
  const lm = row.learnMethod as Record<string, unknown> | null;

  return {
    pokeKey: (poke?.pokeKey as string) ?? '',
    nameKo: (poke?.nameKo as string) ?? '',
    sprite: (poke?.sprite as string) ?? null,
    dexNumber: (species?.dexNumber as number) ?? 9999,
    learnMethodIdentifier: (lm?.identifier as string) ?? 'unknown',
    learnMethodNameKo: (lm?.nameKo as string) ?? '',
    level: row.level as number | null,
  };
}

export const getMoveLearnMethod = async () => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase
    .from('move_learn_method')
    .select(
      `
        id,
        identifier,
        nameKo:name_ko
      `,
    )
    .order('id', { ascending: true });

  if (error) {
    throw error;
  }

  return data;
};
