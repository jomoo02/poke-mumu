import { createClient } from '@/_shared/lib/supabase/client';

import {
  toMultiplier,
  type TypeEffectiveness,
} from '../model/type-effectiveness';

// 방어 상성: 방어 타입 조합에 대한 공격 타입별 배율
// generation 생략 시 DB 기본값(9세대)
export const getDefenseEffectiveness = async (
  defenderTypeIds: number[],
  generation?: number,
): Promise<TypeEffectiveness[]> => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase.rpc('poke_type_defense', {
    defender_ids: defenderTypeIds,
    target_gen: generation,
  });

  if (error) {
    throw new Error(
      `Failed to fetch defense effectiveness [${defenderTypeIds.join(', ')}]: ${error.message}`,
    );
  }

  return data.map((row) => ({
    attackerTypeId: row.attacker_type_id,
    multiplier: toMultiplier(row.effectiveness),
  }));
};
