'use client';

import { useState } from 'react';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/shared/ui/card';
import type { MoveLearnPoke } from '@/features/poke-move/api';
import { PokeLinkMobile } from '@/features/poke-link/ui';
import { Button } from '@/shared/ui/button';

interface PokeListProps {
  title: string;
  pokes: MoveLearnPoke[];
}

const SLICE_COUNT = 5;

export default function PokeList({ title, pokes }: PokeListProps) {
  const [open, setOpen] = useState(false);

  const cardTitle = `${title}(${pokes.length})`;

  const group1 = pokes.slice(0, SLICE_COUNT);
  const group2 = pokes.slice(SLICE_COUNT);

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
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
            View All
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
