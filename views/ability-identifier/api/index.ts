import { createClient } from '@/shared/lib/supabase/client';

import type { AbilityPoke } from '../model/poke';

interface AbilityPokeDto {
  slot: number | null;
  is_hidden: boolean;
  poke: {
    dex_number: number;
    poke_key: string;
    name_ko: string;
    form: {
      name_ko: string;
    } | null;
    type1: {
      identifier: string;
      nameKo: string;
    };
    type2: {
      identifier: string;
      nameKo: string;
    } | null;
    sprite: string;
    is_default: boolean;
  };
}

const adaptAbilityPoke = (pokeDto: AbilityPokeDto): AbilityPoke => {
  const { slot, is_hidden, poke } = pokeDto;

  return {
    form: poke?.form?.name_ko || null,
    pokeKey: poke.poke_key,
    nameKo: poke.name_ko,
    dexNumber: poke.dex_number,
    type1: poke.type1,
    type2: poke.type2,
    sprite: poke.sprite,
    isDefault: poke.is_default,
    isHidden: is_hidden,
    slot: slot,
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
      slot,
      is_hidden,
      poke:poke_key (
        poke_key,
        name_ko,
        dex_number,
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
        is_default
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
