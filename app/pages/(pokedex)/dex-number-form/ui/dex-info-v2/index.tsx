'use client';

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

export default function DexInfoV2({ dexInfo }: DexInfoProps) {
  const { name, dexNumber, genera, weight, height, form, types } = dexInfo;

  const formattedDexNumber = `No.${formatNumber(dexNumber)}`;

  const mainType = types[0];

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-1">
        {/* <div className="text-2xl font-medium text-muted-foreground">
          {formattedDexNumber}
        </div>
        <div className="text-4xl font-semibold text-foreground">{name}</div>
        <div className="text-xl text-foreground">{form}</div> */}
      </div>
      <div className="flex-1">
        <InfoCard.Container title="도감">
          <InfoCard.Item subject="타입" className="py-1.25">
            {' '}
            <div className="flex gap-1">
              {types.map((type) => (
                <TypeBadge
                  key={type.identifier}
                  type={type}
                  className="h-7.5 w-22"
                />
              ))}
            </div>
          </InfoCard.Item>
          <InfoCard.Item subject="분류"> {genera}</InfoCard.Item>
          <InfoCard.Item subject="몸무게"> {weight}</InfoCard.Item>
          <InfoCard.Item subject="키"> {height}</InfoCard.Item>
        </InfoCard.Container>
      </div>
    </div>
  );
}
