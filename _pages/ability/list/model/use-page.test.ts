import { describe, it, expect } from 'vitest';

import { parsePage } from './use-page';

describe('parsePage', () => {
  it.each([
    [null, 1],
    ['', 1],
    ['abc', 1],
    ['0', 1],
    ['-3', 1],
    ['2.7', 2],
    ['3', 3],
    ['99', 99],
  ])('parsePage(%j) → %s', (raw, expected) => {
    expect(parsePage(raw)).toBe(expected);
  });

  it('상한은 보정하지 않는다(총 페이지 수는 paginate가 안다)', () => {
    expect(parsePage('1000')).toBe(1000);
  });
});
