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
import { PokeLinkDesktop, PokeLinkMobile } from '@/features/poke-link/ui';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/cn';

interface PokeListProps {
  title: string;
  pokes: MoveLearnPoke[];
}

const SLICE_COUNT = 6;

export default function PokeList({ title, pokes }: PokeListProps) {
  const [open, setOpen] = useState(false);

  const cardTitle = `${title}(${pokes.length})`;

  const group1 = pokes.slice(0, SLICE_COUNT);
  const group2 = pokes.slice(SLICE_COUNT);

  return (
    <div>
      <div className="flex flex-col gap-6">
        <div className="text-lg font-semibold">{cardTitle}</div>
        <div
          className={cn(
            'grid flex-1 gap-6',
            'sm:gap-6 md:gap-12 sm:grid-cols-[repeat(auto-fill,minmax(128px,1fr))]',
          )}
        >
          {group1.map((poke) => (
            <PokeLinkDesktop key={poke.pokeKey} poke={poke} showForm />
          ))}
          {open && (
            <>
              {group2.map((poke) => (
                <PokeLinkDesktop key={poke.pokeKey} poke={poke} showForm />
              ))}
            </>
          )}
        </div>
        {!open && group2.length > 0 && (
          <Button
            onClick={() => setOpen(true)}
            className="w-28 mx-auto font-semibold"
          >
            View All
          </Button>
        )}
      </div>
    </div>
  );
}
