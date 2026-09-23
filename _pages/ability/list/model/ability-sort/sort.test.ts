import { describe, it, expect } from 'vitest';

import type { AbilityDetail } from '@/_entities/ability/model';

import { DEFAULT_SORT, isSameSort, sortAbilities } from './sort';

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

describe('sortAbilities', () => {
  describe('이름', () => {
    const abilities = [
      makeAbility({ nameKo: '맹화' }),
      makeAbility({ nameKo: '가속' }),
      makeAbility({ nameKo: '급류' }),
    ];

    it('asc: 가나다순', () => {
      expect(
        names(sortAbilities(abilities, { sort: 'name', order: 'asc' })),
      ).toEqual(['가속', '급류', '맹화']);
    });

    it('desc: 가나다 역순', () => {
      expect(
        names(sortAbilities(abilities, { sort: 'name', order: 'desc' })),
      ).toEqual(['맹화', '급류', '가속']);
    });
  });

  describe('등장', () => {
    const abilities = [
      makeAbility({ nameKo: '하바네로분출', gen: 9, isChampions: true }),
      makeAbility({ nameKo: '파수견', gen: 9 }),
      makeAbility({ nameKo: '관통드릴', gen: 9, isChampions: true }),
      makeAbility({ nameKo: '가시지않는향기', gen: 9 }),
      makeAbility({ nameKo: '파워스폿', gen: 8 }),
      makeAbility({ nameKo: '맹화', gen: 3 }),
    ];

    it('asc: 세대 오름차순, 같은 세대에서는 일반 → 챔피언스', () => {
      expect(
        names(sortAbilities(abilities, { sort: 'appearance', order: 'asc' })),
      ).toEqual([
        '맹화',
        '파워스폿',
        '가시지않는향기',
        '파수견',
        '관통드릴',
        '하바네로분출',
      ]);
    });

    it('desc: 챔피언스 → 같은 세대 일반 → 이전 세대', () => {
      expect(
        names(sortAbilities(abilities, { sort: 'appearance', order: 'desc' })),
      ).toEqual([
        '관통드릴',
        '하바네로분출',
        '가시지않는향기',
        '파수견',
        '파워스폿',
        '맹화',
      ]);
    });

    it('같은 순위 안에서는 방향과 무관하게 가나다순', () => {
      const sameGen = [
        makeAbility({ nameKo: '파수견', gen: 9 }),
        makeAbility({ nameKo: '가시지않는향기', gen: 9 }),
      ];

      for (const order of ['asc', 'desc'] as const) {
        expect(
          names(sortAbilities(sameGen, { sort: 'appearance', order })),
        ).toEqual(['가시지않는향기', '파수견']);
      }
    });
  });

  it('원본 배열을 변형하지 않는다', () => {
    const abilities = [
      makeAbility({ nameKo: '맹화' }),
      makeAbility({ nameKo: '가속' }),
    ];

    sortAbilities(abilities, { sort: 'name', order: 'asc' });

    expect(names(abilities)).toEqual(['맹화', '가속']);
  });
});

describe('isSameSort', () => {
  it('sort와 order가 모두 같아야 같다', () => {
    expect(isSameSort(DEFAULT_SORT, { sort: 'name', order: 'asc' })).toBe(true);
    expect(isSameSort(DEFAULT_SORT, { sort: 'name', order: 'desc' })).toBe(
      false,
    );
    expect(isSameSort(DEFAULT_SORT, { sort: 'appearance', order: 'asc' })).toBe(
      false,
    );
  });
});
