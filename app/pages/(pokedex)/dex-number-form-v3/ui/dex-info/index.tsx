import { PokeArtwork } from '@/app/entities/poke/ui';
import { formatNumber } from '@/app/shared/lib/format';
import { TypeBadge } from '@/app/entities/type/ui';

import InfoCard from '../info-card';
import { type DexInfoView } from '../../model';

interface DexInfoProps {
  dexInfo: DexInfoView;
}

export default function DexInfo({ dexInfo }: DexInfoProps) {
  const {
    name,
    dexNumber,
    genera,
    weight,
    height,
    form,
    types,
    id,
    sprite,
    pokeKey,
    nameEn,
    nameJa,
  } = dexInfo;

  const poke = { id, pokeKey, form, name, sprite, dexNumber };

  const formattedDexNumber = `No.${formatNumber(dexNumber)}`;

  return (
    <div className="grid md:grid-cols-2 gap-6 sm:gap-16 ">
      <div className="rounded-4xl aspect-square sm:aspect-3/2 lg:aspect-5/4 p-8 bg-muted/50 flex justify-center items-center overflow-hidden">
        <div className="h-full w-full max-w-100 max-h-100 relative mx-auto">
          <PokeArtwork
            className="object-contain w-full h-full"
            poke={poke}
            priority
          />
        </div>
      </div>
      <div className="flex flex-col h-full gap-6">
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-medium text-muted-foreground">
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
                className="h-8.5 w-30 sm:w-40"
              />
            ))}
          </div>
        </div>
        <div className="flex-1">
          비가 내린 다음 날은 등의 꽃향기가 강해진다. 향기에 이끌려 포켓몬이
          모여든다.
        </div>
        <div className="grid md:grid-cols-2 items-end gap-6">
          <div className="col-span-2">
            <div className="text-muted-foreground font-medium">분류</div>
            <div className="sm:text-lg font-medium">{genera}</div>
          </div>
          <div>
            <div className="text-muted-foreground font-medium">몸무게</div>
            <div className="sm:text-lg font-medium">{weight}</div>
          </div>
          <div>
            <div className="text-muted-foreground font-medium">키</div>
            <div className="sm:text-lg font-medium">{height}</div>
          </div>
        </div>
        {/* <InfoCard.Container title="도감">
          <InfoCard.Item subject="도감 번호">
            {formattedDexNumber}
          </InfoCard.Item>
          <InfoCard.Item subject="이름">{name}</InfoCard.Item>
          <InfoCard.Item subject="타입">
            <div className="flex gap-2">
              {types.map((type) => (
                <TypeBadge
                  key={type.identifier}
                  type={type}
                  className="h-7 w-20"
                />
              ))}
            </div>
          </InfoCard.Item>
          {form && <InfoCard.Item subject="모습">{form}</InfoCard.Item>}
          <InfoCard.Item subject="분류">{genera}</InfoCard.Item>
          <InfoCard.Item subject="몸무게">{weight}</InfoCard.Item>
          <InfoCard.Item subject="키">{height}</InfoCard.Item>
        </InfoCard.Container> */}
      </div>

      {/* <InfoCard.Container title="다른 이름">
        <InfoCard.Item subject="영문명">{nameEn}</InfoCard.Item>
        <InfoCard.Item subject="일본명">{nameJa}</InfoCard.Item>
      </InfoCard.Container> */}
    </div>
  );
}
