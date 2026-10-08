import Image from 'next/image';

import { cn } from '@/_shared/lib/cn';

import { getDamageClassIconSrc, type DamageClass } from '../model/damage-class';
import { getDamageClassColor } from '../model/damage-class-color';

interface DamageClassIconProps {
  damageClass: Pick<DamageClass, 'identifier' | 'nameKo'>;
  // 옆에 분류 이름 글자가 함께 보일 때 true. 스크린리더가 이름을 두 번 읽지 않게 장식으로 숨긴다
  decorative?: boolean;
  className?: string;
}

export function DamageClassIcon({
  damageClass,
  decorative = false,
  className,
}: DamageClassIconProps) {
  const src = getDamageClassIconSrc(damageClass.identifier);

  const color = getDamageClassColor(damageClass.identifier);

  return (
    <div
      aria-hidden={decorative || undefined}
      className={cn(
        'size-7 rounded-sm flex items-center justify-center p-0.75 shrink-0',
        color.solid,
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          width={22}
          height={18}
          alt={decorative ? '' : damageClass.nameKo}
        />
      ) : (
        <span
          role={decorative ? undefined : 'img'}
          aria-label={decorative ? undefined : damageClass.nameKo}
          className="text-sm font-extrabold text-white"
        >
          ?
        </span>
      )}
    </div>
  );
}
