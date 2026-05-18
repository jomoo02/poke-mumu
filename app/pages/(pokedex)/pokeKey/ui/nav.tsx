import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

import { formatNumber } from '@/app/shared/lib/format';
import { cn } from '@/app/shared/lib/cn';

import { type NavView } from '../model';

interface NavProps {
  prev: NavView | null;
  next: NavView | null;
}

export default function Nav({ prev, next }: NavProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex">{prev && <NavItem nav={prev} />}</div>
      <div className="flex justify-end">
        {next && <NavItem nav={next} direction="next" />}
      </div>
    </div>
  );
}

interface NavItemProps {
  nav: NavView;
  direction?: 'prev' | 'next';
}

function NavItem({ nav, direction = 'prev' }: NavItemProps) {
  const { pokeKey, dexNumber, nameKo } = nav;
  const formattedDexNumber = formatNumber(dexNumber);

  return (
    <Link
      href={`/pokedex/${pokeKey}`}
      className={cn(
        'flex gap-2 items-center active:bg-accent hover:bg-accent rounded-4xl h-10 px-4 bg-accent/70 overflow-hidden',
        direction === 'prev' ? 'pr-5' : 'pl-5',
      )}
    >
      {direction === 'prev' && (
        <ArrowLeftIcon className="size-4.5 text-foreground/70" />
      )}
      <div className="flex items-center gap-1.5 overflow-hidden">
        <span className="text-sm font-medium">{formattedDexNumber}</span>
        <span className="font-medium text-sm truncate">{nameKo}</span>
      </div>
      {direction === 'next' && (
        <ArrowRightIcon className="size-4.5 text-foreground/70" />
      )}
    </Link>
  );
}
