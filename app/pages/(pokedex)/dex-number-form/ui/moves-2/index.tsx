'use client';

import { type PokeMovesView } from '../../model/moves-2';
import usePokeMovesV2 from '../../model/moves-2/usePokeMovesV2';
import SelectGen from './select-gen';
import SelectVersionGroup from './select-version-group';
import MoveList from './move-list';
import {
  Section,
  SectionBorder,
  SectionContent,
  SectionDescription,
  SectionTitle,
} from '../section';
import { getSubjectParticle } from '@/app/shared/lib/utils';

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
    moves: pokeMoves,
    versionGroups,
  } = usePokeMovesV2(moves);

  const description = `${name}${getSubjectParticle(name)} 배울 수 있는 기술 목록`;

  return (
    <Section>
      <SectionBorder />
      <SectionTitle>기술</SectionTitle>
      <SectionDescription>{description}</SectionDescription>
      <SectionContent className="flex flex-col gap-6">
        <div className="overflow-x-auto">
          <SelectGen gen={gen} gens={gens} onChange={setGen} />
        </div>
        <div className="overflow-x-aut">
          <SelectVersionGroup
            versionGroup={versionGroup}
            versionGroups={versionGroups}
            onChange={setVersionGroup}
          />
        </div>
        <MoveList
          // key={versionGroup}
          pokeMoves={pokeMoves}
          versionGroupId={versionGroup ?? 0}
        />
      </SectionContent>
    </Section>
  );
}
