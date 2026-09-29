import Image from 'next/image';

import { cn } from '@/_shared/lib/cn';

import type { Poke } from '../model/poke';
import { getPokeArtworkSrc } from '../model/poke-img';

interface PokeArtworkProps {
  poke: Pick<Poke, 'sprite' | 'nameKo'>;
  alt?: string;
  className?: string;
  priority?: boolean;
}

export function PokeArtwork({
  poke,
  alt,
  className,
  priority = false,
}: PokeArtworkProps) {
  const src = getPokeArtworkSrc(poke);
  // const src = '/pokeball.svg';
  return (
    <div className={cn('w-80 h-80 relative', className)}>
      <Image
        src={src}
        alt={alt ?? poke.nameKo}
        fill
        className="object-contain"
        priority={priority}
      />
    </div>
  );
}
