import { createClient } from '@/shared/lib/supabase/client';

import type { NationalPoke } from '../model/national-poke';

export const getNationalPokes = async (): Promise<NationalPoke[] | null> => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase
    .from('poke')
    .select(
      `
      pokeKey:poke_key,
      nameKo:name_ko,
      dexNumber:dex_number,
      form: form_id (
        identifier,
        shortKo: short_ko,
        nameKo:name_ko
      ),
      type1: type!type_1_id (
        identifier,
        nameKo:name_ko
      ),
      type2: type!type_2_id (
        identifier,
        nameKo:name_ko
      ),
      generation,
      sprite
    `,
    )
    .order('dex_number', { ascending: true })
    .order('sort_order', { ascending: true });

  if (error) {
    console.error(`${error.message}`);
    return null;
  }

  if (!data || data.length === 0) {
    return null;
  }

  return data;
};
