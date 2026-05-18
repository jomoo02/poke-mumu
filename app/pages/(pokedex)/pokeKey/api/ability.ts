// app/pages/pokedex/[pokeKey]/api/index.ts (혹은 abilities.ts)

import { createClient } from '@/app/shared/lib/supabase/client';

import { type AbilityView } from '../model';
/**
 * Pokemon detail 페이지의 ability 섹션 항목.
 *
 * 각 ability는 normal(slot 1/2)이거나 hidden인지 구분됨.
 * UI에서 normal과 hidden을 분리해서 표시할 수 있도록 isHidden 플래그 제공.
 */
export type PokeAbilityItem = {
  abilityId: number;
  identifier: string; // ability detail 페이지로 이동할 때 사용 (/ability/[identifier])
  nameKo: string;
  nameEn: string;
  description: string | null; // 짧은 효과 설명 (현재는 null 가능)
  flavorText: string; // 게임 내 표시 문구
  slot: number | null; // 1, 2, NULL(hidden)
  isHidden: boolean;
};

export const getAbilitiesByPokeKey = async (
  pokeKey: string,
): Promise<AbilityView[]> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('poke_ability')
    .select(
      `
      slot,
      is_hidden,
      ability:ability_id (
        id,
        identifier,
        name_ko,
        name_en,
        flavor_text,
        description
      )
      `,
    )
    .eq('poke_key', pokeKey)
    .order('is_hidden', { ascending: true })
    .order('slot', { ascending: true, nullsFirst: false });

  if (error) {
    throw new Error(
      `Failed to fetch abilities for "${pokeKey}": ${error.message}`,
    );
  }

  if (!data) return [];

  return data.map(({ ability, slot, is_hidden }) => ({
    slot,
    isHidden: is_hidden,
    identifier: ability.identifier,
    nameKo: ability.name_ko,
    flavorText: ability.flavor_text,
  }));
};
