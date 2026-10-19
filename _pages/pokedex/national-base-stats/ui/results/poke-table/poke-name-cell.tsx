import Link from 'next/link';

import { cn } from '@/_shared/lib/cn';
import { getPokeHref, getPokeName, type Poke } from '@/_entities/poke';

interface PokeNameCellProps {
  poke: Pick<Poke, 'pokeKey' | 'nameKo' | 'form'>;
}

export default function PokeNameCell({ poke }: PokeNameCellProps) {
  return (
    // after:absolute inset-0 — relative인 행 전체를 덮는 stretched link
    <Link
      href={getPokeHref(poke)}
      className={cn(
        'block truncate font-medium outline-none',
        'focus-visible:rounded-sm focus-visible:ring-[3px] focus-visible:ring-ring/50',
        'after:absolute after:inset-0 after:rounded-2xl',
      )}
    >
      {getPokeName(poke)}
    </Link>
  );
}
