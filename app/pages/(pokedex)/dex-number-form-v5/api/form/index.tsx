import { createClient } from '@/app/shared/lib/supabase/client';

export const getDexNumberForms = async (dexNumber: number | string) => {
  'use cache';
  const supabase = createClient();

  const nDex = Number(dexNumber);
  const { data, error } = await supabase
    .from('poke')
    .select(
      `
      pokeKey: poke_key,
      name: name_ko,
      sprite,
      form,
      dexNumber: no
    `,
    )
    .eq('no', nDex)
    .order('id', { ascending: true });

  if (error) {
    throw new Error(`${error.message}`);
    return null;
  }
  return data;
};
