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
  const { error, isLoading, levelUpMoves, restMoves, machineMoves } =
    useMoveData(pokeMoves, Number(versionGroupId));

  return (
    <div className={cn(isLoading ? 'opacity-70 ' : '', 'flex flex-col gap-4')}>
      <LevelUp moves={levelUpMoves} key={versionGroupId} />
      {restMoves.map(({ method, moves }) => (
        <Fragment key={method}>
          {levelUpMoves.length > 0 && (
            <div className="w-full h-px bg-border my-4" />
          )}
          <Rest moves={moves} method={method} />
        </Fragment>
      ))}

      {machineMoves.map(({ moves, machineType }) => (
        <Fragment key={machineType}>
          {(restMoves.length > 0 ||
            (restMoves.length === 0 && levelUpMoves.length > 0)) && (
            <div className="w-full h-px bg-border my-4" />
          )}
          <Machine moves={moves} machineType={machineType} />
        </Fragment>
      ))}
    </div>
  );
}
