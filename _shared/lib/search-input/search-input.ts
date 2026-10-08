// 한글 호환 자모(ㄱ~ㆎ)로 끝나면 아직 음절이 완성되지 않은 중간 상태다.
// '맹ㅎ'처럼 낱자로 끝나는 값은 어떤 이름과도 일치하지 않아 결과가 0건이 되고,
// 목록이 비었다 다시 차면서 깜빡인다.
//
// 'IME 조합 중인지'로 판단하지 않는 이유: 한글 IME는 다음 글자가 들어와야
// 조합이 끝난다. '맹'은 ㅇ이 받침일지 다음 글자 초성일지 미정이라 여전히 조합
// 중이지만, 이미 완성된 음절이므로 검색되어야 한다.
//
// NFD(U+1100~U+11FF)는 제외한다. macOS에서 붙여넣은 자모 분리형 텍스트는
// 낱자로 끝나지만 유효한 검색어다.
const INCOMPLETE_JAMO_AT_END = /[ㄱ-ㆎ]$/;

const endsWithIncompleteJamo = (value: string): boolean =>
  INCOMPLETE_JAMO_AT_END.test(value);

export { endsWithIncompleteJamo };
