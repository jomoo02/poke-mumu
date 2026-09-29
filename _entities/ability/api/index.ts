import { createClient } from '@/_shared/lib/supabase/client';

import type { Ability, AbilityDetail } from '../model';

export const getAbilityDetail = async (
  identifier: string,
): Promise<AbilityDetail | null> => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase
    .from('ability')
    .select(
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
    )
    .eq('identifier', identifier)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
};

export const getAllAbilityDetail = async (): Promise<AbilityDetail[]> => {
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

export const getAbility = async (
  identifier: string,
): Promise<Ability | null> => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase
    .from('ability')
    .select(
      `
      id,
      identifier,
      nameKo:name_ko,
      flavorText:flavor_text
    `,
    )
    .eq('identifier', identifier)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to fetch ability "${identifier}": ${error.message}`,
    );
  }

  return data;
};
