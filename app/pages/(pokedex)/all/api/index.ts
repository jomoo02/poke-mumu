import { createClient } from '@/app/shared/lib/supabase/client';
import { Tables } from '@/types_db';

import { type NationalPokeView } from '../model';

type NationalPokeDto = Tables<'national_pokedex_with_stat'>;

const adaptNationPokeView = (dto: NationalPokeDto): NationalPokeView => {
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
    sortOrder: dto.sort_order!,
    hp: dto.hp || 0,
    attack: dto.attack || 0,
    defense: dto.defense || 0,
    specialAttack: dto.special_attack || 0,
    specialDefense: dto.special_defense || 0,
    speed: dto.speed || 0,
    total: dto.total || 0,
    sprite: dto.sprite!,
    pokeKey: dto.poke_key!,
    dexNumber: dto.dex_number!,
    nameKo: dto.name_ko!,
    formIdentifier: dto.form_identifier,
    form: dto.form_name_ko,
  };
};

export const getNationalPokedex = async () => {
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

  return data.map(adaptNationPokeView);
};
