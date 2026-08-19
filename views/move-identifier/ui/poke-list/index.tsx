import type { PokeLinkPoke } from '@/features/poke-link/model';
import { PokeLinkDesktop, PokeLinkMobile } from '@/features/poke-link/ui';
import { cn } from '@/shared/lib/cn';
import {
  PageLayoutSection,
  PageLayoutSectionDescription,
  PageLayoutSectionTitle,
} from '@/shared/ui/page-layout';

interface PokeListProps {
  pokes: PokeLinkPoke[] | null;
}

export default function PokeList({ pokes }: PokeListProps) {
  if (!pokes || pokes.length === 0) {
    return null;
  }
  return (
    <PageLayoutSection>
      <div className="flex flex-col gap-3">
        <PageLayoutSectionTitle>
          배우는 포켓몬({pokes.length})
        </PageLayoutSectionTitle>
        <PageLayoutSectionDescription>
          Champions 기준
        </PageLayoutSectionDescription>
      </div>
      <div
        className={cn(
          'grid flex-1 gap-6',
          'md:gap-12 sm:grid-cols-[repeat(auto-fill,minmax(128px,1fr))]',
        )}
      >
        {pokes.map((poke) => (
          <Poke key={poke.pokeKey} poke={poke} />
        ))}
      </div>
    </PageLayoutSection>
  );
}

function Poke({ poke }: { poke: PokeLinkPoke }) {
  return (
    <>
      <div className="sm:hidden">
        <PokeLinkMobile poke={poke} showForm />
      </div>
      <div className="hidden sm:block">
        <PokeLinkDesktop poke={poke} showForm />
      </div>
    </>
  );
}
