import { SORT_OPTIONS } from '../../model/poke-sort';

// 정렬 키를 트리거 문구로. 훅/URL에 의존하지 않는 순수 함수.
// - 도감번호·이름의 순/역순 4종. 알 수 없는 키는 첫 옵션(도감번호 순)으로 폴백.
export const getSortLabel = (key: string): string => {
  const option =
    SORT_OPTIONS.find((candidate) => candidate.key === key) ?? SORT_OPTIONS[0];

  return `정렬: ${option.label}`;
};
