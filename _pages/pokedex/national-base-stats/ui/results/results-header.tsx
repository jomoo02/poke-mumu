import type { PokeSort, SortKey, SortOrder } from '../../model/poke-sort';

import SortSheet from './sort-sheet';

interface ResultsHeaderProps {
  totalCount: number;
  sortState: PokeSort;
  onSelectSortKey: (key: SortKey) => void;
  onSelectSortOrder: (order: SortOrder) => void;
}

/**
 * 목록 머리 줄: [개수 ↔ 정렬 시트 버튼(@5xl 미만)]
 * @5xl 이상은 테이블 머리글로 정렬해 정렬 버튼을 숨긴다.
 * 이름 언어는 검색 대상도 정해서 검색창 앞에 있다
 */
export default function ResultsHeader({
  totalCount,
  sortState,
  onSelectSortKey,
  onSelectSortOrder,
}: ResultsHeaderProps) {
  return (
    // min-h-8: 정렬 버튼이 숨는 넓은 본문에서도 줄 높이가 같게
    <div className="flex min-h-8 items-center justify-between gap-3">
      <p
        aria-live="polite"
        className="shrink-0 text-sm font-medium text-foreground/70"
      >
        {totalCount.toLocaleString('ko-KR')} Pokémon
      </p>
      <SortSheet
        sortState={sortState}
        onSelectKey={onSelectSortKey}
        onSelectOrder={onSelectSortOrder}
        className="@5xl:hidden"
      />
    </div>
  );
}
