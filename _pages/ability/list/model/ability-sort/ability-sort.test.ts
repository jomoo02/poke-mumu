import { describe, it, expect } from 'vitest';

import { sortAbilities, type AbilitySort } from './ability-sort';
import { makeAbility, names } from '../ability.fixture';

const sortNames = (...args: Parameters<typeof sortAbilities>) =>
  names(sortAbilities(...args));

const asc = (sort: AbilitySort['sort']): AbilitySort => ({
  sort,
  order: 'asc',
});
const desc = (sort: AbilitySort['sort']): AbilitySort => ({
  sort,
  order: 'desc',
});

describe('sortAbilities', () => {
  describe('번호', () => {
    const abilities = [
      makeAbility({ nameKo: '파동의방호', abilityNumber: 319 }),
      makeAbility({ nameKo: '악취', abilityNumber: 1 }),
      makeAbility({ nameKo: '맹화', abilityNumber: 66 }),
    ];

    it('asc: 공식 번호 순', () => {
      expect(sortNames(abilities, asc('abilityNumber'))).toEqual([
        '악취',
        '맹화',
        '파동의방호',
      ]);
    });

    it('desc: 공식 번호 역순', () => {
      expect(sortNames(abilities, desc('abilityNumber'))).toEqual([
        '파동의방호',
        '맹화',
        '악취',
      ]);
    });
  });

  describe('이름', () => {
    const abilities = [
      makeAbility({ nameKo: '맹화' }),
      makeAbility({ nameKo: '가속' }),
      makeAbility({ nameKo: '급류' }),
    ];

    it('asc: 가나다순', () => {
      expect(sortNames(abilities, asc('name'))).toEqual([
        '가속',
        '급류',
        '맹화',
      ]);
    });

    it('desc: 가나다 역순', () => {
      expect(sortNames(abilities, desc('name'))).toEqual([
        '맹화',
        '급류',
        '가속',
      ]);
    });
  });

  describe('등장', () => {
    const abilities = [
      makeAbility({
        nameKo: '하바네로분출',
        gen: 9,
        isChampions: true,
        abilityNumber: 318,
      }),
      makeAbility({ nameKo: '파수견', gen: 9, abilityNumber: 275 }),
      makeAbility({
        nameKo: '관통드릴',
        gen: 9,
        isChampions: true,
        abilityNumber: 311,
      }),
      makeAbility({ nameKo: '가시지않는향기', gen: 9, abilityNumber: 268 }),
      makeAbility({ nameKo: '파워스폿', gen: 8, abilityNumber: 249 }),
      makeAbility({ nameKo: '맹화', gen: 3, abilityNumber: 66 }),
    ];

    it('asc: 세대 오름차순, 같은 세대에서는 일반 → 챔피언스, 같은 순위는 번호순', () => {
      expect(sortNames(abilities, asc('appearance'))).toEqual([
        '맹화',
        '파워스폿',
        '가시지않는향기',
        '파수견',
        '관통드릴',
        '하바네로분출',
      ]);
    });

    it('desc: 챔피언스 → 같은 세대 일반 → 이전 세대, 같은 순위는 여전히 번호순', () => {
      expect(sortNames(abilities, desc('appearance'))).toEqual([
        '관통드릴',
        '하바네로분출',
        '가시지않는향기',
        '파수견',
        '파워스폿',
        '맹화',
      ]);
    });

    it('동점 순서는 방향과 무관하게 같다', () => {
      const tied = (order: AbilitySort['order']) =>
        sortNames(abilities, { sort: 'appearance', order }).filter((name) =>
          ['가시지않는향기', '파수견'].includes(name),
        );

      expect(tied('asc')).toEqual(tied('desc'));
    });
  });

  it('원본 배열을 바꾸지 않는다', () => {
    const abilities = [
      makeAbility({ nameKo: '맹화' }),
      makeAbility({ nameKo: '가속' }),
    ];

    sortAbilities(abilities, asc('name'));

    expect(names(abilities)).toEqual(['맹화', '가속']);
  });
});
