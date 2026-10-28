import { createClient } from '@/_shared/lib/supabase/client';

import type { BaseStatsPoke } from '../model/base-stats-poke';

const CHUNK_SIZE = 1500;

const POKE_SELECT = `
  pokeKey:poke_key,
  nameKo:name_ko,
  nameEn:name_en,
  nameJa:name_ja,
  dexNumber:dex_number,
  sortOrder:sort_order,
  gen:generation,
  sprite,
  form:form_id(
    identifier,
    nameKo:name_ko,
    nameEn:name_en,
    nameJa:name_ja,
    shortKo:short_ko,
    group:form_group_id(identifier)
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
  ),
  stats:poke_stat(
    hp,
    attack,
    defense,
    specialAttack:special_attack,
    specialDefense:special_defense,
    speed,
    total
  )
`;

const fetchChunk = async (from: number) => {
  const supabase = createClient();

  // range로 나눠 받으므로 행 순서가 고정돼야 한다 (dex_number + sort_order가 유일)
  const { data, error } = await supabase
    .from('poke')
    .select(POKE_SELECT)
    .order('dex_number', { ascending: true })
    .order('sort_order', { ascending: true })
    .range(from, from + CHUNK_SIZE - 1);

  if (error) {
    throw new Error(`Failed to fetch base stats pokes: ${error.message}`);
  }

  return data;
};

// 전국도감 전체(폼 포함) + 종족값. 도감 번호 → 폼 순서
export const getBaseStatsPokes = async (): Promise<BaseStatsPoke[]> => {
  'use cache';

  const rows: Awaited<ReturnType<typeof fetchChunk>> = [];

  for (let from = 0; ; from += CHUNK_SIZE) {
    const chunk = await fetchChunk(from);

    rows.push(...chunk);

    if (chunk.length < CHUNK_SIZE) {
      break;
    }
  }

  // 종족값이 없는 포켓몬은 표에 그릴 수 없으므로 거른다 (poke_stat은 poke와 1:1)
  // 모습 필터 선택지는 identifier만 쓴다 (라벨은 getFormGroups)
  return rows.flatMap(({ stats, form, ...poke }) =>
    stats
      ? [
          {
            ...poke,
            form: form && { ...form, group: form.group?.identifier ?? null },
            stats,
          },
        ]
      : [],
  );
};
