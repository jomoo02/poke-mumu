import { createClient } from '@/shared/lib/supabase/client';
import type { Type } from '@/app/entities/type/model';
import type { Poke } from '@/entities/poke/model';

export interface AbilityPoke extends Poke {
  pokeKey: string;
  nameKo: string;
  form: string | null;
  dexNumber: number;
  type1: Type;
  type2: Type | null;
  sprite: string;
  isHidden: boolean;
  slot: number | null;
  isDefault: boolean;
}

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

  if (!data) {
    return [];
  }

  const result: AbilityPoke[] = [];

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

  result.sort((a, b) => {
    if (a.dexNumber !== b.dexNumber) {
      return a.dexNumber - b.dexNumber;
    }

    if (a.isDefault !== b.isDefault) {
      return a.isDefault ? -1 : 1;
    }

    return 0;
  });

  return result;
}
