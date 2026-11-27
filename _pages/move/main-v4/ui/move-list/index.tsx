import type { ListMove } from '../../model/move';
import type { SortKey } from '../../model/sort';
import MoveCard from './move-card';

interface MoveListProps {
  moves: ListMove[];
  // 카드에서 진하게 보일 정렬 기준
  sortKey: SortKey;
}

// lg 미만: 카드 목록, sm부터 2열 (정렬은 개수 줄의 정렬 버튼)
export default function MoveList({ moves, sortKey }: MoveListProps) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
      {moves.map((move) => (
        <li key={move.identifier}>
          <MoveCard move={move} sortKey={sortKey} />
        </li>
      ))}
    </ul>
  );
}
