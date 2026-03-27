import { getPokeArtworkSrc } from '@/app/entities/poke/model';
import { cn } from '@/app/shared/lib/cn';
import Image from 'next/image';
import { Type } from '@/app/entities/type/model';
import { DexInfoView } from '../../../dex-number-form-vv1/model';

interface PokeImgProps {
  poke: DexInfoView;
  className?: string;
  priority?: boolean;
  type?: Type;
}

export default function PokeImg({
  poke,
  className,
  type,
  priority = true,
}: PokeImgProps) {
  const { sprite } = poke;

  if (!sprite) {
    return (
      <div className="size-64 rounded-2xl bg-muted flex items-center justify-center">
        <span className="text-muted-foreground text-sm">이미지 없음</span>
      </div>
    );
  }

  const src = getPokeArtworkSrc(sprite);
  const alt = poke.name;
  const bgType = type ? `bg-${type.identifier}` : '';

  return (
    <div className={cn('relative w-full h-full', className)}>
      <div
        className={cn(
          'absolute inset-0 blur-2xl opacity-15 rounded-full scale-75',
          bgType,
        )}
      />
      <Image
        placeholder="blur"
        blurDataURL="/pokeball.svg"
        src={src}
        alt={alt}
        fill
        style={{ objectFit: 'contain' }}
        priority={priority}
      />
    </div>
  );
}
