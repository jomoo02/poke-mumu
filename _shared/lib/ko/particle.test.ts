import { describe, it, expect } from 'vitest';

import { getObjectParticle, getSubjectParticle } from './particle';

describe('getObjectParticle', () => {
  it.each([
    ['맹화', '를'],
    ['위협', '을'],
    ['불꽃몸', '을'],
    ['스킬링크', '를'],
    ['A', '를'], // 에이
    ['M', '을'], // 엠
    ['3', '을'], // 삼
    ['2', '를'], // 이
    ['', '를'],
    ['!', '를'],
  ])('getObjectParticle(%s) → %s', (word, expected) => {
    expect(getObjectParticle(word)).toBe(expected);
  });
});

describe('getSubjectParticle', () => {
  it.each([
    ['맹화', '가'],
    ['위협', '이'],
    ['L', '이'], // 엘
    ['Z', '가'], // 제트
    ['', '가'],
  ])('getSubjectParticle(%s) → %s', (word, expected) => {
    expect(getSubjectParticle(word)).toBe(expected);
  });
});
