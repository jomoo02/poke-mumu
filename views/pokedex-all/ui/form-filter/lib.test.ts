import { describe, it, expect } from 'vitest';

import { getFormTriggerText } from './lib';

const options = [
  { identifier: 'mega', label: '메가진화' },
  { identifier: 'alola', label: '알로라의 모습' },
  { identifier: 'galar', label: '가라르의 모습' },
] as const;

describe('getFormTriggerText', () => {
  it('선택이 없으면 "모습: 모든 모습"', () => {
    expect(getFormTriggerText([], options)).toBe('모습: 모든 모습');
  });

  it('1개 선택 시 "모습: 라벨"', () => {
    expect(getFormTriggerText(['mega'], options)).toBe('모습: 메가진화');
  });

  it('2개 이상은 라벨을 콤마로 결합', () => {
    expect(getFormTriggerText(['mega', 'alola'], options)).toBe(
      '모습: 메가진화, 알로라의 모습',
    );
  });

  it('선택 순서를 그대로 보존한다', () => {
    expect(getFormTriggerText(['alola', 'mega'], options)).toBe(
      '모습: 알로라의 모습, 메가진화',
    );
  });

  it('옵션에 없는 identifier는 무시한다', () => {
    expect(getFormTriggerText(['mega', 'unknown'], options)).toBe(
      '모습: 메가진화',
    );
  });
});
