// 특성이 등장한 세대 목록. 필터 UI가 그리는 항목이자
// 목록 필터링에서 URL 값을 검증하는 기준이라 한곳에서만 정의한다.
const APPEARED_GENS = [3, 4, 5, 6, 7, 8, 9] as const;

const VALID_APPEARED_GENS: ReadonlySet<number> = new Set(APPEARED_GENS);

export { APPEARED_GENS, VALID_APPEARED_GENS };
