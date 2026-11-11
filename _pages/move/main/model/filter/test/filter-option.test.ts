import { describe, it, expect } from 'vitest';

import type { DamageClass } from '@/_entities/damage-class';
import type { TypeDetail } from '@/_entities/type';

import { toMoveFilterOptions } from '../filter-option';

const typeDetail = (
  id: number,
  identifier: string,
  nameKo: string,
): TypeDetail => ({
  id,
  identifier,
  nameKo,
  generation: 1,
  damageClassId: null,
});

const damageClass = (
  id: number,
  identifier: string,
  nameKo: string,
): DamageClass => ({ id, identifier, nameKo });

describe('toMoveFilterOptions', () => {
  const types = [
    typeDetail(10, 'fire', '불꽃'),
    typeDetail(10001, 'unknown', '???'),
    typeDetail(1, 'normal', '노말'),
  ];

  // DB id 순서: 1 status, 2 physical, 3 special
  const damageClasses = [
    damageClass(1, 'status', '변화'),
    damageClass(2, 'physical', '물리'),
    damageClass(3, 'special', '특수'),
    damageClass(4, 'shadow', '???'),
  ];

  const options = toMoveFilterOptions(types, damageClasses);

  it('타입: 게임 표시 순서, unknown은 뺀다', () => {
    expect(options.type.map(({ value }) => value)).toEqual(['normal', 'fire']);
  });

  it('분류: 물리 → 특수 → 변화, 모르는 분류는 뺀다', () => {
    expect(options.damageClass.map(({ value, label }) => [value, label])).toEqual(
      [
        ['physical', '물리'],
        ['special', '특수'],
        ['status', '변화'],
      ],
    );
  });

  it('선택지에 아이콘을 그릴 값을 넣는다', () => {
    expect(options.type[0].type?.identifier).toBe('normal');
    expect(options.damageClass[0].damageClass?.identifier).toBe('physical');
  });
});
