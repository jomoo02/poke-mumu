import { createClient } from '@/_shared/lib/supabase/client';

import { compareDexOrder, type AbilityPoke } from '../model/ability-poke';

// 특성 identifier로 바로 필터링해 getAbilityDetail과 병렬 조회할 수 있게 한다
export const getAbilityPokes = async (
  abilityIdentifier: string,
): Promise<AbilityPoke[]> => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase
    .from('poke_ability')
    .select(
      `
      isHidden:is_hidden,
      slot,
      condition,
      ability!inner(identifier),
      poke:poke_key!inner(
        pokeKey:poke_key,
        nameKo:name_ko,
        dexNumber:dex_number,
        sortOrder:sort_order,
        sprite,
        form:form_id(
          identifier,
          nameKo:name_ko,
          shortKo:short_ko
        ),
        type1:type!type_1_id(
          id,
          identifier,
          nameKo:name_ko
        ),
        type2:type!type_2_id(
          id,
          identifier,
          nameKo:name_ko
        )
      )
    `,
    )
    .eq('ability.identifier', abilityIdentifier);

  if (error) {
    throw new Error(
      `Failed to fetch pokes for ability "${abilityIdentifier}": ${error.message}`,
    );
  }

  return data
    .sort((a, b) => compareDexOrder(a.poke, b.poke))
    .map(({ poke, isHidden, slot, condition }): AbilityPoke => ({
      pokeKey: poke.pokeKey,
      nameKo: poke.nameKo,
      dexNumber: poke.dexNumber,
      sprite: poke.sprite,
      form: poke.form,
      type1: poke.type1,
      type2: poke.type2,
      isHidden,
      slot,
      condition,
    }));
};
