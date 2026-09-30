import { describe, it, expect } from 'vitest';

import { DAMAGE_CLASS_IDENTIFIERS } from '../damage-class';
import { getDamageClassColor } from './damage-class-color';

describe('getDamageClassColor', () => {
  it('분류마다 서로 다른 색을 가진다', () => {
    const solids = DAMAGE_CLASS_IDENTIFIERS.map(
      (identifier) => getDamageClassColor(identifier).solid,
    );

    expect(new Set(solids).size).toBe(DAMAGE_CLASS_IDENTIFIERS.length);
  });

  it('모르는 identifier는 분류 색과 겹치지 않는 색으로 대체한다', () => {
    const unknown = getDamageClassColor('unknown');

    for (const identifier of DAMAGE_CLASS_IDENTIFIERS) {
      expect(unknown).not.toEqual(getDamageClassColor(identifier));
    }
  });
});
