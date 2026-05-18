import { createClient } from '@/app/shared/lib/supabase/client';

import { type PokeFormView } from '../model';

export const getPokeForms = async (
  speciesId: number | null,
): Promise<PokeFormView[] | null> => {
  if (!speciesId) {
    return null;
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from('poke')
    .select(
      `
      pokeKey:poke_key,
      nameKo: name_ko,
      form (
        nameKo:name_ko
      ),
      sprite
    `,
    )
    .eq('species_id', speciesId)
    .order('is_default', { ascending: false })
    .order('id', { ascending: true });

  if (error) {
    console.error('form fetch Error', error);
    throw error;
  }

  return data.map(({ form, ...rest }) => ({
    ...rest,
    form: form ? form.nameKo : null,
  }));
};
