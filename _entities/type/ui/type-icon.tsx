import Image from 'next/image';

import { cn } from '@/_shared/lib/cn';

import { getTypeIconSrc, type Type } from '../model/type';
import { getTypeColor } from '../model/type-color';

interface TypeIconProps {
  type: Pick<Type, 'identifier' | 'nameKo'>;
  // 옆에 타입 이름 글자가 함께 보일 때 true. 스크린리더가 이름을 두 번 읽지 않게 장식으로 숨긴다
  decorative?: boolean;
  className?: string;
}

export function TypeIcon({
  type,
  decorative = false,
  className,
}: TypeIconProps) {
  const src = getTypeIconSrc(type.identifier);

  const color = getTypeColor(type.identifier);

  return (
    <div
      aria-hidden={decorative || undefined}
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
          alt={decorative ? '' : type.nameKo}
        />
      ) : (
        <span
          role={decorative ? undefined : 'img'}
          aria-label={decorative ? undefined : type.nameKo}
          className="text-sm font-extrabold text-white"
        >
          ?
        </span>
      )}
    </div>
  );
}
