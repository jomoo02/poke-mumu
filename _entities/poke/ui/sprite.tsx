import Image from 'next/image';

import { cn } from '@/_shared/lib/cn';

import type { Poke } from '../model/poke';
import { getPokeSpriteSrc } from '../model/poke-img';

interface PokeSpriteProps {
  poke: Pick<Poke, 'sprite' | 'nameKo'>;
  alt?: string;
  className?: string;
  priority?: boolean;
  // 목록처럼 수백 개를 한 번에 그릴 때 next/image 대신 <img>를 쓴다 (컴포넌트 비용을 줄인다).
  // images.unoptimized라 주소·결과는 같다. 화면 밖 이미지는 브라우저가 늦게 받는다(loading=lazy)
  native?: boolean;
}

export function PokeSprite({
  poke,
  alt,
  className,
  priority = false,
  native = false,
}: PokeSpriteProps) {
  const src = getPokeSpriteSrc(poke);
  // const src = '/pokeball.svg';

  if (native) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt ?? poke.nameKo}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={cn('size-14 object-contain', className)}
      />
    );
  }

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
