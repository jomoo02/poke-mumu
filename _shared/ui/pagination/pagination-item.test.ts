import { describe, it, expect } from 'vitest';

import { getPaginationItems, isEllipsis } from './pagination-item';

const L = 'ellipsis-left';
const R = 'ellipsis-right';

describe('getPaginationItems', () => {
  it('7페이지 이하면 전부 보여준다', () => {
    expect(getPaginationItems(1, 1)).toEqual([1]);
    expect(getPaginationItems(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('시작 근처: 앞쪽을 채우고 뒤에 ellipsis', () => {
    expect(getPaginationItems(1, 20)).toEqual([1, 2, 3, 4, 5, R, 20]);
  });

  it('가운데: 현재 ±2 양쪽에 ellipsis', () => {
    expect(getPaginationItems(10, 20)).toEqual([
      1, L, 8, 9, 10, 11, 12, R, 20,
    ]);
  });

  it('끝 근처: 뒤쪽을 채우고 앞에 ellipsis (시작 근처와 대칭)', () => {
    expect(getPaginationItems(20, 20)).toEqual([1, L, 16, 17, 18, 19, 20]);
  });

  // 개별 케이스가 놓칠 수 있는 규칙을 모든 조합에서 확인한다
  describe('모든 (현재, 총) 조합에서 지켜지는 규칙', () => {
    const cases = Array.from({ length: 30 }, (_, t) => t + 1).flatMap(
      (total) =>
        Array.from({ length: total }, (_, c) => [c + 1, total] as const),
    );

    it.each(cases)('current=%i, total=%i', (current, total) => {
      const items = getPaginationItems(current, total);
      const pages = items.filter((item): item is number => !isEllipsis(item));

      // 첫 페이지·마지막 페이지·현재 페이지는 항상 보인다
      expect(pages[0]).toBe(1);
      expect(pages.at(-1)).toBe(total);
      expect(pages).toContain(current);

      // 번호는 중복 없이 오름차순
      expect(pages).toEqual([...new Set(pages)].sort((a, b) => a - b));

      // 현재 바로 앞뒤 페이지는 ellipsis로 숨기지 않는다
      if (current > 1) expect(pages).toContain(current - 1);
      if (current < total) expect(pages).toContain(current + 1);

      // ellipsis는 좌우 한 번씩만, 연속으로 나오지 않는다
      expect(items.filter((item) => item === L).length).toBeLessThanOrEqual(1);
      expect(items.filter((item) => item === R).length).toBeLessThanOrEqual(1);
      items.forEach((item, i) => {
        if (isEllipsis(item)) expect(isEllipsis(items[i + 1])).toBe(false);
      });
    });
  });
});

describe('isEllipsis', () => {
  it('ellipsis만 true', () => {
    expect(isEllipsis(L)).toBe(true);
    expect(isEllipsis(R)).toBe(true);
    expect(isEllipsis(1)).toBe(false);
  });
});
