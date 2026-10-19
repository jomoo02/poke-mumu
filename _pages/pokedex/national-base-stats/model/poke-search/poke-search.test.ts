import { describe, it, expect } from 'vitest';

import { filterPokesByKeyword } from './poke-search';
import { makePoke, names } from '../base-stats-poke.fixture';

describe('filterPokesByKeyword', () => {
  const pokes = [
    makePoke({
      nameKo: '피카츄',
      nameEn: 'Pikachu',
      nameJa: 'ピカチュウ',
      dexNumber: 25,
    }),
    makePoke({
      nameKo: '나옹',
      nameEn: 'Meowth',
      dexNumber: 52,
      form: { identifier: 'galar', nameKo: '가라르의 모습', shortKo: '가라르' },
    }),
    makePoke({ nameKo: '라이츄', nameEn: 'Raichu', dexNumber: 26 }),
  ];

  it('검색어가 비면 전부 남긴다', () => {
    expect(names(filterPokesByKeyword(pokes, ''))).toEqual([
      '피카츄',
      '나옹',
      '라이츄',
    ]);
  });

  it('한글·영문(대소문자 무시)·일본어 이름', () => {
    expect(names(filterPokesByKeyword(pokes, '츄'))).toEqual([
      '피카츄',
      '라이츄',
    ]);
    expect(names(filterPokesByKeyword(pokes, 'meow'))).toEqual(['나옹']);
    expect(names(filterPokesByKeyword(pokes, 'ピカ'))).toEqual(['피카츄']);
  });

  it('폼 이름', () => {
    expect(names(filterPokesByKeyword(pokes, '가라르'))).toEqual(['나옹']);
  });

  it('숫자만 입력하면 도감 번호가 같은 포켓몬 (앞의 0 무시)', () => {
    expect(names(filterPokesByKeyword(pokes, '025'))).toEqual(['피카츄']);
    expect(names(filterPokesByKeyword(pokes, ' 26 '))).toEqual(['라이츄']);
  });

  it('번호 일부만으로는 찾지 않는다', () => {
    expect(names(filterPokesByKeyword(pokes, '2'))).toEqual([]);
  });
});
