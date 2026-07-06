import { describe, it, expect } from 'vitest';

import { getSortLabel } from './lib';

describe('getSortLabel', () => {
  it('수량형(스탯) 내림차순 → "…높은 순"', () => {
    expect(getSortLabel('attack', 'desc')).toBe('공격 높은 순');
  });

  it('수량형(스탯) 오름차순 → "…낮은 순"', () => {
    expect(getSortLabel('attack', 'asc')).toBe('공격 낮은 순');
  });

  it('순서형 오름차순 → "…순"', () => {
    expect(getSortLabel('dex_number', 'asc')).toBe('도감번호 순');
  });

  it('순서형 내림차순 → "…역순"', () => {
    expect(getSortLabel('name', 'desc')).toBe('이름 역순');
  });

  it('알 수 없는 키는 첫 옵션(도감번호)으로 폴백', () => {
    expect(getSortLabel('unknown', 'asc')).toBe('도감번호 순');
  });
});
