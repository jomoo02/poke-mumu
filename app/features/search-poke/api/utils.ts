import { checkTextIntergerType, checkTextLanguageKo } from '../lib';

export const getSearchColumn = (inputValue: string) => {
  if (checkTextIntergerType(inputValue)) {
    return { column: 'no', value: inputValue };
  }

  if (checkTextLanguageKo(inputValue)) {
    return { column: 'name_ko', value: inputValue };
  }

  // 영어 이름 첫 글자를 대문자로 변환
  const nameEnValue = inputValue.replace(/\b\w/g, (char) => char.toUpperCase());

  return { column: 'name_en', value: nameEnValue };
};
