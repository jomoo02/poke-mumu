import type { Move } from '@/_entities/move';

import MoveCard from './move-card';

interface MoveCardsProps {
  moves: Move[];
}

export default function MoveCards({ moves }: MoveCardsProps) {
  return (
    <ul>
      {moves.map((move) => (
        <MoveCard key={move.identifier} move={move} />
      ))}
    </ul>
  );
}
