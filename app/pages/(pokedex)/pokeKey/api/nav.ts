import { cache } from 'react';

import { createClient } from '@/app/shared/lib/supabase/client';

import { MAX_DEX_NUMBER } from '../config';
import { type NavView } from '../model';

export type PokeNav = {
  prev: NavView | null;
  next: NavView | null;
};

export const getPokeNav = cache(async (dexNumber: number): Promise<PokeNav> => {
  const supabase = createClient();

  const targets = [dexNumber - 1, dexNumber + 1].filter(
    (n) => n >= 1 && n <= MAX_DEX_NUMBER,
  );

  if (targets.length === 0) {
    return { prev: null, next: null };
  }

  const { data, error } = await supabase
    .from('poke')
    .select(
      `
      pokeKey: poke_key,
      nameKo: name_ko,
      species: species!inner (
        dexNumber: dex_number
      )
    `,
    )
    .eq('is_default', true)
    .in('species.dex_number', targets);

  if (error) throw error;

  const navMap = new Map<number, NavView>();

  for (const row of data ?? []) {
    const { species, nameKo, pokeKey } = row;

    navMap.set(species.dexNumber, {
      nameKo,
      pokeKey,
      dexNumber: species.dexNumber,
    });
  }

  return {
    prev: navMap.get(dexNumber - 1) ?? null,
    next: navMap.get(dexNumber + 1) ?? null,
  };
});
