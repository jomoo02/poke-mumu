import { RulerIcon, WeightIcon, BookIcon } from 'lucide-react';

import { formatNumber } from '@/app/shared/lib/format';
import { TypeBadge } from '@/app/entities/type/ui';

import { type DexInfoView } from '../../model';
import PokeImg from './poke-img';

interface DexInfoProps {
  dexInfo: DexInfoView;
}

export default function DexInfo({ dexInfo }: DexInfoProps) {
  const { name, dexNumber, genera, weight, height, form, types } = dexInfo;

  const formattedDexNumber = `No.${formatNumber(dexNumber)}`;

  return (
    <div className="grid md:grid-cols-2 gap-6 sm:gap-16 py-6 ">
      <div className="h-full w-full  relative mx-auto  max-w-100 max-h-100 aspect-square">
        <PokeImg
          className="object-contain w-full h-full"
          poke={dexInfo}
          type={types[0]}
          priority
        />
      </div>

      <div className="flex flex-col h-full gap-6 justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-semibold text-muted-foreground">
            {formattedDexNumber}
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold">{name}</h1>
          <div className="text-xl font-medium text-muted-foreground">
            {form}
          </div>
          <div className="flex gap-2 mt-4">
            {types.map((type) => (
              <TypeBadge
                key={type.identifier}
                type={type}
                className="h-9 w-30 sm:w-40 rounded-md"
              />
            ))}
          </div>
        </div>
        <div className="flex-1">
          비가 내린 다음 날은 등의 꽃향기가 강해진다. 향기에 이끌려 포켓몬이
          모여든다.
        </div>
        <div className="flex w-full gap-2 sm:gap-4">
          <div className="flex-1/4">
            <div className="flex items-center gap-1 justify-center">
              <BookIcon className="size-4.5 text-muted-foreground" />
              <div className="text-muted-foreground font-medium">분류</div>
            </div>

            <div className="sm:text-lg font-medium text-center">{genera}</div>
          </div>
          <div className="bg-border w-px self-stretch" />
          <div className="flex-1/4">
            <div className="flex items-center gap-1 justify-center">
              <WeightIcon className="size-4.5 text-muted-foreground" />
              <div className="text-muted-foreground font-medium">몸무게</div>
            </div>
            <div className="sm:text-lg font-medium text-center">{weight}</div>
          </div>
          <div className="bg-border w-px self-stretch " />
          <div className="flex-1/4">
            <div className="flex items-center gap-1 justify-center">
              <RulerIcon className="size-4.5 text-muted-foreground" />
              <div className="text-muted-foreground font-medium">키</div>
            </div>

            <div className="sm:text-lg font-medium text-center">{height}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
