'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

import { formatNumber } from '@/app/shared/lib/format';
import { type Poke } from '@/app/entities/poke/model';

interface MobileNavProps {
  pokes: Poke[];
}

export default function MobileNav({ pokes }: MobileNavProps) {
  const params = useParams<{ dexNumber?: string }>();
  const dexNumber = Number(params.dexNumber);

  const prev = pokes.find((poke) => poke.dexNumber === dexNumber - 1);
  const next = pokes.find((poke) => poke.dexNumber === dexNumber + 1);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex">
        {prev && (
          <Link
            href={`/pokedex/${prev.dexNumber}/${prev.pokeKey}`}
            className="flex gap-2 items-center active:bg-accent hover:bg-accent rounded-xl py-2 px-4 bg-accent/70 overflow-hidden"
          >
            <ArrowLeftIcon className="size-4 text-muted-foreground" />
            <div className="flex items-center gap-1 overflow-hidden">
              <span className=" text-sm font-medium">
                {`${formatNumber(prev.dexNumber)}`}
              </span>
              <span className="font-medium text-sm truncate">{prev.name}</span>
            </div>
          </Link>
        )}
      </div>
      <div className="flex justify-end">
        {next && (
          <Link
            href={`/pokedex/${next.dexNumber}/${next.pokeKey}`}
            className="flex gap-2 items-center active:bg-accent hover:bg-accent rounded-xl py-2 px-4 bg-accent/70 overflow-hidden"
          >
            <div className="flex items-center gap-1 overflow-hidden">
              <span className=" text-sm font-medium">
                {`${formatNumber(next.dexNumber)}`}
              </span>
              <span className="font-medium text-sm truncate">{next.name}</span>
            </div>
            <ArrowRightIcon className="size-4 text-muted-foreground" />
          </Link>
        )}
      </div>
    </div>
  );
}
