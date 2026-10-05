interface SortMenuOption<K extends string> {
  key: K;
  // 기준 이름 (예: '위력')
  label: string;
}

// 지금 선택된 정렬. 글자는 기준마다 어법이 달라 쓰는 쪽이 만들어 넘긴다
interface SortMenuSelected<K extends string> {
  key: K;
  // 목록의 선택된 줄 아래 방향 글자 (예: '높은 순', '가나다순')
  orderText: string;
  // 트리거·스크린리더에 쓰는 지금 정렬 (예: '위력 높은 순', '이름순')
  sortLabel: string;
  // 선택된 기준을 다시 누르면 바뀔 정렬 (스크린리더 안내용)
  nextSortLabel: string;
}

export type { SortMenuOption, SortMenuSelected };
