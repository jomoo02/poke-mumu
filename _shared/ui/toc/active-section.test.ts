import { describe, it, expect } from 'vitest';

import { getActiveSectionId } from './active-section';

const options = { threshold: 24, isAtBottom: false };

describe('getActiveSectionId', () => {
  it('섹션이 없으면 null', () => {
    expect(getActiveSectionId([], options)).toBeNull();
  });

  it('첫 섹션이 판정선에 닿기 전이면 null', () => {
    const sections = [
      { id: 'a', top: 200 },
      { id: 'b', top: 800 },
    ];
    expect(getActiveSectionId(sections, options)).toBeNull();
  });

  it('판정선을 지난 마지막 섹션을 고른다', () => {
    const sections = [
      { id: 'a', top: -600 },
      { id: 'b', top: -10 },
      { id: 'c', top: 400 },
    ];
    expect(getActiveSectionId(sections, options)).toBe('b');
  });

  it('긴 섹션 한가운데를 읽는 중이면 그 섹션을 유지한다', () => {
    const sections = [
      { id: 'a', top: -3000 },
      { id: 'b', top: 900 },
    ];
    expect(getActiveSectionId(sections, options)).toBe('a');
  });

  it('앵커 이동 직후(top 0)와 threshold 경계는 도달로 본다', () => {
    expect(
      getActiveSectionId(
        [
          { id: 'a', top: -500 },
          { id: 'b', top: 0 },
        ],
        options,
      ),
    ).toBe('b');
    expect(
      getActiveSectionId(
        [
          { id: 'a', top: -500 },
          { id: 'b', top: 24 },
        ],
        options,
      ),
    ).toBe('b');
  });

  it('페이지 바닥이면 마지막 섹션으로 고정한다', () => {
    const sections = [
      { id: 'a', top: -800 },
      { id: 'b', top: 100 },
      { id: 'c', top: 500 },
    ];
    expect(getActiveSectionId(sections, { ...options, isAtBottom: true })).toBe(
      'c',
    );
  });
});
