import type { ListMove } from '../../model/move';
import Card from './card';
import { LIST_GRID_CLASS } from './list-layout';

interface MoveListProps {
  moves: ListMove[];
}

// lg 미만: 두 줄 카드 목록 (정렬은 결과 줄의 정렬 버튼)
export default function MoveList({ moves }: MoveListProps) {
  return (
    <ul className={LIST_GRID_CLASS}>
      {moves.map((move) => (
        <li key={move.identifier}>
          <Card move={move} />
        </li>
      ))}
    </ul>
  );
}
