import { describe, it, expect } from 'vitest';

import { TYPE_IDENTIFIERS } from '../type';
import { getTypeColor } from './type-color';

describe('getTypeColor', () => {
  it.each(TYPE_IDENTIFIERS)('%s 는 자기 색 클래스를 가진다', (identifier) => {
    const { solid, soft } = getTypeColor(identifier);

    expect(solid).toContain(`bg-${identifier}`);
    expect(soft).toContain(`bg-${identifier}/10`);
  });

  it('모르는 identifier는 unknown 색으로 대체한다', () => {
    expect(getTypeColor('stellar')).toEqual(getTypeColor('unknown'));
  });
});
