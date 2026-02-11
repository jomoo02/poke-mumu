import { createClient } from '@/app/shared/lib/supabase/client';

import { getTypeDefenses } from './type-defense';
import {
  adpatDexInfoView,
  adaptBreeidngView,
  adaptTrainingView,
  adaptBaseStatsView,
  adaptAbilitiyView,
  adaptPokeMovesView,
} from '../model';

export const getPokeData = async (pokeKey: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('poke')
    .select(
      `
        id,
        type1: type!type_1_id (
          id,
          identifier,
          name:type_ko
        ),
        type2: type!type_2_id (
          id,
          identifier,
          name:type_ko
        ),
        evolutionId: evolution_id,
        dexNumber:no,
        name:name_ko,
        nameEn: name_en,
        nameJa: name_ja,
        form,
        sprite,
        pokedexInfo:pokedex_info (
          id,
          weight,
          height,
          genera
        ),
        pokedexNumber:pokedex_number (
          id,
          dex_type,
          dex_number
        ),
        breeding:poke_breeding (
          id,
          egg_group_1,
          egg_group_2,
          gender_rate,
          hatch_counter
        ),
        effortValues:poke_effort_value (
          id,
          stat_name,
          stat_value
        ),
        detail:poke_detail (
          id,
          capture_rate,
          growth_rate,
          base_friendship
        ),
        stats:poke_stat (
          hp,
          attack,
          defense,
          specialAttack:special_attack,
          specialDefense:special_defense,
          speed,
          total
        ),
        abilities:poke_ability (
          slot,
          ability (
            id,
            name:name_ko,
            flavorText:flavor_text
          )
        ),
        pokeMoves:poke_moves (
          id,
          version_group_id,
          versionGroup:version_group (
            id,
            generation,
            identifier,
            order,
            version_group_ko
          ),
          moves
        )
    `,
    )
    .eq('poke_key', pokeKey)
    .maybeSingle();

  if (error) {
    console.error(error.message);
    throw new Error(`${error.message}`);
  }

  if (!data) {
    throw new Error('Error not exist pokedetail');
  }

  const { data: rank } = await supabase.rpc('get_poke_rank_by_key', {
    target_key: pokeKey,
  });

  console.log(rank);
  const {
    dexNumber,
    id,
    type1,
    type2,
    name,
    form,
    pokedexInfo,
    sprite,
    nameEn,
    nameJa,
    detail,
    effortValues,
    breeding,
    stats,
    abilities,
    pokeMoves,
  } = data;

  const types = [type1, type2].filter((d) => !!d);

  const dexInfoDto = {
    types,
    dexNumber,
    name,
    form,
    dexInfo: pokedexInfo,
    sprite,
    nameEn,
    nameJa,
    id,
    pokeKey,
  };

  const poke = {
    dexNumber,
    name,
    form,
    sprite,
    pokeKey,
  };
  const typeDefense = await getTypeDefenses(types.map((type) => type.id));

  return {
    types,
    typeDefense,
    evolutionId: data.evolutionId,

    dexInfo: adpatDexInfoView(dexInfoDto),
    breeding: adaptBreeidngView(breeding),
    training: adaptTrainingView(detail, effortValues),
    stats: adaptBaseStatsView(stats),
    abilities: adaptAbilitiyView(abilities),
    moves: adaptPokeMovesView(pokeMoves),
    rankRatio: rank ? rank[0].top_percent : 0,
    poke,
  };
};
