import { SORT_OPTIONS, type SortDir } from '../../model/poke-sort/config';

// 정렬 키 + 방향을 사람이 읽는 문구로. 훅/URL에 의존하지 않는 순수 함수.
// - amount(스탯류): "…낮은 순" / "…높은 순"
// - sequence(도감번호·이름): "…순" / "…역순"
// - 알 수 없는 키는 첫 옵션(도감번호)으로 폴백.
export const getSortLabel = (key: string, dir: SortDir): string => {
  const option =
    SORT_OPTIONS.find((candidate) => candidate.key === key) ?? SORT_OPTIONS[0];

  if (option.kind === 'amount') {
    return dir === 'desc'
      ? `정렬: ${option.label} 높은 순`
      : `정렬: ${option.label} 낮은 순`;
  }

  return dir === 'asc'
    ? `정렬: ${option.label} 순`
    : `정렬: ${option.label} 역순`;
};
