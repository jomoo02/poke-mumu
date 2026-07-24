import {
  PageLayoutSection,
  PageLayoutSectionDescription,
  PageLayoutSectionTitle,
} from '@/shared/ui/page-layout';
import { getObjectParticle } from '@/shared/lib/utils';
import { PokeLinkMobile } from '@/features/poke-link/ui';

import type { AbilityPoke } from '../model/poke';
import { cn } from '@/shared/lib/cn';

interface PokeWithAbilityProps {
  ability: string;
  pokes: AbilityPoke[];
}

export default function PokeWithAbility({
  ability,
  pokes,
}: PokeWithAbilityProps) {
  const description = `특성 ${ability}${getObjectParticle(ability)} 보유한 포켓몬 목록`;

  const normalPokes = pokes.filter((poke) => !poke.isHidden);

  const hiddenPokes = pokes.filter((poke) => poke.isHidden);

  return (
    <PageLayoutSection>
      <div className="flex flex-col gap-3">
        <PageLayoutSectionTitle>특성 보유 포켓몬</PageLayoutSectionTitle>
        <PageLayoutSectionDescription>
          {description}
        </PageLayoutSectionDescription>
      </div>
      <div className="grid md:grid-cols-2 gap-x-12 lg:gap-x-32 mt-3 gap-y-6">
        <PokeList type="normal" pokes={normalPokes} />
        <PokeList type="hidden" pokes={hiddenPokes} />
      </div>
    </PageLayoutSection>
  );
}

interface PokeListProps {
  type: 'normal' | 'hidden';
  pokes: AbilityPoke[];
}

function PokeList({ type, pokes }: PokeListProps) {
  const title = `${type === 'hidden' ? '숨겨진' : '일반'} 특성(${pokes.length})`;

  return (
    <div
      className={cn(
        'flex flex-col gap-6 min-w-0',
        pokes.length === 0 ? 'opacity-30' : 'opacity-100',
      )}
    >
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="flex flex-col gap-4 sm:max-w-md mx-auto w-full md:mx-0">
        {pokes.map((poke) => (
          <PokeLinkMobile key={poke.pokeKey} poke={poke} />
        ))}
      </div>
    </div>
  );
}
