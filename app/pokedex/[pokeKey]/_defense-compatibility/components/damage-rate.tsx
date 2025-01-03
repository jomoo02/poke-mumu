import React from 'react';
import PokeTypeBadge from '@/app/components/poke-type-badge';
import type { PokeType } from '@/app/data/poke-type';

interface DamageRateProps {
  damageRate: number;
  types: PokeType[];
}

export default function DamageRate({
  damageRate,
  types,
}: DamageRateProps) {
  return (
    <div className="flex divide-x divide-slate-300">
      <div className="flex justify-center items-center border-slate-300 min-w-16 md:min-w-20">
        {`x ${damageRate}`}
      </div>
      <div
        className="p-2 md:px-3 flex flex-wrap gap-x-2.5 sm:gap-x-3 md:gap-x-4 gap-y-2 sm:gap-y-2"
      >
        {types.map((type) => (
          <PokeTypeBadge type={type} key={type} />
        ))}
      </div>
    </div>
  );
}
