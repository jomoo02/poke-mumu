'use client';

import { type PokeMovesView } from '../../model/moves-2';
import usePokeMovesV2 from '../../model/moves/usePokeMoves-v2';
import SelectGen from '../moves/select-gen';
import SelectVersionGroup from '../moves/select-version-group';
import MoveList from './move-list';
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
  const { gen, gens, setGen, versionGroup, setVersionGroup, moves: pokeMoves, versionGroups } =
    usePokeMovesV2(moves);

  return (
    <Section>
      <SectionBorder />
      <SectionTitle>기술</SectionTitle>
      <SectionDescription>{name}이 배울 수 있는 기술 목록</SectionDescription>
      <SectionContent className="flex flex-col gap-6">
        <div className="pb-1 overflow-x-auto">
          <SelectGen gen={gen} gens={gens} onChange={setGen} />
        </div>
        <div className="pb-1 overflow-x-auto">
          <SelectVersionGroup
            versionGroup={versionGroup}
            versionGroups={versionGroups}
            onChange={setVersionGroup}
          />
        </div>
        <MoveList pokeMoves={pokeMoves} versionGroupId={versionGroup ?? 0} />
      </SectionContent>
    </Section>
  );
}
