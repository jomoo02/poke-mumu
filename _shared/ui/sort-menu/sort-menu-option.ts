interface SortMenuOption<K extends string> {
  key: K;
  // 기준 이름 (예: '위력')
  label: string;
}

type SortDirection = 'asc' | 'desc';

// 지금 정렬 방향. 화면엔 화살표만 보이고, 이름은 스크린리더용.
// 이름은 기준마다 어법이 달라 쓰는 쪽이 만들어 넘긴다
interface SortMenuOrder {
  // 지금 정렬 이름 (예: '위력 높은 순', '이름순')
  sortLabel: string;
  // 화살표: 오름차순 ↑, 내림차순 ↓ (표 머리글과 같은 규칙)
  direction: SortDirection;
  // 방향 칸을 누르면 바뀔 정렬 이름 (예: '위력 낮은 순')
  nextSortLabel: string;
}

// 표형 시트의 한 칸 (기준 + 방향)
interface SortMatrixDirection {
  direction: SortDirection;
  // 칸 글자 (예: '높은 순', '이름 역순')
  label: string;
  // 전체 이름 (예: '공격 높은 순'). 접근 이름
  sortLabel: string;
}

// 표형 시트의 한 줄: 기준 + [첫 방향, 반대 방향]
interface SortMatrixOption<K extends string> extends SortMenuOption<K> {
  directions: readonly [SortMatrixDirection, SortMatrixDirection];
}

// 페이지의 정렬 옵션(순서형·수치형) → 표형 시트 줄. 줄 이름에 기준이 있어 칸 글자는 짧게
// - 순서형(번호·이름): 오름차순부터. 칸은 정렬 이름 / '역순' ('번호순' / '역순')
// - 수치형: 내림차순(높은 순)부터. 칸은 '높은 순' / '낮은 순'
const toSortMatrixOptions = <K extends string>(
  options: readonly {
    key: K;
    label: string;
    kind: 'sequence' | 'amount';
    sortLabel: Record<SortDirection, string>;
  }[],
): SortMatrixOption<K>[] =>
  options.map(({ key, label, kind, sortLabel }) => {
    const toDirection = (direction: SortDirection): SortMatrixDirection => ({
      direction,
      label:
        kind === 'amount'
          ? direction === 'desc'
            ? '높은 순'
            : '낮은 순'
          : direction === 'asc'
            ? sortLabel.asc
            : '역순',
      sortLabel: sortLabel[direction],
    });

    return {
      key,
      label,
      directions:
        kind === 'amount'
          ? [toDirection('desc'), toDirection('asc')]
          : [toDirection('asc'), toDirection('desc')],
    };
  });

export type {
  SortMenuOption,
  SortMenuOrder,
  SortDirection,
  SortMatrixDirection,
  SortMatrixOption,
};

export { toSortMatrixOptions };
