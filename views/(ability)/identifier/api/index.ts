import { createClient } from '@/shared/lib/supabase/client';

import type { AbilityPoke } from '../model/poke';

interface AbilityPokeDto {
  is_hidden: boolean;
  poke: {
    dex_number: number;
    poke_key: string;
    name_ko: string;
    form: {
      identifier: string;
      shortKo: string | null;
    };
    type1: {
      identifier: string;
      nameKo: string;
    };
    type2: {
      identifier: string;
      nameKo: string;
    } | null;
    sprite: string;
    isDefault: boolean;
  };
}

const adaptAbilityPoke = (pokeDto: AbilityPokeDto): AbilityPoke => {
  const { is_hidden, poke } = pokeDto;

  return {
    form: poke.form || null,
    pokeKey: poke.poke_key,
    nameKo: poke.name_ko,
    dexNumber: poke.dex_number,
    type1: poke.type1,
    type2: poke.type2,
    sprite: poke.sprite,
    isDefault: poke.isDefault,
    isHidden: is_hidden,
  };
};

export async function getAbilityPokes(
  abilityId: number,
): Promise<AbilityPoke[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('poke_ability')
    .select(
      `
      is_hidden,
      poke:poke_key (
        poke_key,
        name_ko,
        dex_number,
        form: form_id (
          identifier,
          shortKo:short_ko
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
        isDefault:is_default
      )
      `,
    )
    .eq('ability_id', abilityId);

  if (error) {
    throw new Error(
      `Failed to fetch pokemons for ability ${abilityId}: ${error.message}`,
    );
  }

  if (!data) {
    return [];
  }

  return data.map(adaptAbilityPoke).sort((a, b) => {
    if (a.dexNumber !== b.dexNumber) {
      return a.dexNumber - b.dexNumber;
    }
    if (a.isDefault !== b.isDefault) {
      return a.isDefault ? -1 : 1;
    }
    return 0;
  });
}
