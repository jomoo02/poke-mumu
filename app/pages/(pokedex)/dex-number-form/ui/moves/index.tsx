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
    <div className=" rounded-2xl bg-card">
      {/* <h3 className="text-3xl font-bold pb-4 w-full">기술</h3> */}
      {/* 
      <SelectGroup
        grouped={grouped}
        selectedGen={selectedGen}
        value={selectedVersionGroupId}
        selectedVersionGroup={selectedVersionGroup}
        onValueChange={setSelectedVersionGroupId}
      /> */}
      <div className="flex gap-8 mb-8">
        <SelectGen gen={gen} gens={gens} onChange={setGen} />
        <SelectVersionGroup
          versionGroup={versionGroup}
          versionGroups={versionGroups}
          onChange={setVersionGroup}
        />
      </div>
      <div className="text-2xl font-semibold mb-8">
        {selectedVersionGroup?.label}
      </div>

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

      {/* {pokeMoves && selectedVersionGroupId && (
        <MoveList
          pokeMoves={pokeMoves}
          versionGroupId={selectedVersionGroupId}
        />
      )} */}

      <MoveList pokeMoves={movesV2} versionGroupId={String(versionGroup)} />

      {/* {movesV2 && versionGroup && (
        <MoveList pokeMoves={movesV2} versionGroupId={String(versionGroup)} />
      )} */}
    </div>
  );
}
