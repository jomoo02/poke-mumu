import { describe, it, expect } from 'vitest';

import { getTypeTriggerText, isTypeSelectionFull } from './lib';

const types = [
  { identifier: 'fire', nameKo: '불꽃' },
  { identifier: 'water', nameKo: '물' },
  { identifier: 'grass', nameKo: '풀' },
] as const;

describe('getTypeTriggerText', () => {
  it('선택이 없으면 "타입: 모든 타입"', () => {
    expect(getTypeTriggerText([], types)).toBe('타입: 모든 타입');
  });

  it('1개 선택 시 "타입: 라벨"', () => {
    expect(getTypeTriggerText(['fire'], types)).toBe('타입: 불꽃');
  });

  it('2개는 라벨을 콤마로 결합', () => {
    expect(getTypeTriggerText(['fire', 'water'], types)).toBe('타입: 불꽃, 물');
  });

  it('선택 순서를 그대로 보존한다', () => {
    expect(getTypeTriggerText(['water', 'fire'], types)).toBe('타입: 물, 불꽃');
  });

  it('타입 목록에 없는 identifier는 무시한다', () => {
    expect(getTypeTriggerText(['fire', 'unknown'], types)).toBe('타입: 불꽃');
  });
});

describe('isTypeSelectionFull', () => {
  it('상한 미만이면 false', () => {
    expect(isTypeSelectionFull(['fire'], 2)).toBe(false);
  });

  it('상한과 같으면 true', () => {
    expect(isTypeSelectionFull(['fire', 'water'], 2)).toBe(true);
  });

  it('상한 초과면 true', () => {
    expect(isTypeSelectionFull(['fire', 'water', 'grass'], 2)).toBe(true);
  });
});
