import { describe, it, expect } from 'vitest';

import { clampPage, paginate } from './index';

describe('clampPage', () => {
  it.each([
    [NaN, 1],
    [-3, 1],
    [0, 1],
    [1, 1],
    [2.7, 2],
    [4, 4],
    [99, 4],
    [Infinity, 4],
  ])('clampPage(%s, 4) → %s', (page, expected) => {
    expect(clampPage(page, 4)).toBe(expected);
  });

  it('totalPages가 1보다 작아도 1페이지로 본다', () => {
    expect(clampPage(3, 0)).toBe(1);
  });
});

describe('paginate', () => {
  const list = Array.from({ length: 313 }, (_, i) => i + 1);

  it('요청한 페이지만큼 잘라낸다', () => {
    expect(paginate(list, 2, 80)).toEqual({
      items: list.slice(80, 160),
      page: 2,
      totalPages: 4,
    });
  });

  it('마지막 페이지는 남은 개수만 담는다', () => {
    const result = paginate(list, 4, 80);

    expect(result.items).toHaveLength(73);
    expect(result.items[0]).toBe(241);
  });

  it('범위를 넘는 페이지는 끝 페이지로 보정한다', () => {
    expect(paginate(list, 99, 80).page).toBe(4);
    expect(paginate(list, NaN, 80).page).toBe(1);
  });

  it('빈 목록은 빈 1페이지다', () => {
    expect(paginate([], 5, 80)).toEqual({ items: [], page: 1, totalPages: 1 });
  });

  it('원본 배열을 변형하지 않는다', () => {
    const snapshot = [...list];

    paginate(list, 3, 80);

    expect(list).toEqual(snapshot);
  });

  it.each([0, -1, 2.5, NaN])('pageSize=%s 는 RangeError', (pageSize) => {
    expect(() => paginate(list, 1, pageSize)).toThrow(RangeError);
  });
});
