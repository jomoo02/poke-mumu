import { createClient } from '@/app/shared/lib/supabase/client';

export const getSurroundingPokes = async (targetDexNumber: string | number) => {
  'use cache';

  const dexNumber = Number(targetDexNumber);

  if (isNaN(dexNumber)) {
    return null;
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from('species')
    .select(
      `
        id,
        species,
        dexNumber: no,
        name: name_ko
      `,
    )
    .in('no', [dexNumber - 1, dexNumber + 1]);

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    return null;
  }

  const prev = data.find((poke) => poke.dexNumber === dexNumber - 1);
  const next = data.find((poke) => poke.dexNumber === dexNumber + 1);

  return {
    prev,
    next,
  };
};
