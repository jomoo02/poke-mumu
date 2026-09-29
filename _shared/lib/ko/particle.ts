// 영문자 발음 (한국에서 통용되는 표기 기준)
const ALPHABET_READING: Record<string, string> = {
  A: '에이',
  B: '비',
  C: '씨',
  D: '디',
  E: '이',
  F: '에프',
  G: '지',
  H: '에이치',
  I: '아이',
  J: '제이',
  K: '케이',
  L: '엘',
  M: '엠',
  N: '엔',
  O: '오',
  P: '피',
  Q: '큐',
  R: '알',
  S: '에스',
  T: '티',
  U: '유',
  V: '브이',
  W: '더블유',
  X: '엑스',
  Y: '와이',
  Z: '제트',
};

const DIGIT_READING: Record<string, string> = {
  '0': '영',
  '1': '일',
  '2': '이',
  '3': '삼',
  '4': '사',
  '5': '오',
  '6': '육',
  '7': '칠',
  '8': '팔',
  '9': '구',
};

const HANGUL_START = 0xac00;
const HANGUL_END = 0xd7a3;
const JONGSEONG_COUNT = 28;

// 단어 끝을 읽었을 때의 마지막 한글 음절. 영문자·숫자는 발음으로 변환, 그 외는 null
const getLastKoreanSyllable = (word: string): string | null => {
  if (!word) {
    return null;
  }

  const lastChar = word[word.length - 1];
  const code = lastChar.charCodeAt(0);

  if (code >= HANGUL_START && code <= HANGUL_END) {
    return lastChar;
  }

  const reading =
    ALPHABET_READING[lastChar.toUpperCase()] ?? DIGIT_READING[lastChar];

  return reading ? reading[reading.length - 1] : null;
};

// 판단할 수 없으면(기호 등) null
const hasJongseong = (word: string): boolean | null => {
  const syllable = getLastKoreanSyllable(word);

  if (!syllable) {
    return null;
  }

  return (syllable.charCodeAt(0) - HANGUL_START) % JONGSEONG_COUNT !== 0;
};

const getSubjectParticle = (word: string): '이' | '가' =>
  hasJongseong(word) ? '이' : '가';

const getObjectParticle = (word: string): '을' | '를' =>
  hasJongseong(word) ? '을' : '를';

export { getSubjectParticle, getObjectParticle };
