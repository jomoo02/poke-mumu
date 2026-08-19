import { createClient } from '@/shared/lib/supabase/client';

export async function fetchChampionsLearnersByMove(moveId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('champions_learnset')
    .select(
      `
      poke:poke_key (
        id, pokeKey:poke_key, nameKo:name_ko, dexNumber:dex_number, sprite,
        form: form_id ( name_ko ),
        type1: type!type_1_id ( identifier, nameKo:name_ko ),
        type2: type!type_2_id ( identifier, nameKo:name_ko )
      )
    `,
    )
    .eq('move_id', moveId);
}
export const getChampionsPokes = async (moveId: number) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('champions_learnset') // champions_poke_move → champions_learnset
    .select(
      `
      poke (
        id,
        pokeKey:poke_key,
        nameKo:name_ko,
        dexNumber:dex_number,
        sprite,
        form: form_id (
          name_ko
        ),
        type1: type!type_1_id (
          identifier,
          nameKo:name_ko
        ),
        type2: type!type_2_id (
          identifier,
          nameKo:name_ko
        )
      )
    `,
    )
    .eq('move_id', moveId);

  if (error) {
    console.error(error.message);
  }

  if (!data) {
    return null;
  }

  return data
    .map(({ poke }) => poke)
    .flat()
    .sort((a, b) => {
      if (a.dexNumber === b.dexNumber) {
        return a.id - b.id;
      }
      return a.dexNumber - b.dexNumber;
    })
    .map(({ form, ...rest }) => ({
      ...rest,
      form: form?.name_ko || null,
    }));
};
