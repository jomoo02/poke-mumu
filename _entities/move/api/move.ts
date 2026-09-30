import { createClient } from '@/_shared/lib/supabase/client';

import type { Move } from '../model/move';

// move_current는 view라 모든 컬럼이 nullable로 생성된다
interface MoveDto {
  id: number | null;
  moveNumber: number | null;
  identifier: string | null;
  nameKo: string | null;
  nameEn: string | null;
  nameJa: string | null;
  typeId: number | null;
  typeIdentifier: string | null;
  typeNameKo: string | null;
  damageClassId: number | null;
  damageClassIdentifier: string | null;
  damageClassNameKo: string | null;
  power: number | null;
  accuracy: number | null;
  pp: number | null;
  description: string | null;
}

type MoveDtoRequiredField =
  | 'id'
  | 'moveNumber'
  | 'identifier'
  | 'nameKo'
  | 'typeId'
  | 'typeIdentifier'
  | 'typeNameKo';

type ValidMoveDto = MoveDto & {
  [K in MoveDtoRequiredField]: NonNullable<MoveDto[K]>;
};

// 식별·타입 정보가 빠진 기술은 목록에 그릴 수 없으므로 거른다
const isValidMoveDto = (dto: MoveDto): dto is ValidMoveDto =>
  dto.id != null &&
  dto.moveNumber != null &&
  dto.identifier != null &&
  dto.nameKo != null &&
  dto.typeId != null &&
  dto.typeIdentifier != null &&
  dto.typeNameKo != null;

const toMove = (dto: ValidMoveDto): Move => ({
  id: dto.id,
  moveNumber: dto.moveNumber,
  identifier: dto.identifier,
  nameKo: dto.nameKo,
  nameEn: dto.nameEn ?? '',
  nameJa: dto.nameJa ?? '',
  type: {
    id: dto.typeId,
    identifier: dto.typeIdentifier,
    nameKo: dto.typeNameKo,
  },
  damageClass:
    dto.damageClassId != null &&
    dto.damageClassIdentifier != null &&
    dto.damageClassNameKo != null
      ? {
          id: dto.damageClassId,
          identifier: dto.damageClassIdentifier,
          nameKo: dto.damageClassNameKo,
        }
      : null,
  // 변화 기술 일부가 power를 null이 아닌 0으로 갖고 있어 '위력 없음'으로 정규화한다
  // (0을 그대로 두면 위력 정렬에서 null 기술과 섞이고 화면에도 0이 노출된다)
  power: dto.power === 0 ? null : dto.power,
  accuracy: dto.accuracy,
  pp: dto.pp,
  description: dto.description ?? '',
});

export const getAllMove = async (): Promise<Move[]> => {
  'use cache';

  const supabase = createClient();

  const { data, error } = await supabase.from('move_current').select(
    `
      id,
      moveNumber:move_number,
      identifier,
      nameKo:name_ko,
      nameEn:name_en,
      nameJa:name_ja,
      typeId:type_id,
      typeIdentifier:type_identifier,
      typeNameKo:type_name_ko,
      damageClassId:damage_class_id,
      damageClassIdentifier:damage_class_identifier,
      damageClassNameKo:damage_class_name_ko,
      power,
      accuracy,
      pp,
      description
    `,
  );

  if (error) {
    throw new Error(`Failed to fetch moves: ${error.message}`);
  }

  return data.filter(isValidMoveDto).map(toMove);
};
