export type SortDir = 'asc' | 'desc';

// 방향 라벨 어법 구분:
// - sequence: 순서형(도감번호·이름) → "…순 / …역순"
// - amount:   수량형(스탯·위력 등)   → "…낮은 순 / …높은 순"
export type SortKind = 'sequence' | 'amount';

// 제네릭 정렬 옵션. accessor로 도메인 타입 T의 비교값을 뽑는다.
export interface SortOption<T> {
  key: string;
  label: string;
  kind: SortKind;
  accessor: (item: T) => number | string;
}

// 뷰가 주입하는 정렬 설정(IoC). feature 자체는 T를 모른다.
export interface SortConfig<T> {
  options: readonly SortOption<T>[];
  defaultKey: string;
  defaultDir?: SortDir; // 미지정 시 'asc'
  // 동점 타이브레이커(예: 도감번호 → sortOrder, move id). 없으면 원본 순서 유지.
  tieBreak?: (a: T, b: T) => number;
}
