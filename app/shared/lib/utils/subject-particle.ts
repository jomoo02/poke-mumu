/** 영문자 발음 (한국에서 통용되는 표기 기준) */
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

/** 숫자 발음 */
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

/**
 * 단어 끝 문자를 읽었을 때의 마지막 한글 음절을 추출합니다.
 * - 한글이면 그대로 반환
 * - 영문자/숫자면 발음으로 변환 후 마지막 글자 반환
 * - 그 외는 null
 */
function getLastKoreanSyllable(word: string): string | null {
  if (!word) return null;

  const lastChar = word[word.length - 1];
  const code = lastChar.charCodeAt(0);

  // 한글 음절
  if (code >= 0xac00 && code <= 0xd7a3) return lastChar;

  // 영문자 (대소문자 구분 없이)
  const upper = lastChar.toUpperCase();
  if (ALPHABET_READING[upper]) {
    const reading = ALPHABET_READING[upper];
    return reading[reading.length - 1];
  }

  // 숫자
  if (DIGIT_READING[lastChar]) {
    const reading = DIGIT_READING[lastChar];
    return reading[reading.length - 1];
  }

  return null;
}

export function getSubjectParticle(word: string): '이' | '가' {
  const syllable = getLastKoreanSyllable(word);
  if (!syllable) return '가';

  const code = syllable.charCodeAt(0);
  const hasJongseong = (code - 0xac00) % 28 !== 0;

  return hasJongseong ? '이' : '가';
}
