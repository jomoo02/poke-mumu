import { describe, it, expect } from 'vitest';

import { endsWithIncompleteJamo } from './search-input';

describe('endsWithIncompleteJamo', () => {
  it('호환 자모(낱자)로 끝나면 true', () => {
    expect(endsWithIncompleteJamo('맹ㅎ')).toBe(true);
    expect(endsWithIncompleteJamo('ㄱ')).toBe(true);
    expect(endsWithIncompleteJamo('냉도ㅇ')).toBe(true);
    expect(endsWithIncompleteJamo('ㅏ')).toBe(true);
  });

  it('완성된 음절·영문·숫자·빈 값은 false', () => {
    expect(endsWithIncompleteJamo('맹')).toBe(false);
    expect(endsWithIncompleteJamo('냉동빔')).toBe(false);
    expect(endsWithIncompleteJamo('Ice Beam')).toBe(false);
    expect(endsWithIncompleteJamo('10만')).toBe(false);
    expect(endsWithIncompleteJamo('')).toBe(false);
  });

  it('NFD 자모 분리형(붙여넣기)은 false', () => {
    expect(endsWithIncompleteJamo('냉동빔'.normalize('NFD'))).toBe(false);
  });
});
