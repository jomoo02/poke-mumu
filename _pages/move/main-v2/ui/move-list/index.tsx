import type { ListMove } from '../../model/move';
import MoveCard from './move-card';

interface MoveListProps {
  moves: ListMove[];
}

// lg 미만: 카드 목록, sm부터 2열 (정렬은 결과 줄의 정렬 버튼)
export default function MoveList({ moves }: MoveListProps) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
      {moves.map((move) => (
        <li key={move.identifier}>
          <MoveCard move={move} />
        </li>
      ))}
    </ul>
  );
}
