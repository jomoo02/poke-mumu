import Image from 'next/image';

import { cn } from '@/app/shared/lib/cn';

import { DamageClassEntity, type DamageClass } from '../model';

interface DamageClassIconProps {
  damageClass: string | null;
  className?: string;
  damageClassEntity?: DamageClassEntity;
}

const isValidDamageClass = (value: string): value is DamageClass => {
  return value === 'physical' || value === 'special' || value === 'status';
};

export function DamageClassIcon({
  damageClass,
  className,
}: DamageClassIconProps) {
  if (!damageClass || !isValidDamageClass(damageClass)) {
    return (
      <div className="w-6.5 h-5 rounded-[5px] border border-zinc-700/8">
        ???
      </div>
    );
  }

  const srcMap: Record<DamageClass, string> = {
    physical: '/damage-class/physical-5.png',
    special: '/damage-class/special-5.png',
    status: '/damage-class/status-5.png',
  };

  return (
    <div className={cn('relative', 'w-6.5 h-5', className)}>
      <Image
        src={srcMap[damageClass]}
        alt={damageClass}
        fill
        priority
        sizes="28px"
      />
    </div>
  );
}

// 5/12
export function DamageClassBadge({
  damageClass,
  className,
  damageClassEntity,
}: DamageClassIconProps) {
  if (!damageClass || !isValidDamageClass(damageClass)) {
    return (
      <div className="w-20 h-7.5 rounded-lg bg-[  #594c5b] font-medium flex items-center justify-center text-white">
        ???
      </div>
    );
  }

  const srcMap: Record<DamageClass, string> = {
    physical: '/damage-class/physical.png',
    special: '/damage-class/special.png',
    status: '/damage-class/status.png',
  };

  const bgMap: Record<DamageClass, string> = {
    physical: 'bg-orange-400',
    special: 'bg-sky-500',
    status: 'bg-zinc-500',
  };

  const bg = bgMap[damageClass];
  const src = srcMap[damageClass];

  return (
    <div
      className={cn(
        'relative',
        'w-20 h-7.5 rounded-lg flex items-center p-1 shadow-sm',
        bg,
        className,
      )}
    >
      <Image
        src={src}
        alt={damageClass}
        width={22}
        height={18}
        style={{ width: 22, height: 'auto' }}
      />
      <span
        className={cn(
          'text-sm text-white font-extrabold text-center flex-1 tracking-wide',
        )}
      >
        {damageClassEntity?.nameKo}
      </span>
    </div>
  );
}

export function DamageClassIconV2({
  damageClass,
  className,
  damageClassEntity,
}: DamageClassIconProps) {
  if (!damageClass || !isValidDamageClass(damageClass)) {
    return (
      <div className="size-7.5 rounded-lg border bg-emerald-800 text-white justify-center items-center">
        ?
      </div>
    );
  }

  const srcMap: Record<DamageClass, string> = {
    physical: '/damage-class/physical.png',
    special: '/damage-class/special.png',
    status: '/damage-class/status.png',
  };

  const bgMap: Record<DamageClass, string> = {
    physical: 'bg-orange-500 dark:bg-orange-400',
    special: 'bg-sky-500',
    status: 'bg-zinc-500',
  };

  const bg = bgMap[damageClass];
  const src = srcMap[damageClass];

  return (
    <div
      className={cn(
        'relative',
        'size-7.5 rounded-lg flex justify-center items-center p-1 shadow-sm',
        bg,
        className,
      )}
    >
      <Image
        src={src}
        alt={damageClass}
        width={22}
        height={17}
        priority
        style={{ width: 22, height: 17 }}
      />
    </div>
  );
}
