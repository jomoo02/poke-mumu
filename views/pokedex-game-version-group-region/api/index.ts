import { createClient } from '@/shared/lib/supabase/client';

import type { RegionalPoke } from '../model/poke';

export const getRegionalDex = async (versionGroup: string, region: string) => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase
    .from('dex_region')
    .select(
      `
        identifier,
        regionKo:region_ko,
        isPrimary:is_primary,
        versionGroup:version_group!inner (
          identifier,
          nameKo:name_ko
        ),
        entries:dex_entry (
          regionalDexNumber:dex_number,
          poke (
            pokeKey:poke_key,
            sprite,
            form: form_id (
              name_ko
            ),
            nameKo:name_ko,
            type1: type!type_1_id (
              identifier,
              nameKo:name_ko
            ),
            type2: type!type_2_id (
              identifier,
              nameKo:name_ko
            )
          )
        )
      `,
    )
    .eq('version_group.identifier', versionGroup)
    .eq('identifier', region)
    .order('dex_number', {
      referencedTable: 'dex_entry',
      ascending: true,
    })
    .maybeSingle();

  if (error) {
    console.error('Supabase error:', error);
    throw new Error(
      `Failed to fetch dex for ${versionGroup}/${region}: ${error.message}`,
    );
  }

  if (!data) {
    return null;
  }

  const entries: RegionalPoke[] = data.entries.map(
    ({ poke, regionalDexNumber }) => ({
      dexNumber: Number(regionalDexNumber),
      form: poke.form?.name_ko ?? null,
      pokeKey: poke.pokeKey,
      sprite: poke.sprite,
      nameKo: poke.nameKo,
      type1: poke.type1,
      type2: poke.type2,
    }),
  );

  return {
    versionGroupKo: data.versionGroup.nameKo,
    regionKo: data.regionKo,
    identifier: data.identifier,
    isPrimary: data.isPrimary,
    entries,
  };
};
