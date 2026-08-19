import type { MoveLearnPoke } from '@/features/poke-move/api';
import {
  PageLayoutSection,
  PageLayoutSectionDescription,
  PageLayoutSectionTitle,
} from '@/shared/ui/page-layout';

import PokeList from './poke-list';

interface MoveLearnPokeListProps {
  moveLearnPokes: MoveLearnPoke[];
  moveLearnMethods: {
    id: number;
    identifier: string;
    nameKo: string;
  }[];
}

export default function MoveLearnPokeListV2({
  moveLearnMethods,
  moveLearnPokes,
}: MoveLearnPokeListProps) {
  const grouped = moveLearnMethods
    .map(({ identifier, nameKo }) => ({
      identifier,
      title: nameKo,
      pokes: moveLearnPokes.filter(
        (p) => p.learnMethodIdentifier === identifier,
      ),
    }))
    .filter(({ pokes }) => pokes.length > 0);

  return (
    <PageLayoutSection>
      <div className="flex flex-col gap-3">
        <PageLayoutSectionTitle>배우는 포켓몬</PageLayoutSectionTitle>
        <PageLayoutSectionDescription>
          스칼렛·바이올렛 버전 기준
        </PageLayoutSectionDescription>
      </div>
      <div className="flex flex-col gap-6">
        {grouped.map(({ identifier, title, pokes }) => (
          <PokeList key={identifier} pokes={pokes} title={title} />
        ))}
      </div>
    </PageLayoutSection>
  );
}
