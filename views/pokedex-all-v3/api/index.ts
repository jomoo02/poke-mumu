import { createClient } from '@/shared/lib/supabase/client';
import { Tables } from '@/types_db';

import { type NationalPoke } from '../model';

type NationalPokeDto = Tables<'national_pokedex_with_stat'>;

// Supabase 숫자 컬럼은 문자열로 올 수 있으므로 Number(...)로 명시 변환.
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

// 전체 전국도감 리스트를 정적으로 한 번 패칭 → 캐시 유지.
// 'use cache' 스코프 안에서는 searchParams/cookies/headers 접근 금지(인자 없음).
export const getNationalPokedex = async (): Promise<NationalPoke[]> => {
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
