import { PokeArtwork } from '@/app/entities/poke/ui';
import { formatNumber } from '@/app/shared/lib/format';
import { TypeBadge } from '@/app/entities/type/ui';

import InfoCard from '../info-card';
import { type DexInfoView } from '../../model';
import { cn } from '@/app/shared/lib/cn';
import { Weight, Ruler, Tag } from 'lucide-react';

function Item({
  label,
  content,
  className,
  icon,
}: {
  label: string;
  content: string;
  className?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className={cn(className)}>
      <div className="flex text-muted-foreground items-center gap-1 font-medium">
        {icon}
        {label}
      </div>
      <div className="text-lg font-medium">{content}</div>
    </div>
  );
}

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
    <div className="grid md:grid-cols-2  w-full gap-6 h-full">
      <div className="p-6 flex items-end">
        <PokeArtwork className="w-full " poke={poke} priority />
      </div>

      {/* <div className="flex justify-center items-center p-6 overflow-hidden">
        <div className=" relative h-full bg-muted/50 rounded-2xl flex justify-center items-center p-4">
          <PokeArtwork className="w-full" poke={poke} priority />
        </div>
      </div> */}

      <div className="flex flex-col h-full">
        <div className="flex flex-col gap-1 flex-1 p-6">
          <div className="text-3xl font-medium text-muted-foreground">
            {formattedDexNumber}
          </div>
          <div className="text-4xl font-semibold">{name}</div>
          <div className="text-lg text-muted-foreground font-medium">
            {form}
          </div>
          <div className="flex gap-2 py-2">
            {types.map((type) => (
              <TypeBadge
                key={type.identifier}
                type={type}
                className="h-8.5 w-40"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 w-full p-6">
          <Item
            label="분류"
            content={genera}
            className="col-span-2"
            icon={<Tag className="size-4.5" />}
          />
          <Item
            label="몸무게"
            content={weight}
            icon={<Weight className="size-4.5" />}
          />

          <Item
            label="키"
            content={height}
            icon={<Ruler className="size-4.5" />}
          />
        </div>
      </div>

      {/* <InfoCard.Container title="도감">
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
      </InfoCard.Container> */}
      {/* <InfoCard.Container title="다른 이름">
        <InfoCard.Item subject="영문명">{nameEn}</InfoCard.Item>
        <InfoCard.Item subject="일본명">{nameJa}</InfoCard.Item>
      </InfoCard.Container> */}
    </div>
  );
}
