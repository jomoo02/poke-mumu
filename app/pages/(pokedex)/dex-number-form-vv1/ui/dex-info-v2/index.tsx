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
    <div className="grid px-4 sm:px-6 pb-0 ">
      <div className="flex flex-col gap-1 pb-3">
        <div className="text-lg font-bold text-muted-foreground">
          {formattedDexNumber}
        </div>
        <h1 className="text-3xl font-bold">{name}</h1>
        <div className="text-lg font-semibold text-muted-foreground">
          {form}
        </div>
      </div>

      <div className="h-full w-full relative mx-auto max-w-92 max-h-92 aspect-square p-4 bg-muted/50 rounded-2xl">
        <PokeImg
          className="object-contain w-full h-full "
          poke={dexInfo}
          type={types[0]}
          priority
        />
      </div>

      <div className="pt-3">
        <div className="flex py-2 items-center">
          <div className="w-34 font-semibold text-muted-foreground">타입</div>
          <div className="flex-1 break-keep text-pretty font-medium grid grid-cols-2 gap-1.5 max-w-55.5">
            {types.map((type) => (
              <TypeBadge key={type.identifier} type={type} className="w-full" />
            ))}
          </div>
        </div>
        <div className="flex py-2">
          <div className="w-34 font-semibold text-muted-foreground">분류</div>
          <div className="flex-1 break-keep text-pretty font-medium">
            {genera}
          </div>
        </div>
        <div className="flex py-2">
          <div className="w-34 font-semibold text-muted-foreground">몸무게</div>
          <div className="flex-1 break-keep text-pretty font-medium">
            {weight}
          </div>
        </div>
        <div className="flex py-2">
          <div className="w-34 font-semibold text-muted-foreground">키</div>
          <div className="flex-1 break-keep text-pretty font-medium">
            {height}
          </div>
        </div>
      </div>
    </div>
  );
}
