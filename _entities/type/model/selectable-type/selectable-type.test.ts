import { describe, it, expect } from 'vitest';

import type { TypeDetail } from '../type';

import { toSelectableTypes } from './selectable-type';

const typeDetail = (id: number, identifier: string): TypeDetail => ({
  id,
  identifier,
  nameKo: identifier,
  generation: 1,
  damageClassId: null,
});

describe('toSelectableTypes', () => {
  it('unknown과 모르는 identifier를 빼고 게임 표시 순서로 정렬한다', () => {
    const result = toSelectableTypes([
      typeDetail(11, 'water'),
      typeDetail(10001, 'unknown'),
      typeDetail(99, 'shadow-x'),
      typeDetail(1, 'normal'),
      typeDetail(10, 'fire'),
    ]);

    expect(result.map(({ identifier }) => identifier)).toEqual([
      'normal',
      'fire',
      'water',
    ]);
  });

  it('id, identifier, nameKo만 남긴다', () => {
    expect(toSelectableTypes([typeDetail(10, 'fire')])).toEqual([
      { id: 10, identifier: 'fire', nameKo: 'fire' },
    ]);
  });
});
