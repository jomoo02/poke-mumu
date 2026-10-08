import { describe, it, expect } from 'vitest';

import {
  getFilterTriggerLabel,
  getFilterTriggerSummary,
  type FilterGroup,
} from './filter-group';

const group = (selected: string[]): FilterGroup => ({
  key: 'type',
  title: '타입',
  options: [
    { value: 'fire', label: '불꽃', tile: '불꽃' },
    { value: 'water', label: '물', tile: '물' },
    { value: 'grass', label: '풀', tile: '풀' },
  ],
  selected,
  onToggle: () => {},
  onReset: () => {},
  columns: 6,
});

describe('getFilterTriggerSummary', () => {
  it('선택이 없으면 first는 null', () => {
    expect(getFilterTriggerSummary(group([]))).toEqual({
      first: null,
      rest: 0,
    });
  });

  it('처음 고른 값(선택지 순서가 아님)과 나머지 수', () => {
    expect(getFilterTriggerSummary(group(['grass', 'fire', 'water']))).toEqual({
      first: '풀',
      rest: 2,
    });
  });
});

describe('getFilterTriggerLabel', () => {
  it('그룹 이름을 붙여 읽는다', () => {
    expect(getFilterTriggerLabel(group([]))).toBe('타입: 모든 타입');
    expect(getFilterTriggerLabel(group(['fire']))).toBe('타입: 불꽃');
    expect(getFilterTriggerLabel(group(['fire', 'water', 'grass']))).toBe(
      '타입: 불꽃 외 2개',
    );
  });
});
