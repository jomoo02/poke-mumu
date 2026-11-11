import { createClient } from '@/_shared/lib/supabase/client';

import type { ListAbility } from '../model/ability';

// 특성 전체 (목록에 보이는 값만). 정렬은 화면에서 한다
export const getListAbilities = async (): Promise<ListAbility[]> => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase.from('ability').select(
    `
      id,
      identifier,
      abilityNumber:ability_number,
      nameKo:name_ko,
      gen,
      flavorText:flavor_text,
      isChampions:is_champions
    `,
  );

  if (error) {
    throw new Error(`Failed to fetch abilities: ${error.message}`);
  }

  return data;
};
