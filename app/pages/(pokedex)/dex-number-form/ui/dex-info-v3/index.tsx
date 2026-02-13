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

export default function DexInfoV3({ dexInfo }: DexInfoProps) {
  const { name, dexNumber, genera, weight, height, form, types } = dexInfo;

  const formattedDexNumber = `No.${formatNumber(dexNumber)}`;

  const mainType = types[0];

  return (
    <div>
      <div className="text-3xl font-semibold text-muted-foreground">
        {formattedDexNumber}
      </div>
      <div className="text-5xl font-bold text-foreground">{name}</div>
      <div className="text-xl text-foreground">{form}</div>
    </div>
  );
}
