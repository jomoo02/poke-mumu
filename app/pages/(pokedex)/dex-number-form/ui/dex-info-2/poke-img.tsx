import Image from 'next/image';
import { getPokeArtworkSrc } from '@/app/entities/poke/model';
import { cn } from '@/app/shared/lib/cn';
import { type Type } from '@/app/entities/type/model';

interface PokeHeroImgProps {
  sprite?: string;
  name: string;
  type?: Type;
  className?: string;
  priority?: boolean;
}

export default function PokeHeroImg({
  sprite,
  name,
  type,
  className,
  priority = true,
}: PokeHeroImgProps) {
  const bgType = type ? `bg-${type.identifier}` : '';

  if (!sprite) {
    return (
      <div
        className={cn('relative flex items-center justify-center', className)}
      >
        <div className="size-full bg-muted/40 rounded-full" />
      </div>
    );
  }

  const src = getPokeArtworkSrc(sprite);

  return (
    <div className={cn('relative', className)}>
      {/* {bgType && (
        <div
          className={cn(
            'absolute inset-0 blur-3xl opacity-25 rounded-full scale-75',
            bgType,
          )}
        />
      )} */}
      <Image
        src={src}
        // src="/pokeball.svg"
        alt={name}
        fill
        className="object-contain"
        placeholder="blur"
        blurDataURL="/pokeball.svg"
        priority={priority}
      />
    </div>
  );
}
