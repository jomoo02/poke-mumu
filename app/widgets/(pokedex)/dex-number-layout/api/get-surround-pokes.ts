import { createClient } from '@/app/shared/lib/supabase/client';

import { type SurroundPokeView } from '../model';

// const getRange = (dexNumber: number, min = 1, max = 1025) => {
//   const size = 9;
//   const half = Math.floor(size / 2);

//   let start = dexNumber - half + 1;
//   let end = start + size - 1;

//   if (start < min) {
//     start = min;
//     end = min + size - 1;
//   }

//   if (end > max) {
//     end = max;
//     start = max - size + 1;
//   }

//   return [start, end];
// };

export const getSurroundPokes = async (
  targetDexNumber: string | number,
): Promise<{
  next?: SurroundPokeView;
  prev?: SurroundPokeView;
} | null> => {
  'use cache';

  const dexNumber = Number(targetDexNumber);

  if (isNaN(dexNumber)) {
    return null;
  }

  const supabase = createClient();

  // const [start, end] = getRange(dexNumber);

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
    .gte('no', dexNumber - 1)
    .lte('no', dexNumber + 1)
    .order('no', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    return null;
  }

  const prev = data.find((poke) => poke.dexNumber === dexNumber - 1);
  const next = data.find((poke) => poke.dexNumber === dexNumber + 1);

  return { prev, next };
};
