import { createMapGetter } from '@/app/shared/lib/utils';
import { Tables } from '@/types_db';
import { resolveStatLabel } from '@/app/entities/stats/model';

export type BreedingEntity = Omit<
  Tables<'poke_breeding'>,
  'poke_id' | 'created_at' | 'id'
>;

export type EffortValueEntity = Pick<
  Tables<'poke_effort_value'>,
  'stat_name' | 'stat_value'
>;

export type DetailEntity = Omit<
  Tables<'poke_detail'>,
  'poke_id' | 'created_at' | 'id'
>;

export type EggGroup =
  | 'indeterminate'
  | 'bug'
  | 'dragon'
  | 'fairy'
  | 'ground'
  | 'flying'
  | 'plant'
  | 'humanshape'
  | 'mineral'
  | 'monster'
  | 'water1'
  | 'water2'
  | 'water3'
  | 'ditto'
  | 'no-eggs';

const NO_EGGS: EggGroup = 'no-eggs';

const NULL_CASE_CHAR = '-';

const eggGroupLabel: Record<EggGroup, string> = {
  indeterminate: '부정형',
  bug: '벌레',
  dragon: '드래곤',
  fairy: '요정',
  ground: '육상',
  flying: '비행',
  plant: '식물',
  humanshape: '인간형',
  mineral: '광물',
  monster: '괴수',
  ditto: '메타몽',
  water1: '수중1',
  water2: '수중2',
  water3: '수중3',
  'no-eggs': '미발견',
};

const getEggGroupLabel = createMapGetter(eggGroupLabel, NO_EGGS);

const formatGenderRatio = (genderRate: number | null) => {
  if (genderRate === null || genderRate === -1) {
    return null;
  }

  const female = genderRate * 12.5;
  const male = 100 - female;

  return {
    male: male === 0 ? null : male,
    female: female === 0 ? null : female,
  };
};

export interface BreedingView {
  eggGroups: string[];
  genderRatio: {
    male: number | null;
    female: number | null;
  } | null;
  hatchCounter: string;
}

export const adaptBreeidngView = (
  breedingEntity: BreedingEntity | null,
): BreedingView => {
  if (!breedingEntity) {
    return {
      eggGroups: [getEggGroupLabel(NO_EGGS)],
      genderRatio: null,
      hatchCounter: NULL_CASE_CHAR,
    };
  }
  const { egg_group_1, egg_group_2, gender_rate, hatch_counter } =
    breedingEntity;

  const hatchCounter = hatch_counter ? String(hatch_counter) : NULL_CASE_CHAR;

  const eggGroups = [egg_group_1, egg_group_2]
    .filter((eggGroup) => eggGroup)
    .map(getEggGroupLabel);
  return {
    eggGroups,
    genderRatio: formatGenderRatio(gender_rate),
    hatchCounter:
      eggGroups[0] !== getEggGroupLabel(NO_EGGS)
        ? hatchCounter
        : NULL_CASE_CHAR,
  };
};

const growthRates = [
  'medium-slow',
  'medium',
  'fast',
  'slow',
  'slow-then-very-fast',
  'fast-then-very-slow',
] as const;

type GrowthRate = (typeof growthRates)[number];

const growthRateLabel: Record<GrowthRate, string> = {
  slow: '항상 많음',
  'medium-slow': '초반 매우 적음, 후반 보통',
  medium: '항상 보통',
  fast: '항상 적음',
  'slow-then-very-fast': '초반 매우 많음, 후반 매우 적음',
  'fast-then-very-slow': '초반 매우 적음, 후반 매우 많음',
};

const isGrowthRate = (growthRate: string): growthRate is GrowthRate => {
  return (growthRates as readonly string[]).includes(growthRate);
};

export const getGrowthRateLabel = (growthRate: string | null) => {
  if (!growthRate) {
    return growthRateLabel.medium;
  }
  return isGrowthRate(growthRate)
    ? growthRateLabel[growthRate]
    : growthRateLabel.medium;
};

export interface TrainingView {
  growthRate: string;
  baseFriendShip: string;
  captureRate: string;
  effortValues: string;
}

export const adaptTrainingView = (
  detail: DetailEntity | null,
  effortValues: EffortValueEntity[],
) => {
  if (!detail || effortValues.length === 0) {
    return {
      growthRate: getGrowthRateLabel(null),
      baseFriendShip: NULL_CASE_CHAR,
      captureRate: NULL_CASE_CHAR,
      effortValues: NULL_CASE_CHAR,
    };
  }

  const { base_friendship, capture_rate, growth_rate } = detail;

  return {
    growthRate: getGrowthRateLabel(growth_rate),
    baseFriendShip: base_friendship ? String(base_friendship) : NULL_CASE_CHAR,
    captureRate: capture_rate !== null ? String(capture_rate) : NULL_CASE_CHAR,
    effortValues: effortValues
      .map(({ stat_name, stat_value }) => {
        if (stat_name.includes('special')) {
          const [a, b] = stat_name.split('-');
          const statName = [a, b.charAt(0).toUpperCase() + b.slice(1)].join('');
          return `${resolveStatLabel(statName)} ${stat_value}`;
        }
        return `${resolveStatLabel(stat_name)} ${stat_value}`;
      })
      .join(', '),
  };
};
