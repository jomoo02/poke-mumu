import { createClient } from '@/app/shared/lib/supabase/client';

import { type VersionMoveView } from '../model';

// ── 1. identifier → vg 메타 ──

export type VersionGroupMeta = {
  id: number;
  identifier: string;
  nameKo: string;
  generation: number;
};

export const getVersionGroupByIdentifier = async (
  identifier: string,
): Promise<VersionGroupMeta | null> => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase
    .from('version_group')
    .select(
      `
        id,
        identifier,
        nameKo:name_ko,
        generation
      `,
    )
    .eq('identifier', identifier)
    .maybeSingle();

  if (error) throw error;

  return data;
};

// ── 2. 버전별 기술 목록 ──

export const getMovesByVersionGroup = async (
  versionGroupId: number,
): Promise<VersionMoveView[]> => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase
    .from('version_move')
    .select(
      `
        id,
        nameKo:name_ko,
        power,
        pp,
        accuracy,
        machineType:machine_type,
        machineNumber:machine_number,
        move:move!version_move_move_id_fkey(identifier),
        type:type!version_move_type_id_fkey(identifier, nameKo:name_ko),
        damageClass:damage_class!version_move_damage_class_id_fkey(identifier, nameKo:name_ko)
      `,
    )
    .eq('version_group_id', versionGroupId);

  if (error) throw error;

  return (data ?? []).map(toVersionMoveView);
};

function toVersionMoveView(row: Record<string, unknown>): VersionMoveView {
  const move = row.move as Record<string, unknown> | null;
  const t = row.type as Record<string, unknown> | null;
  const dc = row.damageClass as Record<string, unknown> | null;

  return {
    id: row.id as number,
    moveIdentifier: (move?.identifier as string) ?? '',
    nameKo: (row.nameKo as string) ?? '',
    power: row.power as number | null,
    pp: row.pp as number | null,
    accuracy: row.accuracy as number | null,
    typeIdentifier: (t?.identifier as string) ?? 'unknown',
    typeNameKo: (t?.nameKo as string) ?? '',
    damageClassIdentifier: (dc?.identifier as string) ?? 'unknown',
    damageClassNameKo: (dc?.nameKo as string) ?? '',
    machineType: row.machineType as string | null,
    machineNumber: row.machineNumber as number | null,
  };
}
