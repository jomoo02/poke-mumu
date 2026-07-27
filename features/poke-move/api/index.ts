import { Poke } from '@/entities/poke/model';
import { Type } from '@/entities/type/model';
import { createClient } from '@/shared/lib/supabase/client';

export interface MoveLearnPoke extends Poke {
  pokeKey: string;
  nameKo: string;
  sprite: string;
  learnMethodIdentifier: string;
  learnMethodNameKo: string;
  level: number | null;
  dexNumber: number;
  type1: Type;
  type2: Type | null;
  form: string | null;
}

interface MoveLearnPokeDto {
  level: number | null;
  poke: {
    pokeKey: string;
    nameKo: string;
    sprite: string;
    dexNumber: number;
    type1: {
      identifier: string;
      nameKo: string;
    };
    type2: {
      identifier: string;
      nameKo: string;
    } | null;
    form: {
      name_ko: string;
    } | null;
  };
  learnMethod: {
    identifier: string;
    nameKo: string;
  };
}

export const getMoveLearnPokesByVerionGroupId = async (
  moveId: number,
  versionGroupId: number,
): Promise<MoveLearnPoke[]> => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase
    .from('poke_move')
    .select(
      `
      level,
      poke:poke!poke_move_poke_key_fkey(
        pokeKey:poke_key,
        nameKo:name_ko,
        sprite,
        dexNumber:dex_number,
        type1: type!type_1_id (
          identifier,
          nameKo:name_ko
        ),
        type2: type!type_2_id (
          identifier,
          nameKo:name_ko
        ),
       form: form_id (
          name_ko
        )
      ),
      learnMethod:move_learn_method!poke_move_learn_method_id_fkey(identifier, nameKo:name_ko)
    `,
    )
    .eq('move_id', moveId)
    .eq('version_group_id', versionGroupId);
  if (error) throw error;

  return (data ?? [])
    .map(toPokemonWithMove)
    .sort((a, b) => a.dexNumber - b.dexNumber);
};

function toPokemonWithMove(row: MoveLearnPokeDto): MoveLearnPoke {
  const poke = row.poke;
  const lm = row.learnMethod;

  return {
    pokeKey: poke.pokeKey,
    nameKo: poke.nameKo,
    sprite: poke.sprite,
    dexNumber: poke.dexNumber,
    learnMethodIdentifier: lm.identifier,
    learnMethodNameKo: lm.nameKo,
    level: row.level,
    type1: poke.type1,
    type2: poke.type2,
    form: poke.form?.name_ko || null,
  };
}
