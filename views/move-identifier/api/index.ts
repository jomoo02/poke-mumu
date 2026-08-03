import { createClient } from '@/shared/lib/supabase/client';

export interface LegendsArceusMove {
  identifier: string;
  nameKo: string | null;
  nameEn: string | null;
  nameJa: string | null;
  type: {
    identifier: string;
    nameKo: string;
  } | null;
  damageClass: {
    identifier: string;
    nameKo: string;
  } | null;
  pp: number | null;
  powerStandard: number | null;
  powerAgile: number | null;
  powerStrong: number | null;
  accuracyStandard: number | null;
  accuracyAgile: number | null;
  accuracyStrong: number | null;
}

export const getLegendsArceusMove = async (moveId: number) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('version_move_legends_arceus')
    .select(
      `
        identifier,
        nameKo:name_ko,
        nameEn:name_en,
        nameJa:name_ja,
        type:type!version_move_legends_arceus_type_id_fkey(identifier, nameKo:name_ko),
        damageClass:damage_class!version_move_legends_arceus_damage_class_id_fkey(identifier, nameKo:name_ko),
        pp,
        powerStandard:power_standard,
        powerAgile:power_agile,
        powerStrong:power_strong,
        accuracyStandard:accuracy_standard,
        accuracyAgile:accuracy_agile,
        accuracyStrong:accuracy_strong
      `,
    )
    .eq('base_move_id', moveId)
    .maybeSingle();

  if (error) {
    console.error(`getLegendsArceusMove function Error ${error.message}`);
    throw error;
  }

  if (!data) {
    return null;
  }

  return data;
};
