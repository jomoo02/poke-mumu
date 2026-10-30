import { describe, it, expect } from 'vitest';
import { createLoader } from 'nuqs/server';

import { pageSearchParams } from './use-page-param';

const load = createLoader(pageSearchParams);

describe('pageSearchParams', () => {
  it('페이지. 잘못된 값은 1', () => {
    expect(load('').page).toBe(1);
    expect(load('?page=3').page).toBe(3);
    expect(load('?page=0').page).toBe(1);
    expect(load('?page=foo').page).toBe(1);
  });
});
