import { describe, it, expect } from 'vitest';

import { getPageWindow } from './page-window';

describe('getPageWindow', () => {
  it('총 1페이지면 [1]', () => {
    expect(getPageWindow(1, 1, 7)).toEqual([1]);
  });

  it('capacity 안에 다 들어가면 전부 노출', () => {
    expect(getPageWindow(3, 6, 7)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('total === capacity면 전부 노출', () => {
    expect(getPageWindow(4, 7, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('넘치면 시작 근처는 앞을 채우고 뒤에 ellipsis', () => {
    expect(getPageWindow(1, 20, 7)).toEqual([1, 2, 3, 4, 5, 6, 'ellipsis', 20]);
  });

  it('넘치면 중간은 양쪽에 ellipsis', () => {
    expect(getPageWindow(10, 20, 7)).toEqual([
      1,
      'ellipsis',
      8,
      9,
      10,
      11,
      12,
      'ellipsis',
      20,
    ]);
  });

  it('넘치면 끝 근처는 뒤를 채우고 앞에 ellipsis', () => {
    expect(getPageWindow(20, 20, 7)).toEqual([
      1,
      'ellipsis',
      15,
      16,
      17,
      18,
      19,
      20,
    ]);
  });

  it('capacity가 작으면 그만큼만 노출(현재 주변 최소)', () => {
    expect(getPageWindow(10, 20, 3)).toEqual([
      1,
      'ellipsis',
      10,
      'ellipsis',
      20,
    ]);
  });
});
