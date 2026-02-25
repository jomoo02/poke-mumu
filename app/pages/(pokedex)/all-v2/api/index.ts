import { createClient } from '@/app/shared/lib/supabase/client';
import { Tables } from '@/types_db';

import { type NationalPokeView } from '../model';

type NationalPokeDto = Tables<'national_pokedex_with_stat'>;

const adaptNationPokeView = (dto: NationalPokeDto): NationalPokeView => {
  const type1 =
    dto.type1_identifier && dto.type1_typeko
      ? { identifier: dto.type1_identifier, name: dto.type1_typeko }
      : null;

  const type2 =
    dto.type2_identifier && dto.type2_typeko
      ? { identifier: dto.type2_identifier, name: dto.type2_typeko }
      : null;

  return {
    type1,
    type2,
    hp: dto.hp || 0,
    attack: dto.attack || 0,
    defense: dto.defense || 0,
    specialAttack: dto.special_attack || 0,
    specialDefense: dto.special_defense || 0,
    speed: dto.speed || 0,
    total: dto.total || 0,
    id: dto.id!,
    sprite: dto.sprite!,
    pokeKey: dto.poke_key!,
    dexNumber: dto.dex_number!,
    name: dto.name!,
    form: dto.form,
  };
};

export const getNationalPokedex = async () => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase
    .from('national_pokedex_with_stat')
    .select('*')
    .order('dex_number', { ascending: true })
    .order('id', { ascending: true });

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
