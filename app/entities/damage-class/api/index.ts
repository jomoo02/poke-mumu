import { createClient } from '@/app/shared/lib/supabase/client';

import { type DamageClassEntity } from '../model';

export const getAllDamageClass = async (): Promise<DamageClassEntity[]> => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase
    .from('damage_class')
    .select(
      `
      identifier,
      nameKo: name_ko
    `,
    )
    .order('id');

  if (error) {
    console.error(`Error function getAllDamageClass - ${error.message}`);
    throw new Error(`Failed to fetch getAllDamageClass: ${error.message}`);
  }

  return data;
};
