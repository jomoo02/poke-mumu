import { createClient } from '@/app/shared/lib/supabase/client';

import { type Poke } from '@/app/entities/poke/model';

export const getSpeciesPokes = async (): Promise<Poke[] | null> => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase
    .from('species')
    .select(
      `
        id,
        dexNumber: no,
        name: name_ko,
        species,
        poke!species_species_fkey (
          sprite
        )
      `,
    )
    .order('no', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    return null;
  }

  const pokes = data.map(({ poke, species, ...rest }) => ({
    sprite: poke.sprite,
    pokeKey: species,
    ...rest,
  }));

  return pokes;
};
