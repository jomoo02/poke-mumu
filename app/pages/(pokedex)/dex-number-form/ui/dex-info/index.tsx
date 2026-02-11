import { PokeArtwork } from '@/app/entities/poke/ui';
import { formatNumber } from '@/app/shared/lib/format';
import { TypeBadge } from '@/app/entities/type/ui';

import InfoCard from '../info-card';
import { type DexInfoView } from '../../model';
import MainSprite from './sprite';
import { cn } from '@/app/shared/lib/cn';
import { BookIcon, RulerIcon, WeightIcon } from 'lucide-react';

interface InfoItemProps {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}
function InfoItem({ label, icon, className, children }: InfoItemProps) {
  return (
    <div className={cn(className)}>
      <div className="text-muted-foreground flex items-center gap-1">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      <div className="font-medium">{children}</div>
    </div>
  );
}

interface DexInfoProps {
  dexInfo: DexInfoView;
}

export default function DexInfo({ dexInfo }: DexInfoProps) {
  const { name, dexNumber, genera, weight, height, form, types } = dexInfo;

  const formattedDexNumber = `No.${formatNumber(dexNumber)}`;

  const mainType = types[0];

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="h-full w-full relative mx-auto max-w-88 max-h-88 aspect-square">
        <MainSprite
          className="object-contain w-full h-full"
          poke={dexInfo}
          type={mainType}
          priority
        />
      </div>

      <div className="flex flex-col h-full gap-6">
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-medium text-muted-foreground">
            {formattedDexNumber}
          </div>
          <div className="text-4xl font-semibold text-foreground">{name}</div>
          <div className="text-xl text-foreground">{form}</div>
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
        <div className="flex-1 flex items-end w-full">
          <div className="grid grid-cols-2 w-full gap-6">
            <InfoItem
              label="분류"
              className="col-span-2"
              icon={<BookIcon className="size-4.5" />}
            >
              {genera}
            </InfoItem>
            <InfoItem label="몸무게" icon={<WeightIcon className="size-4.5" />}>
              {weight}
            </InfoItem>
            <InfoItem label="키" icon={<RulerIcon className="size-4.5" />}>
              {height}
            </InfoItem>
          </div>
        </div>
      </div>
    </div>
  );
}
