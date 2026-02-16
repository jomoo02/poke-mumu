import { createClient } from '@/app/shared/lib/supabase/client';

const getRange = (dexNumber: number, min = 1, max = 1025) => {
  const size = 9;
  const half = Math.floor(size / 2);

  let start = dexNumber - half + 1;
  let end = start + size - 1;

  if (start < min) {
    start = min;
    end = min + size - 1;
  }

  if (end > max) {
    end = max;
    start = max - size + 1;
  }

  return [start, end];
};

export const getSurroundingPokes = async (targetDexNumber: string | number) => {
  'use cache';

  const dexNumber = Number(targetDexNumber);

  if (isNaN(dexNumber)) {
    return null;
  }

  const supabase = createClient();

  const [start, end] = getRange(dexNumber);

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
    .gte('no', start)
    .lte('no', end)
    .order('no', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    return null;
  }

  const prev = data.find((poke) => poke.dexNumber === dexNumber - 1);
  const next = data.find((poke) => poke.dexNumber === dexNumber + 1);

  return { prev, next, pokes: data };
};
