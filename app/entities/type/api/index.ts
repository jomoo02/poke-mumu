import { createClient } from '@/app/shared/lib/supabase/client';

import { type Type } from '../model';

export const getAllType = async (): Promise<Type[]> => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase.from('type').select(
    `
      id,
      generation,
      identifier,
      damageClassId: damage_class_id,
      name: type_ko
    `,
  );

  if (error) {
    console.error(`Error function getAllType - ${error.message}`);
    throw new Error(`Failed to fetch getAllType: ${error.message}`);
  }

  return data;
};
