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
    <div className={cn(isLoading ? 'opacity-70 ' : '', 'grid gap-16')}>
      <div className="flex flex-col gap-16 overflow-hidden max-w-3xl">
        <LevelUp
          moves={levelUpMoves}
          key={versionGroupId}
          versionGroupId={versionGroupIdNumber}
        />
        {restMoves.map(({ method, moves }) => (
          <Fragment key={method}>
            <Rest
              moves={moves}
              method={method}
              key={versionGroupId}
              versionGroupId={versionGroupId}
            />
          </Fragment>
        ))}
      </div>

      <div className="flex flex-col gap-16 overflow-hidden">
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
    </div>
  );
}
