import { describe, it, expect } from 'vitest';

import { makeAbility, names } from '../../ability/list-ability.fixture';
import { filterAbilitiesByKeyword } from '../search-abilities';

describe('filterAbilitiesByKeyword', () => {
  const abilities = [
    makeAbility({ nameKo: '맹화', abilityNumber: 66 }),
    makeAbility({ nameKo: '터보블레이즈', abilityNumber: 163 }),
    makeAbility({ nameKo: '가시지않는향기', abilityNumber: 268 }),
  ];

  it('검색어가 비면 전부 남긴다', () => {
    expect(filterAbilitiesByKeyword(abilities, '')).toHaveLength(3);
    expect(filterAbilitiesByKeyword(abilities, '   ')).toHaveLength(3);
  });

  it('한글 이름 부분 일치', () => {
    expect(names(filterAbilitiesByKeyword(abilities, '블레이즈'))).toEqual([
      '터보블레이즈',
    ]);
  });

  it('띄어쓰기를 무시한다', () => {
    expect(names(filterAbilitiesByKeyword(abilities, '가시지 않는'))).toEqual([
      '가시지않는향기',
    ]);
  });

  it('자모 분리형(NFD) 검색어도 찾는다', () => {
    expect(
      names(filterAbilitiesByKeyword(abilities, '맹화'.normalize('NFD'))),
    ).toEqual(['맹화']);
  });

  it('특성 번호로는 찾지 않는다', () => {
    expect(filterAbilitiesByKeyword(abilities, '66')).toEqual([]);
  });

  it('일치하는 항목이 없으면 빈 배열', () => {
    expect(filterAbilitiesByKeyword(abilities, '없는특성')).toEqual([]);
  });
});
