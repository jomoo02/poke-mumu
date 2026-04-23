import { createClient } from '@/app/shared/lib/supabase/client';
import { type RankView } from '../model';

export const getRanks = async (pokeKey: string): Promise<RankView | null> => {
  'use cache';

  const supabase = createClient();

  const { data } = await supabase.rpc('get_poke_ranks', {
    target_key: pokeKey,
  });

  if (!data || !data[0]) {
    return null;
  }

  const {
    attack_rank,
    defense_rank,
    hp_rank,
    special_attack_rank,
    special_defense_rank,
    speed_rank,
    total_count,
    total_rank,
    type1_count,
    type1_rank,
    type2_count,
    type2_rank,

    attack_tied,
    defense_tied,
    hp_tied,
    special_attack_tied,
    special_defense_tied,
    speed_tied,
    total_tied,
    type1_tied,
    type2_tied,
  } = data[0];

  return {
    attackRank: attack_rank,
    defenseRank: defense_rank,
    hpRank: hp_rank,
    specialAttackRank: special_attack_rank,
    specialDefenseRank: special_defense_rank,
    speedRank: speed_rank,
    totalCount: total_count,
    totalRank: total_rank,
    type1Count: type1_count,
    type1Rank: type1_rank,
    type2Count: type2_count,
    type2Rank: type2_rank,
    attackRankTied: attack_tied,
    defenseRankTied: defense_tied,
    hpRankTied: hp_tied,
    specialAttackRankTied: special_attack_tied,
    specialDefenseRankTied: special_defense_tied,
    speedRankTied: speed_tied,
    totalRankTied: total_tied,
    type1RankTied: type1_tied,
    type2RankTied: type2_tied,
  };
};
