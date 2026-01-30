export const checkTextIntergerType = (text: string) => {
  // // 빈 문자열이면 false 반환
  // if (text.trim() === '') return false;

  // // 숫자로 변환 후 NaN이 아닌지 확인
  // const num = Number(text);

  // return !Number.isNaN(num);
  const numericValue = Number(text);

  if (Number.isNaN(numericValue)) {
    return false;
  }

  if (/^-?\d+$/.test(text)) {
    return true;
  }

  return false;
};

export const checkTextLanguageKo = (text: string) => {
  return /^[가-힣]+$/.test(text);
};

const containsKorean = (text: string): boolean => {
  // 문자열에 한글이 하나라도 포함되어 있는지 확인
  return /[가-힣]/.test(text);
};

const formatNoSpaceInputText = (text: string = '') => {
  return containsKorean(text) ? text.replace(/\s/g, '') : text.trim();
};

export const checkEmptyText = (text: string) => {
  if (!text) {
    return true;
  }

  const noSpaceInputText = formatNoSpaceInputText(text);

  return noSpaceInputText === '';
};

export const getJongseongIndex = (char: string) => {
  const charCode = char.charCodeAt(0);

  if (charCode >= 0xac00 && charCode <= 0xd7a3) {
    const jongseong = (charCode - 0xac00) % 28;
    return jongseong;
  }
  return -1;
};

export const getDirectionalParticle = (word: string) => {
  const lastChar = word[word.length - 1];
  const jongseong = getJongseongIndex(lastChar);

  if (jongseong !== -1) {
    // 받침이 없거나 받침이 'ㄹ'인 경우 "로"
    if (jongseong === 0 || jongseong === 8) {
      return '로';
    }
    // 받침이 있는 경우 "으로"
    return '으로';
  }

  return '';
};
