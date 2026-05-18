import { createClient } from '@/app/shared/lib/supabase/client';

import { type AbilityView } from '../model';

export const getAllAbility = async (): Promise<AbilityView[]> => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase.from('ability').select(
    `
      identifier,
      nameKo:name_ko,
      gen,
      flavorText:flavor_text
    `,
  );

  if (error) {
    throw error;
  }

  return data;
};
