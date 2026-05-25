import { createClient } from '@/app/shared/lib/supabase/client';

export const getAbilityName = async (identifier: string): Promise<string> => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase
    .from('ability')
    .select(
      `
      nameKo:name_ko
    `,
    )
    .eq('identifier', identifier)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data?.nameKo ?? identifier;
};
