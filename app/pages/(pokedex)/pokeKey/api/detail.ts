import { createClient } from '@/app/shared/lib/supabase/client';
import { EffortValueView, HeroView, SpeciesView } from '../model';
import { formatHeight, formatWeight } from '@/app/shared/lib/format';
import {
  StatIdentifier,
  STAT_IDENTIFIERS_ROW_MAP,
} from '@/app/entities/stat/model';

export const getPokeDetail = async (pokeKey: string) => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase
    .from('poke')
    .select(
      `
      heightDm:height_dm,
      weightHg:weight_hg,
      isDefault:is_default,
      form: form!form_id (
        identifier,
        nameKo:name_ko
      ),
      sprite,
      type1: type!type_1_id (
        identifier,
        nameKo:name_ko
      ),
      type2: type!type_2_id (
        identifier,
        nameKo:name_ko
      ),
      nameKo:name_ko,
      nameEn:name_en,
      nameJa:name_ja,
      speciesId:species_id,
      species (
        identifier,
        nameKo:name_ko,
        dexNumber:dex_number,
        generaKo:genera_ko,
        eggGroup1: egg_group!egg_group_1_id (
          identifier,
          nameKo:name_ko
        ),
        eggGroup2: egg_group!egg_group_2_id (
          identifier,
          nameKo:name_ko
        ),
        hatchCounter:hatch_counter,
        genderRate:gender_rate,
        captureRate:capture_rate,
        baseHappiness:base_happiness,
        growthRate:growth_rate
      ),
      poke_stat (
        hp,
        attack,
        defense,
        specialAttack:special_attack,
        specialDefense:special_defense,
        speed,
        total
      ),
      type_1_id,
      type_2_id,
      poke_effort_value (
       value,
       stat (
        identifier,
        name_ko
       )
      ),
      evolutionId:evolution_id
    `,
    )
    .eq('poke_key', pokeKey)
    .maybeSingle();

  if (error) {
    console.error('detail fetch Error', error);
    throw error;
  }

  if (!data) {
    return null;
  }

  const {
    nameKo,
    nameEn,
    nameJa,
    type1,
    type2,
    species,
    speciesId,
    sprite,
    weightHg,
    heightDm,
    poke_stat,
    type_1_id,
    type_2_id,
    poke_effort_value,
    evolutionId,
  } = data;
  const {
    dexNumber,
    captureRate,
    genderRate,
    generaKo,
    growthRate,
    eggGroup1,
    eggGroup2,
    hatchCounter,
    baseHappiness,
  } = species;
  const form = data.form ? data.form.nameKo : null;

  const hero: HeroView = {
    nameKo,
    nameEn,
    nameJa,
    type1,
    type2,
    pokeKey,
    sprite,
    form,
    dexNumber: dexNumber,
    height: heightDm ? formatHeight(heightDm) : null,
    weight: weightHg ? formatWeight(weightHg) : null,
  };

  const speciesView: SpeciesView = {
    captureRate,
    genderRate,
    generaKo,
    growthRate,
    hatchCounter,
    baseHappiness,
    eggGroup1: eggGroup1?.nameKo ?? '',
    eggGroup2: eggGroup2?.nameKo ?? '',
  };

  const typeIds = [type_1_id, type_2_id].filter((id) => id !== null);

  const effortValues: EffortValueView[] = poke_effort_value.map((v) => {
    return {
      value: v.value,
      nameKo: v.stat.name_ko,
      identifier: STAT_IDENTIFIERS_ROW_MAP[v.stat.identifier],
    };
  });
  return {
    hero,
    dexNumber,
    speciesId,
    species: speciesView,
    nameKo,
    typeIds,
    baseStats: poke_stat,
    effortValues,
    evolutionId,
  };
};
