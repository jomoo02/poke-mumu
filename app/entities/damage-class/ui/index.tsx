import Image from 'next/image';

import { cn } from '@/app/shared/lib/cn';

import { type DamageClass } from '../model';

interface DamageClassIconProps {
  damageClass: string;
  className?: string;
}

const isValidDamageClass = (value: string): value is DamageClass => {
  return value === 'physical' || value === 'special' || value === 'status';
};

export function DamageClassIcon({
  damageClass,
  className,
}: DamageClassIconProps) {
  if (!isValidDamageClass(damageClass)) {
    return (
      <div className="w-7 h-5 rounded-[5px] border border-zinc-700/8">???</div>
    );
  }

  const srcMap: Record<DamageClass, string> = {
    physical: '/damage-class/physical-5.png',
    special: '/damage-class/special-5.png',
    status: '/damage-class/status-5.png',
  };

  return (
    <div className={cn('relative', 'w-7 h-5', className)}>
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
