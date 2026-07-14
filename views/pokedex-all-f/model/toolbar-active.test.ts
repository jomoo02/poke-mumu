import { describe, it, expect } from 'vitest';

import { isFilterOrSortActive } from './toolbar-active';

describe('isFilterOrSortActive', () => {
  it('빈 파라미터 → false', () => {
    expect(isFilterOrSortActive(new URLSearchParams())).toBe(false);
  });

  it('type 선택 → true', () => {
    expect(isFilterOrSortActive(new URLSearchParams('type=fire'))).toBe(true);
  });

  it('form 선택 → true', () => {
    expect(isFilterOrSortActive(new URLSearchParams('form=mega'))).toBe(true);
  });

  it('정렬 키가 기본이 아니면 → true', () => {
    expect(isFilterOrSortActive(new URLSearchParams('sort=attack'))).toBe(true);
  });

  it('정렬 방향이 기본이 아니면 → true', () => {
    expect(isFilterOrSortActive(new URLSearchParams('dir=desc'))).toBe(true);
  });

  it('기본 정렬 키(dex_number)만 있으면 → false', () => {
    expect(isFilterOrSortActive(new URLSearchParams('sort=dex_number'))).toBe(
      false,
    );
  });

  it('검색어는 활성 판정에서 제외 → false', () => {
    expect(isFilterOrSortActive(new URLSearchParams('search=이상해씨'))).toBe(
      false,
    );
  });
});
