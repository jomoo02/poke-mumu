import { describe, it, expect } from 'vitest';

import {
  NAME_LANGUAGES,
  NAME_LANGUAGE_OPTIONS,
  getNameLanguageLabel,
} from './name-language-option';

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
