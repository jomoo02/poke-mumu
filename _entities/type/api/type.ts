import { createClient } from '@/_shared/lib/supabase/client';

import type { TypeDetail } from '../model/type';

export const getAllType = async (): Promise<TypeDetail[]> => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase
    .from('type')
    .select(
      `
      id,
      identifier,
      nameKo:name_ko,
      generation,
      damageClassId:damage_class_id
    `,
    )
    .order('id');

  if (error) {
    throw new Error(`Failed to fetch types: ${error.message}`);
  }

  return data;
};
