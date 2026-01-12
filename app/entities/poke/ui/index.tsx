import Image from 'next/image';

import { cn } from '@/app/shared/lib/cn';

import { getPokeSpriteSrc, getPokeArtworkSrc, type Poke } from '../model';

interface PokeSpriteProps {
  poke: Poke;
  className?: string;
  priority?: boolean;
}

export function PokeSprite({
  poke,
  className,
  priority = false,
}: PokeSpriteProps) {
  const { sprite } = poke;

  if (!sprite) {
    return <div className="size-14 bg-muted" />;
  }

  const src = getPokeSpriteSrc(sprite);
  const alt = poke.name;

  return (
    <div className={cn('w-14 h-14 relative', className)}>
      <Image
        placeholder="blur"
        blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
        src={src}
        alt={alt}
        fill
        style={{
          objectFit: 'contain',
        }}
        priority={priority}
      />
    </div>
  );
}

export function PokeArtwork({
  poke,
  className,
  priority = true,
}: PokeSpriteProps) {
  const { sprite } = poke;

  if (!sprite) {
    return <div className="size-80 bg-muted" />;
  }

  const src = getPokeArtworkSrc(sprite);
  const alt = poke.name;

  return (
    <div className={cn('w-80 h-80 relative', className)}>
      <Image
        placeholder="blur"
        blurDataURL="/pokeball.svg"
        src={src}
        alt={alt}
        fill
        style={{
          objectFit: 'contain',
        }}
        priority={priority}
      />
    </div>
  );
}
