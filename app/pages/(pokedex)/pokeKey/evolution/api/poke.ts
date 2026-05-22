import { createClient } from '@/app/shared/lib/supabase/client';
export interface PokeRef {
  nameKo: string;
  dexNumber: number;
}

export async function getPokeNamesByKeys(
  keys: string[],
): Promise<Record<string, PokeRef>> {
  'use cache';
  if (keys.length === 0) return {};

  const supabase = createClient();
  const { data, error } = await supabase
    .from('poke')
    .select(
      `
      poke_key,
      name_ko,
      species (
        dex_number
      )`,
    )
    .in('poke_key', keys);

  if (error || !data) return {};
  return Object.fromEntries(
    data.map((r) => [
      r.poke_key,
      { nameKo: r.name_ko, dexNumber: r.species.dex_number },
    ]),
  );
}
