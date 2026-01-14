import { createClient } from '@/app/shared/lib/supabase/client';

import { type RegionalPokeView } from '../model';

export const fetchRegionalDexDto = async (gameGroup: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('dex_group')
    .select(
      `
        gameGroup:game_group_ko,
        description,
        dexRegion:dex_region (
          id,
          region,
          regionKo:region_ko,
          entries:dex_entry (
            id,
            regionalDexNumber:dex_number,
            poke (
              id,
              dexNumber:no,
              sprite,
              name:name_ko,
              type1: type!type_1_id (
                id,
                identifier,
                name:type_ko
              ),
              type2: type!type_2_id (
                id,
                identifier,
                name:type_ko
              ),
              pokeKey:poke_key
            )
          )
        )
      `,
    )
    .eq('game_group', gameGroup)
    .order('order_index', {
      referencedTable: 'dex_region',
      ascending: true,
    })
    .order('dex_number', {
      referencedTable: 'dex_region.dex_entry',
      ascending: true,
    })
    .maybeSingle();

  if (error) {
    console.error('Supabase error:', error);
    throw new Error(
      `Failed to fetch pokedex for ${gameGroup}: ${error.message}`,
    );
  }

  if (!data) {
    throw new Error(`No data found for game group: ${gameGroup}`);
  }

  return data;
};

export const getRegionalPokedex = async (gameGroup: string) => {
  'use cache';

  const { dexRegion, ...rest } = await fetchRegionalDexDto(gameGroup);

  return {
    ...rest,
    dexRegion: dexRegion.map((d) => {
      const entries: RegionalPokeView[] = d.entries.map(
        ({ poke, regionalDexNumber }) => ({
          regionalDexNumber,
          ...poke,
        }),
      );
      return {
        ...d,
        entries,
      };
    }),
  };
};

export const getGameGroupAll = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('dex_group')
    .select('group:game_group');

  if (error) {
    throw new Error(`Error getGameGroupAll: ${error}`);
  }
  return data;
};
