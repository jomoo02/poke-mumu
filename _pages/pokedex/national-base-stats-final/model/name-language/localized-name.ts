import type { BaseStatsPoke } from '../base-stats-poke';
import type { NameLanguage } from './name-language-option';

// 세 언어 이름을 가진 것 (포켓몬·폼)
type LocalizedNames = Pick<BaseStatsPoke, 'nameKo' | 'nameEn' | 'nameJa'>;

const getLocalizedName = (
  names: LocalizedNames,
  language: NameLanguage,
): string =>
  language === 'ko'
    ? names.nameKo
    : language === 'en'
      ? names.nameEn
      : names.nameJa;

// 이름 줄: 폼을 붙이지 않은 고른 언어의 이름 (나옹 / Meowth / ニャース)
const getBaseName = (
  poke: Pick<BaseStatsPoke, 'nameKo' | 'nameEn' | 'nameJa'>,
  language: NameLanguage,
): string => getLocalizedName(poke, language);

/**
 * 모습 줄: 폼 정식 이름 (가라르의 모습 / Galarian / ガラルのすがた). 없으면 null.
 * 약칭이 있는 폼(shortKo)에만 붙인다. 메가진화처럼 이름에 폼이 이미 들어간 경우는 붙이지 않는다
 * (메가리자몽X / Mega Charizard X)
 */
const getFormName = (
  poke: Pick<BaseStatsPoke, 'form'>,
  language: NameLanguage,
): string | null =>
  poke.form?.shortKo ? getLocalizedName(poke.form, language) : null;

export { getLocalizedName, getBaseName, getFormName };
