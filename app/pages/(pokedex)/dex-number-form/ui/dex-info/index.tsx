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
    <div className="flex flex-col w-full gap-6">
      <div className="aspect-square sm:aspect-4/2 lg:aspect-square rounded-2xl bg-muted/70 p-6 flex justify-center items-center ">
        <div className="rounded-xl h-full w-full max-w-68 max-h-68 relative mx-auto">
          <PokeArtwork
            className="object-contain w-full h-full"
            poke={poke}
            priority
          />
        </div>
      </div>
      <InfoCard.Container title="정보">
        <InfoCard.Item subject="도감 번호">{formattedDexNumber}</InfoCard.Item>
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
      </InfoCard.Container>
      <InfoCard.Container title="다국어 이름">
        <InfoCard.Item subject="영문명">{nameEn}</InfoCard.Item>
        <InfoCard.Item subject="일본명">{nameJa}</InfoCard.Item>
      </InfoCard.Container>
    </div>
  );
}
