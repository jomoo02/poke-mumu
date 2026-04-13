'use client';

import { type PokeMovesView, usePokeMoves } from '../../model';
import usePokeMovesV2 from '../../model/moves/usePokeMoves-v2';
import MoveList from './move-list';
import SelectGen from './select-gen';
import SelectGroup from './select-group';
import SelectVersion from './select-version';
import SelectVersionGroup from './select-version-group';

interface MovesProps {
  moves: PokeMovesView[];
}

export default function Moves({ moves }: MovesProps) {
  const {
    pokeMoves,
    selectedVersionGroupId,
    setSelectedVersionGroupId,
    grouped,
    // selectedVersionGroup,
    selectedGen,

    // gens,
  } = usePokeMoves(moves);

  const {
    gen,
    gens,
    setGen,
    versionGroup,
    setVersionGroup,
    moves: movesV2,
    versionGroups,
    selectedVersionGroup,
  } = usePokeMovesV2(moves);

  return (
    <div className="p-6 bg-card border rounded-4xl flex flex-col gap-6">
      <h3 className="text-xl font-bold">기술</h3>
      {/* 
      <SelectGroup
        grouped={grouped}
        selectedGen={selectedGen}
        value={selectedVersionGroupId}
        selectedVersionGroup={selectedVersionGroup}
        onValueChange={setSelectedVersionGroupId}
      /> */}
      <div className=" pb-1 overflow-x-auto">
        <SelectGen gen={gen} gens={gens} onChange={setGen} />
      </div>
      <div className="pb-1 overflow-x-auto">
        <SelectVersionGroup
          versionGroup={versionGroup}
          versionGroups={versionGroups}
          onChange={setVersionGroup}
        />
      </div>

      <MoveList pokeMoves={movesV2} versionGroupId={String(versionGroup)} />

      {/* {movesV2 && versionGroup && (
        <MoveList pokeMoves={movesV2} versionGroupId={String(versionGroup)} />
      )} */}
    </div>
  );
}
