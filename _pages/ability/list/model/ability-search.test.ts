import { describe, it, expect } from 'vitest';

import type { AbilityDetail } from '@/_entities/ability/model';

import { filterAbilities } from './ability-search';

const makeAbility = (
  fields: Partial<AbilityDetail> & Pick<AbilityDetail, 'nameKo'>,
): AbilityDetail => ({
  id: 0,
  identifier: fields.nameKo,
  flavorText: '',
  nameEn: '',
  nameJa: '',
  gen: 1,
  isChampions: false,
  ...fields,
});

const names = (list: AbilityDetail[]) => list.map((a) => a.nameKo);

describe('filterAbilities', () => {
  const abilities = [
    makeAbility({ nameKo: '맹화', nameEn: 'Blaze', nameJa: 'もうか' }),
    makeAbility({
      nameKo: '터보블레이즈',
      nameEn: 'Turboblaze',
      nameJa: 'ターボブレイズ',
    }),
    makeAbility({
      nameKo: '가시지않는향기',
      nameEn: 'Lingering Aroma',
      nameJa: 'とれないにおい',
    }),
  ];

  it('검색어가 비면 전부 남긴다', () => {
    expect(filterAbilities(abilities, '')).toHaveLength(3);
    expect(filterAbilities(abilities, '   ')).toHaveLength(3);
  });

  it('한글 이름 부분 일치', () => {
    expect(names(filterAbilities(abilities, '블레이즈'))).toEqual([
      '터보블레이즈',
    ]);
  });

  it('영문 이름은 대소문자를 무시한다', () => {
    expect(names(filterAbilities(abilities, 'BLAZE'))).toEqual([
      '맹화',
      '터보블레이즈',
    ]);
  });

  it('일본어 이름으로도 찾는다', () => {
    expect(names(filterAbilities(abilities, 'もうか'))).toEqual(['맹화']);
  });

  it('띄어쓰기를 무시한다', () => {
    expect(names(filterAbilities(abilities, '가시지 않는'))).toEqual([
      '가시지않는향기',
    ]);
  });

  it('자모 분리형(NFD) 검색어도 찾는다', () => {
    expect(names(filterAbilities(abilities, '맹화'.normalize('NFD')))).toEqual(
      ['맹화'],
    );
  });

  it('일치하는 항목이 없으면 빈 배열', () => {
    expect(filterAbilities(abilities, '없는특성')).toEqual([]);
  });
});
