import { describe, it, expect } from 'vitest';

import { isResettable } from './resettable';

const EMPTY_FILTER = { type: [], form: [], gen: [] };

describe('isResettable', () => {
  it('아무것도 켜져 있지 않으면 false', () => {
    expect(
      isResettable({ keyword: '', language: 'ko', filter: EMPTY_FILTER }),
    ).toBe(false);
  });

  it('검색어·이름 언어·필터 중 하나라도 켜져 있으면 true', () => {
    expect(
      isResettable({ keyword: '피카', language: 'ko', filter: EMPTY_FILTER }),
    ).toBe(true);
    expect(
      isResettable({ keyword: '', language: 'en', filter: EMPTY_FILTER }),
    ).toBe(true);
    expect(
      isResettable({
        keyword: '',
        language: 'ko',
        filter: { ...EMPTY_FILTER, gen: ['1'] },
      }),
    ).toBe(true);
  });
});
