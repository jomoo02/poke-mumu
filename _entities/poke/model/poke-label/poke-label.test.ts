import { describe, it, expect } from 'vitest';

import { formatDexNumber, getPokeName } from './poke-label';

describe('getPokeName', () => {
  it('폼이 없으면 이름만', () => {
    expect(getPokeName({ nameKo: '리자몽', form: null })).toBe('리자몽');
  });

  it('폼 약칭이 null이면 이름만 (메가: 이름에 이미 폼 포함)', () => {
    expect(
      getPokeName({
        nameKo: '메가리자몽X',
        form: { identifier: 'mega', nameKo: '메가진화', shortKo: null },
      }),
    ).toBe('메가리자몽X');
  });

  it('폼 약칭이 있으면 괄호로 붙인다', () => {
    expect(
      getPokeName({
        nameKo: '나옹',
        form: {
          identifier: 'galar',
          nameKo: '가라르의 모습',
          shortKo: '가라르',
        },
      }),
    ).toBe('나옹 (가라르)');
  });

  it('withForm: false면 약칭을 붙이지 않는다', () => {
    expect(
      getPokeName(
        {
          nameKo: '나옹',
          form: {
            identifier: 'galar',
            nameKo: '가라르의 모습',
            shortKo: '가라르',
          },
        },
        { withForm: false },
      ),
    ).toBe('나옹');
  });
});

// 숫자만 자릿수에 맞춰 0을 채운다 ('No.' 같은 접두사는 화면에서 붙인다)
describe('formatDexNumber', () => {
  it.each([
    [1, '0001'],
    [25, '0025'],
    [1025, '1025'],
  ])('formatDexNumber(%s) → %s', (dexNumber, expected) => {
    expect(formatDexNumber(dexNumber)).toBe(expected);
  });

  it('자릿수를 지정할 수 있다', () => {
    expect(formatDexNumber(25, 3)).toBe('025');
  });

  it('자릿수보다 긴 번호는 자르지 않는다', () => {
    expect(formatDexNumber(10000)).toBe('10000');
  });
});
