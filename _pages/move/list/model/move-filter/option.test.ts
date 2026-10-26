import { describe, it, expect } from 'vitest';

import {
  TYPE_IDENTIFIERS,
  toSelectableTypes,
  type TypeDetail,
} from '@/_entities/type';
import { DAMAGE_CLASS_IDENTIFIERS } from '@/_entities/damage-class';

import { toFilterDamageClasses } from './option';
import { parseMoveFilter } from './move-filter';
import { FILTER_GROUP } from '../../config/move-list';

const typeDetail = (id: number, identifier: string): TypeDetail => ({
  id,
  identifier,
  nameKo: identifier,
  generation: 1,
  damageClassId: null,
});

describe('toFilterDamageClasses', () => {
  it('DB id 순서가 아닌 물리 → 특수 → 변화 순서로, 모르는 값은 뺀다', () => {
    const result = toFilterDamageClasses([
      { id: 1, identifier: 'status', nameKo: '변화' },
      { id: 3, identifier: 'special', nameKo: '특수' },
      { id: 9, identifier: 'magic', nameKo: '마법' },
      { id: 2, identifier: 'physical', nameKo: '물리' },
    ]);

    expect(result.map(({ identifier }) => identifier)).toEqual([
      'physical',
      'special',
      'status',
    ]);
  });
});

describe('선택지와 URL 검증의 기준이 같다', () => {
  it('타입 선택지로 나오는 값은 모두 URL에서 유효하고, 그 밖의 값은 무효다', () => {
    const optionValues = toSelectableTypes(
      [...TYPE_IDENTIFIERS].map((identifier, index) =>
        typeDetail(index + 1, identifier),
      ),
    ).map(({ identifier }) => identifier);

    const validInUrl = TYPE_IDENTIFIERS.filter(
      (identifier) =>
        parseMoveFilter([{ group: FILTER_GROUP.type, value: identifier }]).types
          .length > 0,
    );

    expect(validInUrl).toEqual(optionValues);
  });

  it('분류도 같다', () => {
    const optionValues = toFilterDamageClasses(
      DAMAGE_CLASS_IDENTIFIERS.map((identifier, index) => ({
        id: index + 1,
        identifier,
        nameKo: identifier,
      })),
    ).map(({ identifier }) => identifier);

    const validInUrl = DAMAGE_CLASS_IDENTIFIERS.filter(
      (identifier) =>
        parseMoveFilter([
          { group: FILTER_GROUP.damageClass, value: identifier },
        ]).damageClasses.length > 0,
    );

    expect(validInUrl).toEqual(optionValues);
  });
});
