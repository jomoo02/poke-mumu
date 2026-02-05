'use client';

import { type PokeMovesView, usePokeMoves } from '../../model';
import MoveList from './move-list';
import SelectVersion from './select-version';

interface MovesProps {
  moves: PokeMovesView[];
}

export default function Moves({ moves }: MovesProps) {
  const {
    pokeMoves,
    selectedVersionGroupId,
    setSelectedVersionGroupId,
    grouped,
  } = usePokeMoves(moves);

  return (
    <div className="p-6 shadow-sm shadow-border rounded-2xl border border-border bg-card flex flex-col gap-2">
      <h3 className="text-2xl font-semibold mb-4 w-full">기술</h3>
      <div className="flex justify-end py-4">
        <div className=" max-w-64 w-full">
          <div className="text-sm py-1 font-medium">버전</div>
          <SelectVersion
            grouped={grouped}
            value={selectedVersionGroupId}
            onValueChange={setSelectedVersionGroupId}
          />
        </div>
      </div>

      {pokeMoves && selectedVersionGroupId && (
        <MoveList
          pokeMoves={pokeMoves}
          versionGroupId={selectedVersionGroupId}
        />
      )}
    </div>
  );
}
