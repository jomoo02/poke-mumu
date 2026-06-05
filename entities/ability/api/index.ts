import { createClient } from '@/shared/lib/supabase/client';

import type { Ability } from '../model';

export const getAllAbility = async (): Promise<Ability[]> => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase.from('ability').select(
    `
      id,
      identifier,
      nameKo:name_ko,
      nameEn:name_en,
      nameJa:name_ja,
      gen,
      flavorText:flavor_text,
      isChampions:is_champions
    `,
  );

  if (error) {
    throw error;
  }

  return data;
};
