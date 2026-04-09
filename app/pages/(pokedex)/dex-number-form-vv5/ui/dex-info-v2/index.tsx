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
    <div className="flex flex-col gap-6">
      <div className="border rounded-2xl p-6 bg-card">
        <div className="h-full w-full relative mx-auto max-w-94 max-h-94  aspect-square p-4 rounded-2xl">
          <PokeImg
            className="object-contain w-full h-full "
            poke={dexInfo}
            type={types[0]}
            priority
          />
        </div>
      </div>

      <div className="flex flex-col justify-between gap-1">
        {/* <div className=" flex flex-col pb-6">
          <div className="flex gap-1.5 pt-6">
            {types.map((type) => (
              <TypeBadge
                key={type.identifier}
                type={type}
                className="w-30 h-9 rounded-md"
              />
            ))}
          </div>
        </div> */}

        <div className="border rounded-2xl p-4">
          <div className="grid grid-cols-3 divide-x">
            <div className="p-2">
              <div className=" text-muted-foreground font-medium text-center">
                분류
              </div>
              <div className="break-keep text-pretty font-medium text-center">
                {genera}
              </div>
            </div>
            {/* <div className="sm:hidden" /> */}
            <div className="p-2">
              <div className=" text-muted-foreground font-medium text-center">
                몸무게
              </div>
              <div className="break-keep text-pretty font-medium text-center">
                {weight}
              </div>
            </div>
            <div className="p-2 ">
              <div className=" text-muted-foreground font-medium text-center">
                키
              </div>
              <div className="break-keep text-pretty font-medium text-center">
                {height}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
