/**
 * 검색용 텍스트 정규화. 질의와 대상 양쪽에 반드시 같은 함수를 적용해야 한다.
 *
 * - normalize('NFC')
 *   자모 분리형(NFD) 한글을 완성형으로 통일한다. macOS에서 복사한 텍스트나
 *   일부 IME는 NFD로 들어오는데, 겉보기엔 같은 '가속'이어도 코드포인트가
 *   달라(2자 vs 5자) 문자열 비교에 실패한다.
 * - toLowerCase()
 *   영문 대소문자를 무시한다.
 * - 공백 제거
 *   띄어쓰기를 정확히 기억하지 못해도 찾히도록 한다.
 *   ('가시지 않는 향기'로 쳐도 '가시지않는향기'가 걸린다)
 */
export const normalizeSearchText = (text: string): string => {
  return text.normalize('NFC').toLowerCase().replace(/\s+/g, '');
};

/**
 * 질의를 한 번만 정규화해 재사용하는 매처를 만든다.
 * 목록 필터링처럼 항목마다 호출되는 곳에서 쓴다.
 *
 * 질의가 비면 항상 true를 반환한다(= 검색 조건 없음).
 * 정규화를 양쪽에 적용하는 규칙이 함수 안에 갇혀 있어 호출부가 실수할 여지가 없다.
 *
 * 대상은 호출할 때마다 정규화된다. 항목이 수천 단위로 늘면
 * 정규화된 사본을 미리 만들어 두는 편이 낫다.
 */
export const createSearchMatcher = (query: string) => {
  const keyword = normalizeSearchText(query);

  return function matches(...targets: (string | null | undefined)[]): boolean {
    if (keyword === '') {
      return true;
    }

    return targets.some(
      (target) =>
        target != null && normalizeSearchText(target).includes(keyword),
    );
  };
};
