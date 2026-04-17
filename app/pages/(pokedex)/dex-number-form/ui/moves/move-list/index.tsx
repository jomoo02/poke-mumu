import { cn } from '@/app/shared/lib/cn';
import { PokeMoves, useMoveData } from '../../../model';
import LevelUp from './level-up';
import Machine from './machine';
import Rest from './rest';
import { Fragment } from 'react/jsx-runtime';
import MoveTable from '../move-table-v2';

interface PokeMovesProps {
  versionGroupId: string;
  pokeMoves: PokeMoves | undefined;
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
      className={cn(
        isLoading ? 'opacity-70 ' : '',
        'grid lg:grid-cols-1 gap-6',
        // open ? 'xl:grid-cols-2' : 'xl:grid-cols-2',
        // 'grid gap-16 2xl:grid-cols-2',
      )}
    >
      <div className={cn('flex flex-col gap-6 overflow-hidden w-full h-full')}>
        <MoveTable
          moves={levelUpMoves}
          key={versionGroupId}
          versionGroupId={versionGroupIdNumber}
          method="level_up"
        />

        {restMoves.map(({ method, moves }) => (
          <Fragment key={method}>
            <MoveTable
              moves={moves}
              method={method}
              key={versionGroupId}
              versionGroupId={versionGroupIdNumber}
            />
          </Fragment>
        ))}
        {/* <LevelUp
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
        ))} */}
      </div>

      <div className={cn('flex flex-col gap-6 overflow-hidden w-full')}>
        {machineMoves.map(({ moves, machineType }) => (
          <Fragment key={machineType}>
            <MoveTable
              moves={moves}
              method="machine"
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
