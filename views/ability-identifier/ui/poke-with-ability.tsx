'use client';

import { useState } from 'react';

import {
  PageLayoutSection,
  PageLayoutSectionDescription,
  PageLayoutSectionTitle,
} from '@/shared/ui/page-layout';
import { getObjectParticle } from '@/shared/lib/utils';
import { PokeLinkMobile } from '@/features/poke-link/ui';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';

import type { AbilityPoke } from '../model/poke';
import { Button } from '@/shared/ui/button';

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
      <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
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

const SLICE_COUNT = 5;

function PokeList({ type, pokes }: PokeListProps) {
  const title = `${type === 'hidden' ? '숨겨진' : '일반'} 특성(${pokes.length})`;
  const [open, setOpen] = useState(false);

  const cardTitle = `${title}(${pokes.length})`;

  const group1 = pokes.slice(0, SLICE_COUNT);
  const group2 = pokes.slice(SLICE_COUNT);
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="gap-0">
        {group1.map((poke) => (
          <div
            key={poke.pokeKey}
            className="border-b py-3 first:pt-0 last:border-b-0 flex flex-col gap-2"
          >
            <PokeLinkMobile key={poke.pokeKey} poke={poke} showForm />
          </div>
        ))}
        {open && (
          <>
            {group2.map((poke) => (
              <div
                key={poke.pokeKey}
                className="border-b py-3 first:pt-0 last:border-b-0 flex flex-col gap-2"
              >
                <PokeLinkMobile key={poke.pokeKey} poke={poke} showForm />
              </div>
            ))}
          </>
        )}
      </CardContent>
      {group2.length > 0 && !open && (
        <CardFooter>
          <Button
            onClick={() => setOpen(true)}
            className="w-full font-semibold"
          >
            모두 보기
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
