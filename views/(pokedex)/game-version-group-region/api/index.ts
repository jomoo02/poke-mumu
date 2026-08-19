import { createClient } from '@/shared/lib/supabase/client';
import type { RegionalPoke } from '../model';

export const getAllRegionParams = async () => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase.from('dex_region').select(
    `
        identifier,
        is_primary,
        version_group!inner (
          identifier
        )
      `,
  );

  if (error || !data) {
    return [];
  }

  return data.map((row): { versionGroup: string; region: string[] } => ({
    versionGroup: row.version_group.identifier,
    region: row.is_primary ? [] : [row.identifier],
  }));
};

export const getRegionalDex = async (versionGroup: string, region?: string) => {
  'use cache';

  const supabase = createClient();

  const base = supabase
    .from('dex_region')
    .select(
      `
        regionKo:region_ko,
        version_group!inner (
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
    .eq('version_group.identifier', versionGroup);

  // 필터를 order 앞에서 확정 (order 이후엔 .eq 사용 불가)
  const filtered = region
    ? base.eq('identifier', region)
    : base.eq('is_primary', true);

  const { data, error } = await filtered
    .order('dex_number', {
      referencedTable: 'dex_entry',
      ascending: true,
    })
    .maybeSingle();

  if (error) {
    console.error('Supabase error:', error);
    throw new Error(
      `Failed to fetch dex for ${versionGroup}/${region ?? '(primary)'}: ${error.message}`,
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
    entries,
    regionKo: data.regionKo,
    versionGroupKo: data.version_group.nameKo,
  };
};
