import Image from 'next/image';

import { cn } from '@/_shared/lib/cn';

import type { Poke } from '../model/poke';
import { getPokeSpriteSrc } from '../model/poke-img';

interface PokeSpriteProps {
  poke: Pick<Poke, 'sprite' | 'nameKo'>;
  alt?: string;
  className?: string;
  priority?: boolean;
}

export function PokeSprite({
  poke,
  alt,
  className,
  priority = false,
}: PokeSpriteProps) {
  const src = getPokeSpriteSrc(poke);
  // const src = '/pokeball.svg';

  return (
    <div className={cn('relative size-14', className)}>
      <Image
        src={src}
        placeholder="blur"
        blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
        alt={alt ?? poke.nameKo}
        fill
        className="object-contain"
        priority={priority}
      />
    </div>
  );
}
