import { cn } from '@/app/shared/lib/cn';
import { formatNumber } from '@/app/shared/lib/format';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

export type NavPoke = {
  dexNumber: number;
  name: string;
  species: string;
  id: number;
};

interface NavItemProps {
  poke: NavPoke;
  targetDexNumber?: string | number;
}

function NavItem({ poke, targetDexNumber }: NavItemProps) {
  const { dexNumber, name, species } = poke;
  const href = `/pokedex/${dexNumber}/${species}`;
  const formattedDexNumber = `#${formatNumber(dexNumber)}`;

  const isSelected = dexNumber === Number(targetDexNumber);

  return (
    <li>
      <Link
        href={href}
        className={cn(
          'flex flex-col py-1 px-2.5 hover:bg-accent rounded-xl',
          isSelected ? 'bg-accent' : '',
        )}
      >
        <span className="text-muted-foreground text-sm">
          {formattedDexNumber}
        </span>
        <span>{name}</span>
      </Link>
    </li>
  );
}

function MobileNavItem({
  poke,
  direction,
}: NavItemProps & { direction: 'prev' | 'next' }) {
  const { dexNumber, name, species } = poke;
  const href = `/pokedex/${dexNumber}/${species}`;
  const formattedDexNumber = `#${formatNumber(dexNumber)}`;

  return (
    <Link
      href={href}
      className="flex gap-2.5 items-center active:bg-accent hover:bg-accent rounded-lg py-1 px-2.5"
    >
      {direction === 'prev' && (
        <ArrowLeftIcon className="size-4 text-muted-foreground" />
      )}
      <div className={cn('flex flex-col')}>
        <span className="text-muted-foreground text-sm">
          {formattedDexNumber}
        </span>
        <span>{name}</span>
      </div>
      {direction === 'next' && (
        <ArrowRightIcon className="size-4 text-muted-foreground" />
      )}
    </Link>
  );
}

export { MobileNavItem, NavItem };
