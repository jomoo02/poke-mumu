import { createClient } from '@/_shared/lib/supabase/client';

import type { DamageClass } from '../model/damage-class';

export const getAllDamageClass = async (): Promise<DamageClass[]> => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase
    .from('damage_class')
    .select(
      `
      id,
      identifier,
      nameKo:name_ko
    `,
    )
    .order('id');

  if (error) {
    throw new Error(`Failed to fetch damage classes: ${error.message}`);
  }

  return data;
};
