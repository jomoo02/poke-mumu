import { RulerIcon, WeightIcon, BookIcon } from 'lucide-react';

import { formatNumber } from '@/app/shared/lib/format';
import { TypeBadge } from '@/app/entities/type/ui';

import { type DexInfoView } from '../../model';
import PokeImg from './poke-img';

interface DexInfoProps {
  dexInfo: DexInfoView;
}

export default function DexInfoV2({ dexInfo }: DexInfoProps) {
  const { name, dexNumber, genera, weight, height, form, types } = dexInfo;

  const formattedDexNumber = `No.${formatNumber(dexNumber)}`;

  return (
    <div className="grid gap-6 sm:gap-16 py-6 ">
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-bold text-muted-foreground">
          {formattedDexNumber}
        </div>
        <h1 className="text-5xl font-bold">{name}</h1>
        <div className="text-xl font-semibold text-muted-foreground">
          {form}
        </div>
      </div>

      <div className="h-full w-full  relative mx-auto  max-w-92 max-h-92 aspect-square p-4">
        <PokeImg
          className="object-contain w-full h-full"
          poke={dexInfo}
          type={types[0]}
          priority
        />
      </div>
    </div>
  );
}
