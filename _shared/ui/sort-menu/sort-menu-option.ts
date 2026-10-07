interface SortMenuOption<K extends string> {
  key: K;
  // 기준 이름 (예: '위력')
  label: string;
}

// 지금 정렬 방향. 화면엔 화살표만 보이고, 이름은 스크린리더용.
// 이름은 기준마다 어법이 달라 쓰는 쪽이 만들어 넘긴다
interface SortMenuOrder {
  // 지금 정렬 이름 (예: '위력 높은 순', '이름순')
  sortLabel: string;
  // 화살표: 오름차순 ↑, 내림차순 ↓ (표 머리글과 같은 규칙)
  direction: 'asc' | 'desc';
  // 방향 칸을 누르면 바뀔 정렬 이름 (예: '위력 낮은 순')
  nextSortLabel: string;
}

export type { SortMenuOption, SortMenuOrder };
