import { describe, it, expect } from 'vitest';

import {
  formatFacet,
  parseAsFacets,
  parseFacet,
  removeFacetGroup,
  toggleFacet,
} from './facet-param';

const fire = { group: 'type', value: 'fire' };
const grass = { group: 'type', value: 'grass' };
const physical = { group: 'damageClass', value: 'physical' };

describe('parseFacet', () => {
  it('첫 구분자에서 그룹과 값으로 나눈다', () => {
    expect(parseFacet('type.fire')).toEqual(fire);
    expect(parseFacet('a.b.c')).toEqual({ group: 'a', value: 'b.c' });
  });

  it('구분자가 없거나 한쪽이 비면 null', () => {
    expect(parseFacet('fire')).toBeNull();
    expect(parseFacet('.fire')).toBeNull();
    expect(parseFacet('type.')).toBeNull();
    expect(parseFacet('')).toBeNull();
  });
});

describe('formatFacet', () => {
  it('그룹.값', () => {
    expect(formatFacet(physical)).toBe('damageClass.physical');
  });
});

describe('parseAsFacets', () => {
  it('URL 값의 순서를 지키고 형식이 틀린 항목은 뺀다', () => {
    expect(
      parseAsFacets.parse('type.fire_damageClass.physical_oops_type.grass'),
    ).toEqual([fire, physical, grass]);
  });

  it('직렬화하면 같은 순서의 한 값', () => {
    expect(parseAsFacets.serialize([fire, physical, grass])).toBe(
      'type.fire_damageClass.physical_type.grass',
    );
  });
});

describe('toggleFacet', () => {
  it('없으면 맨 뒤에 붙인다', () => {
    expect(toggleFacet([fire, physical], grass)).toEqual([
      fire,
      physical,
      grass,
    ]);
  });

  it('있으면 빼고 나머지 순서는 유지한다', () => {
    expect(toggleFacet([fire, physical, grass], physical)).toEqual([
      fire,
      grass,
    ]);
  });
});

describe('removeFacetGroup', () => {
  it('그 그룹만 빼고 순서는 유지한다', () => {
    expect(removeFacetGroup([fire, physical, grass], 'type')).toEqual([
      physical,
    ]);
  });
});
