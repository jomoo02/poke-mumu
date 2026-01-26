'use client';

import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';

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
  const formattedNumber = `No.${formatNumber(dexNumber)}`;

  const href = `/pokedex/${dexNumber}/${species}`;

  return (
    <Link
      href={href}
      className={cn(
        'rounded-2xl group focus-visible:bg-accent focus-visible:outline-none focus-visible:ring-[3px] py-3 gap-2 sm:gap-4 flex items-center justify-between  focus-visible:ring-ring/50 hover:bg-accent active:bg-accent',
        direction === 'prev'
          ? 'text-right pr-4 sm:pr-6'
          : 'text-left pl-4 sm:pl-6',
      )}
      aria-label={
        direction === 'prev' ? `Previous Poke: ${name}` : `Next Poke: ${name}`
      }
    >
      {direction === 'prev' && (
        <span className="pl-3 sm:pl-4">
          <ChevronLeft className="size-5" />
        </span>
      )}
      <div className="flex flex-col flex-1">
        <span className={cn('text-sm text-muted-foreground')}>
          {formattedNumber}
        </span>
        <span>{name}</span>
      </div>
      {direction === 'next' && (
        <span className="pr-2 sm:pr-4">
          <ChevronRight className="size-5" />
        </span>
      )}
    </Link>
  );
}
