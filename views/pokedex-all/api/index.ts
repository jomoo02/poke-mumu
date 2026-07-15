import { createClient } from '@/shared/lib/supabase/client';
import { Tables } from '@/types_db';

import type { NationalPoke } from '../model/poke';

type NationalPokeDto = Tables<'national_pokedex_with_stat'>;

const toNumber = (value: number | string | null | undefined): number =>
  value == null ? 0 : Number(value);

const adaptNationalPoke = (dto: NationalPokeDto): NationalPoke => {
  const type1 =
    dto.type_1_identifier && dto.type_1_name_ko
      ? { identifier: dto.type_1_identifier, nameKo: dto.type_1_name_ko }
      : null;

  const type2 =
    dto.type_2_identifier && dto.type_2_name_ko
      ? { identifier: dto.type_2_identifier, nameKo: dto.type_2_name_ko }
      : null;

  return {
    type1,
    type2,
    sortOrder: toNumber(dto.sort_order),
    hp: toNumber(dto.hp),
    attack: toNumber(dto.attack),
    defense: toNumber(dto.defense),
    specialAttack: toNumber(dto.special_attack),
    specialDefense: toNumber(dto.special_defense),
    speed: toNumber(dto.speed),
    total: toNumber(dto.total),
    sprite: dto.sprite!,
    pokeKey: dto.poke_key!,
    dexNumber: toNumber(dto.dex_number),
    nameKo: dto.name_ko!,
    formIdentifier: dto.form_identifier,
    formKo: dto.form_name_ko,
  };
};

export const getAllNationalPoke = async (): Promise<NationalPoke[]> => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase
    .from('national_pokedex_with_stat')
    .select('*')
    .order('dex_number', { ascending: true })
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Supabase error:', error);

    throw new Error(
      `Failed to fetch pokedex for national pokedex: ${error.message}`,
    );
  }

  if (!data) {
    return [];
  }

  return data.map(adaptNationalPoke);
};
