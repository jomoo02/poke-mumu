import { createClient } from '@/app/shared/lib/supabase/client';

import { getAllType } from '@/app/entities/type/api';

import {
  type TypeDefense,
  type TypeDefenseGroupsView,
  type EffectivenessBucket,
  type BucketGroup,
  BUCKET_TO_CATEGORY,
  BUCKET_ORDER,
  BUCKET_TO_EFFECTIVENESS,
  BUCKET_GROUP_TITLE,
  CATEGORY_LABEL,
} from '../model';
import { Type } from '@/app/entities/type/model';

const toBucket = (eff: number): EffectivenessBucket | null => {
  if (eff === 4) return 'x4';
  if (eff === 2) return 'x2';
  if (eff === 0.5) return 'x0_5';
  if (eff === 0.25) return 'x0_25';
  if (eff === 0) return 'x0';
  return null;
};

export const groupTypeDefenses = (
  defenses: TypeDefense[],
): TypeDefenseGroupsView => {
  // 1. bucket별로 type 모으기 (빈 bucket은 자연스럽게 안 생김)
  const byBucket = new Map<EffectivenessBucket, Type[]>();

  for (const { attackerType, effectiveness } of defenses) {
    const bucket = toBucket(effectiveness);
    if (!bucket) continue; // 1배는 그룹핑 대상 아님

    const list = byBucket.get(bucket) ?? [];
    list.push(attackerType);
    byBucket.set(bucket, list);
  }

  // 2. BUCKET_ORDER 순서대로 BucketGroup 생성 (있는 것만)
  const bucketGroups: BucketGroup[] = BUCKET_ORDER.flatMap((bucket) => {
    const types = byBucket.get(bucket);
    if (!types || types.length === 0) return [];

    return [
      {
        bucket,
        effectiveness: BUCKET_TO_EFFECTIVENESS[bucket],
        types,
        title: BUCKET_GROUP_TITLE[bucket],
      },
    ];
  });

  // 3. category별로 BucketGroup 분배
  const buckets = {
    weakness: [] as BucketGroup[],
    resistance: [] as BucketGroup[],
    immunity: [] as BucketGroup[],
  };

  for (const group of bucketGroups) {
    const category = BUCKET_TO_CATEGORY[group.bucket];
    buckets[category].push(group);
  }

  return {
    weakness: {
      category: 'weakness',
      buckets: buckets.weakness,
      categoryLabel: CATEGORY_LABEL['weakness'],
    },
    resistance: {
      category: 'resistance',
      buckets: buckets.resistance,
      categoryLabel: CATEGORY_LABEL['resistance'],
    },
    immunity: {
      category: 'immunity',
      buckets: buckets.immunity,
      categoryLabel: CATEGORY_LABEL['immunity'],
    },
  };
};

const getTypeDefenseRows = async (typeIds: number[]) => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc('poke_type_defense', {
    defender_ids: typeIds,
    target_gen: 9,
  });

  if (error) {
    console.error('getTypeDefenseRows Error');
    throw error;
  }

  return data;
};

export const getTypeDefenses = async (typeIds: number[]) => {
  const [typeDefenseDtos, allType] = await Promise.all([
    getTypeDefenseRows(typeIds),
    getAllType(),
  ]);

  return groupTypeDefenses(
    typeDefenseDtos
      .map(({ attacker_type_id, effectiveness }) => {
        const attackerType = allType.find(({ id }) => id === attacker_type_id);

        if (attackerType) {
          return {
            attackerType,
            effectiveness,
          };
        }
        return null;
      })
      .filter((typeDefense) => typeDefense !== null),
  );
};
