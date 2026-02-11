'use client';

import { type PokeMovesView, usePokeMoves } from '../../model';
import MoveList from './move-list';
import SelectGroup from './select-group';
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
    selectedVersionGroup,
    selectedGen,
  } = usePokeMoves(moves);

  return (
    <div className="">
      <h3 className="text-2xl font-semibold border-b pb-2 mb-4 w-full">기술</h3>
      {/* <div className="h-1 bg-linear-to-r from-border to-border/60 rounded-xl mb-6 " /> */}
      <SelectGroup
        grouped={grouped}
        selectedGen={selectedGen}
        value={selectedVersionGroupId}
        selectedVersionGroup={selectedVersionGroup}
        onValueChange={setSelectedVersionGroupId}
      />
      {/* <div className="flex justify-end py-4">
        <div className=" max-w-64 w-full">
          <div className="text-sm py-1 font-medium">버전</div>
          <SelectVersion
            grouped={grouped}
            value={selectedVersionGroupId}
            onValueChange={setSelectedVersionGroupId}
          />
        </div>
      </div> */}

      {pokeMoves && selectedVersionGroupId && (
        <MoveList
          pokeMoves={pokeMoves}
          versionGroupId={selectedVersionGroupId}
        />
      )}
    </div>
  );
}
