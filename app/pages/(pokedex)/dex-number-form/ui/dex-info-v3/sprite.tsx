import { getPokeArtworkSrc } from '@/app/entities/poke/model';
import { DexInfoView } from '../../model';
import { cn } from '@/app/shared/lib/cn';
import Image from 'next/image';
import { Type } from '@/app/entities/type/model';

interface PokeSpriteProps {
  poke: DexInfoView;
  className?: string;
  priority?: boolean;
  type?: Type;
}
export default function MainSprite({
  poke,
  className,
  type,
  priority = true,
}: PokeSpriteProps) {
  const { sprite } = poke;

  if (!sprite) {
    return <div className="size-80 bg-muted" />;
  }

  const src = getPokeArtworkSrc(sprite);
  const alt = poke.name;

  const bgType = type ? `bg-${type.identifier}` : '';

  return (
    <div className={cn('w-80 h-80 relative', className)}>
      <div
        className={cn(
          'absolute inset-0 blur-3xl opacity-20 rounded-full scale-75',
          bgType,
        )}
      />
      <Image
        placeholder="blur"
        blurDataURL="/pokeball.svg"
        src={src}
        // src="/pokeball.svg"
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
