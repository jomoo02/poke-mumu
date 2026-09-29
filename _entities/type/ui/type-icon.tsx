import Image from 'next/image';

import { cn } from '@/_shared/lib/cn';

import { getTypeIconSrc, type Type } from '../model/type';
import { getTypeColor } from '../model/type-color';

interface TypeIconProps {
  type: Pick<Type, 'identifier' | 'nameKo'>;
  className?: string;
}

export function TypeIcon({ type, className }: TypeIconProps) {
  const src = getTypeIconSrc(type.identifier);

  const color = getTypeColor(type.identifier);

  return (
    <div
      className={cn(
        'size-7 rounded-md flex items-center justify-center p-0.5 shrink-0',
        color.solid,
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          width={24}
          height={24}
          className="aspect-square"
          alt={type.nameKo}
        />
      ) : (
        <span
          role="img"
          aria-label={type.nameKo}
          className="text-sm font-extrabold text-white"
        >
          ?
        </span>
      )}
    </div>
  );
}
