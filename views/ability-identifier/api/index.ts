import { createClient } from '@/shared/lib/supabase/client';

import { type Ability, Poke } from '../model';

export type AbilityDetail = {
  id: number;
  identifier: string;
  nameKo: string;
  nameEn: string;
  nameJa: string | null;
  gen: number | null;
  flavorText: string;
  description: string | null;
};

/**
 * Ability detail 페이지의 "이 특성을 가진 포켓몬" 섹션 항목.
 *
 * 정렬과 그룹화는 UI에서 처리:
 *   - dex_number ASC
 *   - 같은 dex 내에서 is_default DESC (default form 먼저)
 *   - hidden ability 별도 표시 가능
 */
export type PokemonWithAbility = {
  pokeKey: string;
  nameKo: string;
  formId: number | null;
  dexNumber: number;
  type1Id: number;
  type2Id: number | null;
  sprite: string | null;
  isDefault: boolean;
  isHidden: boolean;
  slot: number | null;
};

/**
 * identifier로 ability 단건 조회.
 *
 * 결과:
 *   - 행 발견: AbilityDetail
 *   - 행 없음: null (페이지에서 notFound() 처리)
 */
export async function getAbility(identifier: string): Promise<Ability | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('ability')
    .select(
      'id, identifier, name_ko, name_en, name_ja, gen, flavor_text, description',
    )
    .eq('identifier', identifier)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to fetch ability "${identifier}": ${error.message}`,
    );
  }

  if (!data) return null;

  return {
    id: data.id,
    identifier: data.identifier,
    nameKo: data.name_ko,
    nameEn: data.name_en,
    nameJa: data.name_ja,
    gen: data.gen,
    flavorText: data.flavor_text,
    description: data.description,
  };
}

/**
 * 이 ability를 가진 모든 포켓몬을 조회.
 *
 * 조인 흐름:
 *   poke_ability (ability_id)
 *     ↓
 *   poke (poke_key)
 *     ↓
 *   species (dex_number)
 *
 * 정렬:
 *   - dex_number ASC
 *   - 같은 dex 내 is_default DESC
 */
export async function getPokes(abilityId: number): Promise<Poke[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('poke_ability')
    .select(
      `
      slot,
      is_hidden,
      poke:poke_key (
        poke_key,
        name_ko,
        form: form_id (
          name_ko
        ),
        type1: type!type_1_id (
          identifier,
          nameKo:name_ko
        ),
        type2: type!type_2_id (
          identifier,
          nameKo:name_ko
        ),
        sprite,
        is_default,
        species:species_id (
          dex_number
        )
      )
      `,
    )
    .eq('ability_id', abilityId);

  if (error) {
    throw new Error(
      `Failed to fetch pokemons for ability ${abilityId}: ${error.message}`,
    );
  }

  if (!data) return [];

  // Supabase JS는 inner join을 single object 또는 array로 반환.
  // poke와 species는 각각 1:1 관계라 single object로 와야 정상.
  const result: Poke[] = [];
  for (const row of data) {
    const poke = row.poke;
    if (!poke || Array.isArray(poke)) continue;

    const species = poke.species;
    if (!species || Array.isArray(species)) continue;

    result.push({
      form: poke?.form?.name_ko || null,
      pokeKey: poke.poke_key,
      nameKo: poke.name_ko,
      dexNumber: species.dex_number,
      type1: poke.type1,
      type2: poke.type2,
      sprite: poke.sprite,
      isDefault: poke.is_default,
      isHidden: row.is_hidden,
      slot: row.slot,
    });
  }

  // 정렬: dex_number ASC, is_default DESC
  result.sort((a, b) => {
    if (a.dexNumber !== b.dexNumber) return a.dexNumber - b.dexNumber;
    if (a.isDefault !== b.isDefault) return a.isDefault ? -1 : 1;
    return 0;
  });

  return result;
}
