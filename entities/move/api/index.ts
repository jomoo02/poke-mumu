import { createClient } from '@/shared/lib/supabase/client';

import type { Move } from '../model';

interface MoveDto {
  id: number | null;
  identifier: string | null;
  generation: number | null;
  nameKo: string | null;
  nameEn: string | null;
  nameJa: string | null;
  description: string | null;
  power: number | null;
  pp: number | null;
  accuracy: number | null;
  typeIdentifier: string | null;
  typeNameKo: string | null;
  damageClassIdentifier: string | null;
  damageClassNameKo: string | null;
}

const adaptRecentMove = (moveDto: MoveDto): Move => {
  return {
    id: moveDto.id as number,
    identifier: moveDto.identifier as string,
    generation: moveDto.generation as number,
    nameKo: (moveDto.nameKo as string) ?? '',
    nameEn: (moveDto.nameEn as string) ?? '',
    nameJa: (moveDto.nameJa as string) ?? '',
    description: (moveDto.description as string) ?? '',
    // 변화 기술 일부가 power를 null이 아닌 0으로 갖고 있어 '위력 없음'으로 정규화한다.
    // (0을 그대로 두면 '위력 낮은순'에서 null 기술보다 앞에 오고 카드에도 0이 노출된다)
    power: moveDto.power === 0 ? null : (moveDto.power as number | null),
    pp: moveDto.pp as number | null,
    accuracy: moveDto.accuracy as number | null,
    typeIdentifier: (moveDto.typeIdentifier as string) ?? 'unknown',
    typeNameKo: (moveDto.typeNameKo as string) ?? '',
    damageClassIdentifier:
      (moveDto.damageClassIdentifier as string) ?? 'unknown',
    damageClassNameKo: (moveDto.damageClassNameKo as string) ?? '',
  };
};

export const getAllRecentMoves = async (): Promise<Move[]> => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase.from('move_current').select(
    `
      id,
      identifier,
      generation,
      nameKo:name_ko,
      nameEn:name_en,
      nameJa:name_ja,
      description,
      power,
      pp,
      accuracy,
      typeIdentifier:type_identifier,
      typeNameKo:type_name_ko,
      damageClassIdentifier:damage_class_identifier,
      damageClassNameKo:damage_class_name_ko
    `,
  );

  if (error) {
    throw error;
  }

  return (data ?? []).map(adaptRecentMove);
};
