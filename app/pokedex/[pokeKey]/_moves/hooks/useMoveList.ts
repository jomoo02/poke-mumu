import {
  useState,
} from 'react';
import type { Moves } from '@/app/models/pokev4.type';

export default function useMoveList(moves: Moves) {
  const genList = moves.map(({ gen }) => gen);

  const initialTargetGen = genList.at(-1) || genList[0];

  const [targetGen, setTargetGen] = useState(initialTargetGen);

  const targetGenMoveList = moves.find(({ gen }) => gen === targetGen)?.genMoves || [];

  const handleTargetGen = (gen: number) => {
    if (gen >= 1 && gen <= 9) {
      setTargetGen(gen);
    }
  };

  return {
    genList,
    targetGen,
    handleTargetGen,
    targetGenMoveList,
  };
}
