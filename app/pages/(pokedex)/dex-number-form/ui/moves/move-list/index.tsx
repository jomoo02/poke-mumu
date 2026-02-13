import { cn } from '@/app/shared/lib/cn';
import { PokeMoves, useMoveData } from '../../../model';
import LevelUp from './level-up';
import Machine from './machine';
import Rest from './rest';
import { Fragment } from 'react/jsx-runtime';

import { useSidebar } from '@/app/shared/ui/sidebar';

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

  const { open } = useSidebar();

  return (
    <div
      className={cn(
        isLoading ? 'opacity-70 ' : '',
        'grid gap-10 xl:grid-cols-2',
        // open ? 'xl:grid-cols-2' : 'xl:grid-cols-2',
        // 'grid gap-16 2xl:grid-cols-2',
      )}
    >
      <div
        className={cn(
          'flex flex-col gap-10 overflow-hidden w-full max-w-xl xl:max-w-none  mx-auto 2xl:mx-0',
        )}
      >
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

      <div
        className={cn(
          'flex flex-col gap-10 overflow-hidden w-full max-w-xl xl:max-w-none  mx-auto 2xl:mx-0',
        )}
      >
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
