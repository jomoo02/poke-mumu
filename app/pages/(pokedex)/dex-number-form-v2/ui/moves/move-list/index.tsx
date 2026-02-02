import { cn } from '@/app/shared/lib/cn';
import { PokeMoves, useMoveData } from '../../../model';
import LevelUp from './level-up';
import Machine from './machine';
import Rest from './rest';
import { Fragment } from 'react/jsx-runtime';

interface PokeMovesProps {
  versionGroupId: string;
  pokeMoves: PokeMoves;
}

export default function MoveList({
  versionGroupId,
  pokeMoves,
}: PokeMovesProps) {
  const versionGroupIdNumber = Number(versionGroupId);

  const { error, isLoading, levelUpMoves, restMoves, machineMoves } =
    useMoveData(pokeMoves, versionGroupIdNumber);

  return (
    <div
      key={versionGroupId}
      className={cn(
        isLoading ? 'opacity-70 ' : '',
        'grid xl:grid-cols-2 gap-16 xl:gap-32',
      )}
    >
      <div className="flex flex-col gap-16 overflow-hidden">
        <LevelUp
          moves={levelUpMoves}
          key={versionGroupId}
          versionGroupId={versionGroupIdNumber}
        />
        {restMoves.map(({ method, moves }) => (
          <Rest moves={moves} method={method} key={method} />
        ))}
      </div>

      <div className="flex flex-col gap-16 overflow-hidden">
        {machineMoves.map(({ moves, machineType }) => (
          <Machine
            moves={moves}
            machineType={machineType}
            key={machineType}
            versionGroupId={versionGroupIdNumber}
          />
        ))}
      </div>
    </div>
  );
}
