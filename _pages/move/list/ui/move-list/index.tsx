import type { Move } from '@/_entities/move';

import MoveItem from './move-item';

interface MoveListProps {
  moves: Move[];
}

export default function MoveList({ moves }: MoveListProps) {
  return (
    <ul>
      {moves.map((move) => (
        <MoveItem key={move.identifier} move={move} />
      ))}
    </ul>
  );
}
