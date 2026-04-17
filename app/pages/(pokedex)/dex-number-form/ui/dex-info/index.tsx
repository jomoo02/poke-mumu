import { RulerIcon, WeightIcon, BookIcon } from 'lucide-react';

import { formatNumber } from '@/app/shared/lib/format';
import { TypeBadge } from '@/app/entities/type/ui';

import { type DexInfoView } from '../../model';
import PokeImg from './poke-img';
import { cn } from '@/app/shared/lib/cn';

interface DexInfoProps {
  dexInfo: DexInfoView;
}

export default function DexInfo({ dexInfo }: DexInfoProps) {
  const { name, dexNumber, genera, weight, height, form, types } = dexInfo;

  const formattedDexNumber = `No.${formatNumber(dexNumber)}`;

  return (
    <div className="grid gap-6 p-6 border rounded-4xl bg-card lg:grid-cols-2">
      <div className="flex flex-col justify-between gap-6">
        {' '}
        <div className="flex flex-col gap-1">
          <div className="text-xl font-semibold text-muted-foreground ">
            {formattedDexNumber}
          </div>
          <h1 className="text-3xl  font-semibold">{name}</h1>
          <div className="text-lg  font-medium text-muted-foreground">
            {form}
          </div>
          <div className="flex gap-2  pt-3">
            {types.map((type) => (
              <TypeBadge key={type.identifier} type={type} />
            ))}
          </div>
        </div>
        <div className="h-full w-full relative mx-auto  max-w-64 max-h-64 aspect-square">
          <PokeImg
            className="object-contain w-full h-full"
            poke={dexInfo}
            type={types[0]}
            priority
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Item
          icon={<BookIcon className="size-4 text-muted-foreground" />}
          label="분류"
          content={genera}
          className="col-span-2"
        />
        <Item
          icon={<WeightIcon className="size-4 text-muted-foreground" />}
          label="몸무게"
          content={weight}
        />
        <Item
          icon={<RulerIcon className="size-4 text-muted-foreground" />}
          label="키"
          content={height}
        />
      </div>
    </div>
  );
}

interface ItemProps {
  icon?: React.ReactNode;
  label: string;
  content: string;
  className?: string;
}

function Item({ icon, label, content, className }: ItemProps) {
  return (
    <div className={cn('py-2 flex flex-col gap-1', className)}>
      <div className="flex items-center gap-1">
        {icon}
        <span className=" text-muted-foreground font-medium">{label}</span>
      </div>
      <div className="break-keep text-pretty font-medium  ">{content}</div>
    </div>
  );
}
