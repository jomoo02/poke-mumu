'use client';

import { type PokeMovesView } from '../../model';
import usePokeMovesV2 from '../../model/moves/usePokeMoves-v2';
import MoveList from './move-list';
import SelectGen from './select-gen';
import SelectVersionGroup from './select-version-group';

import {
  Section,
  SectionBorder,
  SectionContent,
  SectionDescription,
  SectionTitle,
} from '../section';

interface MovesProps {
  moves: PokeMovesView[];
  name: string;
}

export default function Moves({ moves, name }: MovesProps) {
  const {
    gen,
    gens,
    setGen,
    versionGroup,
    setVersionGroup,
    moves: movesV2,
    versionGroups,
  } = usePokeMovesV2(moves);

  const description = `${name}이 배울 수 있는 기술 목록`;
  return (
    <Section>
      <SectionBorder />
      <SectionTitle>기술</SectionTitle>
      <SectionDescription>{description}</SectionDescription>
      <SectionContent className="flex flex-col gap-6">
        <div className=" pb-1 overflow-x-auto">
          <SelectGen gen={gen} gens={gens} onChange={setGen} />
        </div>
        <div className="pb-1 overflow-x-auto break-keep">
          <SelectVersionGroup
            versionGroup={versionGroup}
            versionGroups={versionGroups}
            onChange={setVersionGroup}
          />
        </div>
        <MoveList pokeMoves={movesV2} versionGroupId={String(versionGroup)} />
      </SectionContent>

      {/* {movesV2 && versionGroup && (
        <MoveList pokeMoves={movesV2} versionGroupId={String(versionGroup)} />
      )} */}
    </Section>
  );
}
