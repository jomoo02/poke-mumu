'use client';

import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';

import { formatNumber } from '@/app/shared/lib/format';
import { cn } from '@/app/shared/lib/cn';

type Direction = 'prev' | 'next';

interface NavButtonProps {
  dexNumber: number;
  name: string;
  species: string;
  direction: Direction;
}

export default function NavButton({
  dexNumber,
  name,
  species,
  direction,
}: NavButtonProps) {
  const formattedNumber = `#${formatNumber(dexNumber)}`;

  const href = `/pokedex/${dexNumber}/${species}`;

  return (
    <Link
      href={href}
      className={cn(
        'rounded-xl group focus-visible:bg-accent focus-visible:outline-none focus-visible:ring-[3px] py-2 px-4 gap-2 sm:gap-4 flex items-center justify-between  focus-visible:ring-ring/50 hover:bg-accent active:bg-accent',
      )}
      aria-label={
        direction === 'prev' ? `Previous Poke: ${name}` : `Next Poke: ${name}`
      }
    >
      {direction === 'prev' && <ArrowLeft className="size-4" />}
      <div className="flex flex-col flex-1">
        <span className={cn('text-sm text-muted-foreground font-medium')}>
          {formattedNumber}
        </span>
        <span className="font-medium">{name}</span>
      </div>
      {direction === 'next' && <ArrowRight className="size-4" />}
    </Link>
  );
}
