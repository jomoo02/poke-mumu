import { describe, it, expect } from 'vitest';

import { makePoke } from '../base-stats-poke.fixture';

import {
  NAME_LANGUAGES,
  NAME_LANGUAGE_OPTIONS,
  getBaseName,
  getFormName,
  getNameLanguageLabel,
} from './name-language';

const GALAR = {
  identifier: 'galar',
  nameKo: '가라르의 모습',
  nameEn: 'Galarian',
  nameJa: 'ガラルのすがた',
  shortKo: '가라르',
};

const meowthGalar = makePoke({
  nameKo: '나옹',
  nameEn: 'Meowth',
  nameJa: 'ニャース',
  form: GALAR,
});

describe('NAME_LANGUAGE_OPTIONS', () => {
  it('언어마다 하나씩, NAME_LANGUAGES 순서로', () => {
    expect(NAME_LANGUAGE_OPTIONS.map((option) => option.value)).toEqual(
      NAME_LANGUAGES,
    );
  });

  it('언어 이름', () => {
    expect(getNameLanguageLabel('en')).toBe('영어');
  });
});

describe('getBaseName', () => {
  it('고른 언어의 이름. 폼은 붙이지 않는다', () => {
    expect(getBaseName(meowthGalar, 'ko')).toBe('나옹');
    expect(getBaseName(meowthGalar, 'en')).toBe('Meowth');
    expect(getBaseName(meowthGalar, 'ja')).toBe('ニャース');
  });
});

describe('getFormName', () => {
  it('약칭이 있는 폼은 고른 언어의 폼 정식 이름', () => {
    expect(getFormName(meowthGalar, 'ko')).toBe('가라르의 모습');
    expect(getFormName(meowthGalar, 'en')).toBe('Galarian');
    expect(getFormName(meowthGalar, 'ja')).toBe('ガラルのすがた');
  });

  it('폼이 없거나 이름에 폼이 들어간 경우(약칭 없음)는 null', () => {
    const pikachu = makePoke({ nameKo: '피카츄' });
    const mega = makePoke({
      nameKo: '메가리자몽X',
      nameEn: 'Mega Charizard X',
      form: { ...GALAR, shortKo: null },
    });

    expect(getFormName(pikachu, 'en')).toBeNull();
    expect(getFormName(mega, 'en')).toBeNull();
  });
});
