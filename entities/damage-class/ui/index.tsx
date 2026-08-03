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
    physical: 'bg-orange-400 dark:bg-orange-400/80',
    special: 'bg-sky-400 dark:bg-sky-400/80',
    status: 'bg-zinc-400 dark:bg-zinc-400/80',
  };

  const bg = bgMap[damageClass.identifier];
  const src = srcMap[damageClass.identifier];

  if (!damageClass || !bg || !src) {
    return (
      <div
        className={cn(
          'size-7 rounded-md bg-[#4c1d95] dark:bg-[#4c1d95]/90 text-md text-white justify-center items-center flex text-shadow-sm',
          className,
        )}
        // style={{ textShadow: '0 1px 2px rgb(0 0 0 / 0.45)' }}
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

export function DamageClassBadge({
  damageClass,
  className,
}: DamageClassIconProps) {
  const srcMap: Record<string, string> = {
    physical: '/damage-class/physical.png',
    special: '/damage-class/special.png',
    status: '/damage-class/status.png',
  };

  const bgMap: Record<string, string> = {
    physical: 'bg-orange-400 dark:bg-orange-400/80',
    special: 'bg-sky-400 dark:bg-sky-400/80',
    status: 'bg-zinc-400 dark:bg-zinc-400/80',
  };

  const bg = bgMap[damageClass.identifier];
  const src = srcMap[damageClass.identifier];

  if (!damageClass || !bg || !src) {
    return (
      <div
        className={cn(
          'w-25 h-8.75 text-white  rounded-4xl flex items-center px-2.5 shadow-xs font-extrabold ',
          className,
        )}
        style={{ textShadow: '0 1px 2px rgb(0 0 0 / 0.45)' }}
      >
        ?
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative',
        'w-25 h-8.75 text-white  rounded-4xl flex items-center px-2.5 shadow-xs font-extrabold ',
        bg,
        className,
      )}
      style={{ textShadow: '0 1px 2px rgb(0 0 0 / 0.45)' }}
    >
      <Image src={src} alt={damageClass.identifier} width={22} height={18} />
      <span className={cn('text-sm text-center flex-1 tracking-wide')}>
        {damageClass.nameKo}
      </span>
    </div>
  );
}
