import PokeSortMenu from './poke-sort-menu';

interface PokeResultsHeaderProps {
  totalCount: number;
}

// 목록 머리 줄: 개수 + 정렬. 테이블이 보일 때도 버튼을 보여 현재 정렬을 글자로 알린다 (테이블 헤더로도 정렬 가능)
export default function PokeResultsHeader({
  totalCount,
}: PokeResultsHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-6">
      <p aria-live="polite" className="text-sm text-foreground/70 font-medium">
        전체 {totalCount}개
      </p>
      <div>
        <PokeSortMenu />
      </div>
    </div>
  );
}
