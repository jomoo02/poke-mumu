import { describe, it, expect } from 'vitest';

import { getPageWindow } from './page-window';

describe('getPageWindow', () => {
  it('총 1페이지면 [1]', () => {
    expect(getPageWindow(1, 1)).toEqual([1]);
  });

  it('페이지 수가 적으면 ellipsis 없이 연속', () => {
    expect(getPageWindow(2, 4)).toEqual([1, 2, 3, 4]);
  });

  it('시작 근처면 1·2·3 … last', () => {
    expect(getPageWindow(1, 20)).toEqual([1, 2, 3, 'ellipsis', 20]);
  });

  it('중간이면 양쪽에 ellipsis', () => {
    expect(getPageWindow(10, 20)).toEqual([
      1,
      'ellipsis',
      9,
      10,
      11,
      'ellipsis',
      20,
    ]);
  });

  it('끝 근처면 1 … last-2·last-1·last', () => {
    expect(getPageWindow(20, 20)).toEqual([1, 'ellipsis', 18, 19, 20]);
  });
});
