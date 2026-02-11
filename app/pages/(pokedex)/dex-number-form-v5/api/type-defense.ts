import { createClient } from '@/app/shared/lib/supabase/client';
import { getAllType } from '@/app/entities/type/api';
import { TypeDefenseView } from '../model/type-defense';

export const getTypeDefenseDto = async (typeIds: number[]) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('type_effective')
    .select(
      `
        id,
        attacker_type_id,
        effectiveness
      `,
    )
    .in('defender_type_id', typeIds);

  if (error) {
    throw new Error(`${error.message}`);
  }

  if (!data || data.length === 0) {
    return [];
  }

  const attackerIds = [
    ...new Set(data.map(({ attacker_type_id }) => attacker_type_id)),
  ];

  const typeDefenseDto = attackerIds.map((id) => {
    const effectiveness = data
      .filter(({ attacker_type_id }) => attacker_type_id === id)
      .map(({ effectiveness }) => effectiveness)
      .reduce((acc, cur) => acc * cur, 1);

    return {
      effectiveness,
      attackerId: id,
    };
  });

  return typeDefenseDto;
};

export const getTypeDefenses = async (
  typeIds: number[],
): Promise<TypeDefenseView[]> => {
  'use cache';

  const [typeDefenseDTOs, allType] = await Promise.all([
    getTypeDefenseDto(typeIds),
    getAllType(),
  ]);

  return allType
    .filter((type) => type.identifier !== 'unknown')
    .map((dto) => {
      const attackerType = typeDefenseDTOs.find(
        ({ attackerId }) => attackerId === dto.id,
      );

      const effectiveness = attackerType ? attackerType.effectiveness : 1;

      return {
        effectiveness,
        attacker: dto,
      };
    });
};
