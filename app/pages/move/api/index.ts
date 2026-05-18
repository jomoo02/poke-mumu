import { createClient } from '@/app/shared/lib/supabase/client';

import { type MoveView } from '../model';

const adaptMoveView = (row: Record<string, unknown>): MoveView => {
  return {
    id: row.id as number,
    identifier: row.identifier as string,
    generation: row.generation as number,
    nameKo: (row.nameKo as string) ?? '',
    nameEn: (row.nameEn as string) ?? '',
    power: row.power as number | null,
    pp: row.pp as number | null,
    accuracy: row.accuracy as number | null,
    typeIdentifier: (row.typeIdentifier as string) ?? 'unknown',
    typeNameKo: (row.typeNameKo as string) ?? '',
    damageClassIdentifier: (row.damageClassIdentifier as string) ?? 'unknown',
    damageClassNameKo: (row.damageClassNameKo as string) ?? '',
  };
};

export const getAllMoves = async (): Promise<MoveView[]> => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase.from('move_current').select(
    `
      id,
      identifier,
      generation,
      nameKo:name_ko,
      nameEn:name_en,
      power,
      pp,
      accuracy,
      typeIdentifier:type_identifier,
      typeNameKo:type_name_ko,
      damageClassIdentifier:damage_class_identifier,
      damageClassNameKo:damage_class_name_ko
    `,
  );

  if (error) {
    throw error;
  }

  return (data ?? []).map(adaptMoveView);
};
