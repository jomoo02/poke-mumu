import { describe, it, expect } from 'vitest';
import { createLoader } from 'nuqs/server';

import { keywordSearchParams } from './keyword-search-params';

const load = createLoader(keywordSearchParams);

describe('keywordSearchParams', () => {
  it('값이 없으면 빈 검색어', () => {
    expect(load('')).toEqual({ search: '' });
  });

  it('검색어', () => {
    expect(load('?search=피카').search).toBe('피카');
  });
});
