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
    <div className="grid lg:grid-cols-2 w-full p-6 border-b">
      <div className="">
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
        <div className=" flex flex-col pb-6">
          <div className="text-xl font-bold text-muted-foreground">
            {formattedDexNumber}
          </div>
          <h1 className="text-4xl font-bold">{name}</h1>
          <div className="text-lg font-semibold text-muted-foreground">
            {form}
          </div>
          <div className="flex gap-1.5 pt-6">
            {types.map((type) => (
              <TypeBadge
                key={type.identifier}
                type={type}
                className="w-30 h-9 rounded-md"
              />
            ))}
          </div>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-5 pt-6">
            <div className="flex  flex-col col-span-2">
              <div className=" text-muted-foreground font-medium">분류</div>
              <div className="flex-1 break-keep text-pretty text-lg font-medium">
                {genera}
              </div>
            </div>
            <div className="flex  flex-col">
              <div className=" text-muted-foreground font-medium">몸무게</div>
              <div className="flex-1 break-keep text-pretty text-lg font-medium">
                {weight}
              </div>
            </div>
            <div className="flex  flex-col">
              <div className=" text-muted-foreground font-medium">키</div>
              <div className="flex-1 break-keep text-pretty text-lg font-medium">
                {height}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
