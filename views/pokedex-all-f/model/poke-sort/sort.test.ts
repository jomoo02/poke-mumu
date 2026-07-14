import { describe, it, expect } from 'vitest';

import { type NationalPoke } from '../poke';
import { DEFAULT_SORT_DIR, DEFAULT_SORT_KEY } from './config';
import { applySort, parseSort } from './sort';

// 정렬에 필요한 필드만 채운 최소 픽스처.
const makePoke = (fields: {
  dexNumber: number;
  sortOrder?: number;
  nameKo?: string;
  attack?: number;
}): NationalPoke =>
  ({
    dexNumber: fields.dexNumber,
    sortOrder: fields.sortOrder ?? 0,
    nameKo: fields.nameKo ?? '',
    attack: fields.attack ?? 0,
  }) as unknown as NationalPoke;

describe('parseSort', () => {
  it('빈 파라미터 → 기본값(도감번호·오름차순)', () => {
    expect(parseSort(new URLSearchParams())).toEqual({
      sortKey: DEFAULT_SORT_KEY,
      sortDir: DEFAULT_SORT_DIR,
    });
  });

  it('유효한 sort/dir을 읽는다', () => {
    expect(parseSort(new URLSearchParams('sort=attack&dir=desc'))).toEqual({
      sortKey: 'attack',
      sortDir: 'desc',
    });
  });

  it('무효 키 → 기본 키, dir은 독립적으로 유지', () => {
    expect(parseSort(new URLSearchParams('sort=nope&dir=desc'))).toEqual({
      sortKey: DEFAULT_SORT_KEY,
      sortDir: 'desc',
    });
  });

  it('무효 dir → 기본 방향(asc)', () => {
    expect(parseSort(new URLSearchParams('sort=attack&dir=weird'))).toEqual({
      sortKey: 'attack',
      sortDir: 'asc',
    });
  });
});

describe('applySort', () => {
  it('공격 내림차순으로 정렬', () => {
    const pokes = [
      makePoke({ dexNumber: 1, attack: 49 }),
      makePoke({ dexNumber: 4, attack: 52 }),
      makePoke({ dexNumber: 7, attack: 48 }),
    ];

    const sorted = applySort(
      pokes,
      new URLSearchParams('sort=attack&dir=desc'),
    );

    expect(sorted.map((p) => p.attack)).toEqual([52, 49, 48]);
  });

  it('동점이면 dexNumber → sortOrder로 타이브레이크(방향 무관 항상 asc)', () => {
    const pokes = [
      makePoke({ dexNumber: 6, sortOrder: 1, attack: 84 }),
      makePoke({ dexNumber: 3, sortOrder: 2, attack: 84 }),
      makePoke({ dexNumber: 3, sortOrder: 0, attack: 84 }),
    ];

    const sorted = applySort(
      pokes,
      new URLSearchParams('sort=attack&dir=desc'),
    );

    expect(sorted.map((p) => [p.dexNumber, p.sortOrder])).toEqual([
      [3, 0],
      [3, 2],
      [6, 1],
    ]);
  });

  it('이름은 ko locale 순서로 정렬', () => {
    const pokes = [
      makePoke({ dexNumber: 1, nameKo: '이상해씨' }),
      makePoke({ dexNumber: 2, nameKo: '가나' }),
    ];

    const sorted = applySort(pokes, new URLSearchParams('sort=name&dir=asc'));

    expect(sorted.map((p) => p.nameKo)).toEqual(['가나', '이상해씨']);
  });

  it('원본 배열을 변형하지 않는다', () => {
    const pokes = [
      makePoke({ dexNumber: 2, attack: 10 }),
      makePoke({ dexNumber: 1, attack: 20 }),
    ];
    const snapshot = pokes.map((p) => p.dexNumber);

    applySort(pokes, new URLSearchParams('sort=attack&dir=desc'));

    expect(pokes.map((p) => p.dexNumber)).toEqual(snapshot);
  });
});
