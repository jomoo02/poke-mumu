import { describe, it, expect } from 'vitest';
import { createLoader } from 'nuqs/server';

import { languageSearchParams } from './language-search-params';

const load = createLoader(languageSearchParams);

describe('languageSearchParams', () => {
  it('이름 언어. 잘못된 값은 기본값(한국어)', () => {
    expect(load('').lang).toBe('ko');
    expect(load('?lang=ja').lang).toBe('ja');
    expect(load('?lang=fr').lang).toBe('ko');
  });
});
