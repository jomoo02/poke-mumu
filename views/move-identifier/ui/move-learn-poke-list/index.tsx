import { PokeLinkMobile } from '@/features/poke-link/ui';
import type { MoveLearnPoke } from '@/features/poke-move/api';
import {
  PageLayoutSection,
  PageLayoutSectionDescription,
  PageLayoutSectionTitle,
} from '@/shared/ui/page-layout';

interface MoveLearnPokeListProps {
  moveLearnPokes: MoveLearnPoke[];
  moveLearnMethods: {
    id: number;
    identifier: string;
    nameKo: string;
  }[];
}

export default function MoveLearnPokeList({
  moveLearnMethods,
  moveLearnPokes,
}: MoveLearnPokeListProps) {
  const grouped = moveLearnMethods
    .map(({ identifier, nameKo }) => ({
      identifier,
      label: nameKo,
      pokes: moveLearnPokes.filter(
        (p) => p.learnMethodIdentifier === identifier,
      ),
    }))
    .filter(({ pokes }) => pokes.length > 0);

  return (
    <PageLayoutSection>
      <div className="flex flex-col gap-3">
        <PageLayoutSectionTitle>기술 습득 가능 포켓몬</PageLayoutSectionTitle>
        <PageLayoutSectionDescription>
          스칼렛·바이올렛 버전 기준
        </PageLayoutSectionDescription>
      </div>

      <div className="flex flex-col gap-6">
        {grouped.map(({ identifier, label, pokes }) => (
          <div key={identifier} className="flex flex-col gap-6 min-w-0">
            <h3 className="text-xl font-semibold mt-3">{`${label}(${pokes.length})`}</h3>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-x-6 xl:gap-x-12 gap-y-4 md:gap-y-6">
              {pokes.map((poke) => (
                <PokeLinkMobile
                  key={poke.pokeKey}
                  poke={poke}
                  dexSuffix={
                    identifier === 'level-up' && poke.level != null ? (
                      <div className="text-sm text-foreground/70">
                        Lv.{poke.level}
                      </div>
                    ) : null
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageLayoutSection>
  );
}
