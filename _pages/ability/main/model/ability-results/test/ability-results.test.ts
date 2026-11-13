import { describe, it, expect } from 'vitest';

import { PAGE_SIZE } from '../../../config';
import { makeAbility, names } from '../../ability/list-ability.fixture';
import { DEFAULT_SORT } from '../../sort';
import {
  computeAbilityResults,
  type AbilityConditions,
} from '../ability-results';

const conditions = (
  partial: Partial<AbilityConditions>,
): AbilityConditions => ({
  keyword: '',
  sortState: DEFAULT_SORT,
  page: 1,
  ...partial,
});

const ABILITIES = [
  makeAbility({ nameKo: '맹화', abilityNumber: 66, gen: 3 }),
  makeAbility({ nameKo: '악취', abilityNumber: 1, gen: 3 }),
  makeAbility({ nameKo: '급류', abilityNumber: 67, gen: 3 }),
  makeAbility({ nameKo: '가속', abilityNumber: 3, gen: 3 }),
];

describe('computeAbilityResults', () => {
  it('조건이 없으면 전체를 이름순으로', () => {
    const result = computeAbilityResults(ABILITIES, conditions({}));

    expect(names(result.pageAbilities)).toEqual([
      '가속',
      '급류',
      '맹화',
      '악취',
    ]);
    expect(result.totalCount).toBe(4);
    expect(result.page).toBe(1);
    expect(result.totalPages).toBe(1);
  });

  it('검색 뒤 정렬', () => {
    const result = computeAbilityResults(
      ABILITIES,
      conditions({
        keyword: '류',
        sortState: { sort: 'name', order: 'desc' },
      }),
    );

    expect(names(result.pageAbilities)).toEqual(['급류']);
    expect(result.totalCount).toBe(1);
  });

  it('결과가 없으면 0개, 1페이지', () => {
    const result = computeAbilityResults(
      ABILITIES,
      conditions({ keyword: '없는특성' }),
    );

    expect(result.pageAbilities).toEqual([]);
    expect(result.totalCount).toBe(0);
    expect(result.page).toBe(1);
  });

  it('PAGE_SIZE로 나누고, 넘치는 페이지는 마지막 페이지로', () => {
    const many = Array.from({ length: PAGE_SIZE + 5 }, (_, index) =>
      makeAbility({ nameKo: `특성${index}`, abilityNumber: index + 1 }),
    );

    const result = computeAbilityResults(many, conditions({ page: 9 }));

    expect(result.totalPages).toBe(2);
    expect(result.page).toBe(2);
    expect(result.pageAbilities).toHaveLength(5);
    expect(result.totalCount).toBe(PAGE_SIZE + 5);
  });
});
