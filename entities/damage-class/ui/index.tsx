import Image from 'next/image';

import { cn } from '@/shared/lib/cn';

import { DamageClass } from '../model';

interface DamageClassIconProps {
  damageClass: DamageClass;
  className?: string;
}

export function DamageClassIcon({
  damageClass,
  className,
}: DamageClassIconProps) {
  const srcMap: Record<string, string> = {
    physical: '/damage-class/physical.png',
    special: '/damage-class/special.png',
    status: '/damage-class/status.png',
  };

  const bgMap: Record<string, string> = {
    physical: 'bg-orange-500 dark:bg-orange-400',
    special: 'bg-sky-500',
    status: 'bg-zinc-500',
  };

  const bg = bgMap[damageClass.identifier];
  const src = srcMap[damageClass.identifier];

  if (!damageClass || !bg || !src) {
    return (
      <div
        className={cn(
          'size-7 rounded-lg bg-purple-700 text-white justify-center items-center flex',
          className,
        )}
      >
        ?
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative',
        'size-7 rounded-md flex justify-center items-center p-0.75',
        bg,
        className,
      )}
    >
      <Image src={src} alt={damageClass.identifier} width={22} height={18} />
    </div>
  );
}
