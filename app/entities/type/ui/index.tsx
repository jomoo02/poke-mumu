import Image from 'next/image';

import { cn } from '@/app/shared/lib/cn';

import { type Type } from '../model';

interface TypeIconProps {
  type: Type;
  size?: number;
  isVisibleContent?: boolean;
  className?: string;
  rounded?: string;
}

export function TypeIcon({
  type,
  className,
  size = 32,
  rounded,
}: TypeIconProps) {
  if (type.identifier === 'unknown') {
    return (
      <div
        className={cn(
          'size-8 bg-emerald-800 text-white font-semibold rounded-sm flex items-center justify-center',
          className,
        )}
      >
        ?
      </div>
    );
  }
  return (
    <div className={cn('flex flex-col items-center relative  ', className)}>
      <div className={cn('overflow-hidden rounded-sm', rounded)}>
        <Image
          src={`/type-icon/${type.identifier}.png`}
          width={size}
          height={size}
          alt={type.identifier}
        />
      </div>
    </div>
  );
}

export function TypeIconV2({ type, className, size = 32 }: TypeIconProps) {
  if (type.identifier === 'unknown') {
    return (
      <div
        className={cn(
          'size-8 bg-emerald-800 text-white font-semibold rounded-sm flex items-center justify-center',
          className,
        )}
      >
        ?
      </div>
    );
  }
  return (
    <div className=" text-[#F2F2F2] font-extrabold flex text-sm rounded-sm overflow-hidden items-center h-7 relative">
      <div className={cn('flex flex-col items-center ', className)}>
        {/* <div className="overflow-hidden rounde"> */}
        <Image
          src={`/type-icon/${type.identifier}.png`}
          width={size}
          height={size}
          alt={type.identifier}
        />
        {/* </div> */}
      </div>
      <div className="w-17 text-center bg-[#404259]/95 h-full flex items-center justify-center">
        {type.name}
      </div>
    </div>
  );
}

interface TypeBadgeProps {
  type: Type;
  size?: number;
  isVisibleContent?: boolean;
  className?: string;
}

export function TypeBadge({ type, className }: TypeBadgeProps) {
  const bgVariants: Record<string, string> = {
    normal: 'bg-normal',
    fire: 'bg-fire',
    water: 'bg-water',
    grass: 'bg-grass',
    electric: 'bg-electric',
    ice: 'bg-ice',
    fighting: 'bg-fighting',
    poison: 'bg-poison',
    ground: 'bg-ground',
    flying: 'bg-flying',
    psychic: 'bg-psychic',
    bug: 'bg-bug',
    rock: 'bg-rock',
    ghost: 'bg-ghost',
    dragon: 'bg-dragon',
    dark: 'bg-dark',
    steel: 'bg-steel',
    fairy: 'bg-fairy',
    unknown: 'bg-unknown',
  };

  const shadowVariants: Record<string, string> = {
    normal: 'shadow-normal/50',
    fire: 'shadow-fire/50',
    water: 'shadow-water/50',
    grass: 'shadow-grass/50',
    electric: 'shadow-electric/50',
    ice: 'shadow-ice/50',
    fighting: 'shadow-fighting/50',
    poison: 'shadow-poison/50',
    ground: 'shadow-ground/50',
    flying: 'shadow-flying/50',
    psychic: 'shadow-psychic/50',
    bug: 'shadow-bug/50',
    rock: 'shadow-rock/50',
    ghost: 'shadow-ghost/50',
    dragon: 'shadow-dragon/50',
    dark: 'shadow-dark/50',
    steel: 'shadow-steel/50',
    fairy: 'shadow-fairy/50',
    unknown: 'shadow-unknown/50',
  };

  const borderColorVariatns: Record<string, string> = {
    normal: 'border-normal',
    fire: 'border-fire',
    water: 'border-water',
    grass: 'border-grass',
    electric: 'border-electric',
    ice: 'border-ice',
    fighting: 'border-fighting',
    poison: 'border-poison',
    ground: 'border-ground',
    flying: 'border-flying',
    psychic: 'border-psychic',
    bug: 'border-bug',
    rock: 'border-rock',
    ghost: 'border-ghost',
    dragon: 'border-dragon',
    dark: 'border-dark',
    steel: 'border-steel',
    fairy: 'border-fairy',
    unknown: 'border-unknown',
  };

  const ringVariants: Record<string, string> = {
    // 어두운 타입 — highlight 약하게
    dark: 'ring-white/10',
    ghost: 'ring-white/10',
    poison: 'ring-white/15',
    dragon: 'ring-white/15',
    ground: 'ring-white/15',
    rock: 'ring-white/15',

    // 중간 타입 — 기본
    normal: 'ring-white/20',
    fighting: 'ring-white/20',
    bug: 'ring-white/20',
    grass: 'ring-white/20',
    fire: 'ring-white/20',
    water: 'ring-white/20',
    psychic: 'ring-white/20',
    steel: 'ring-white/20',
    fairy: 'ring-white/20',

    // 밝은 타입 — highlight 강하게
    flying: 'ring-white/35',
    ice: 'ring-white/35',
    electric: 'ring-white/35',

    unknown: 'ring-white/20',
  };
  const bg = bgVariants[type.identifier] || bgVariants.unknown;
  const borderColor =
    borderColorVariatns[type.identifier] || borderColorVariatns.unknown;
  const content = type.name;
  const shadowColor = shadowVariants[type.identifier] || shadowVariants.unknown;
  const ringColor = ringVariants[type.identifier] || ringVariants.unknown;
  return (
    <div
      className={cn(
        'h-7.5 w-15 px-px font-extrabold text-sm flex items-center justify-center rounded-sm border text-white shadow-sm shrink-0 text-shadow-lg',

        'ring-inset ring-1 tracking-wide',
        bg,
        borderColor,
        shadowColor,
        ringColor,
        className,
      )}
    >
      {content}
    </div>
  );
}
