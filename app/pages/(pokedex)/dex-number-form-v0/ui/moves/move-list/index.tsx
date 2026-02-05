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
    <div className={cn(isLoading ? 'opacity-70 ' : '', 'flex flex-col gap-16')}>
      <LevelUp
        moves={levelUpMoves}
        key={versionGroupId}
        versionGroupId={versionGroupIdNumber}
      />
      {restMoves.map(({ method, moves }) => (
        <Fragment key={method}>
          <Rest moves={moves} method={method} key={versionGroupId} />
        </Fragment>
      ))}

      {machineMoves.map(({ moves, machineType }) => (
        <Fragment key={machineType}>
          <Machine
            moves={moves}
            machineType={machineType}
            key={versionGroupId}
            versionGroupId={versionGroupIdNumber}
          />
        </Fragment>
      ))}
    </div>
  );
}
