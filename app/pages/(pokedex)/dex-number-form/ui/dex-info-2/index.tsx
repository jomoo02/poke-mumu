import { BookIcon, RulerIcon, WeightIcon } from 'lucide-react';

import { TypeBadge } from '@/app/entities/type/ui';
import { formatNumber } from '@/app/shared/lib/format';
import { cn } from '@/app/shared/lib/cn';

import { type DexInfoView } from '../../model';
import PokeHeroImg from './poke-img';

interface DexInfo2Props {
  dexInfo: DexInfoView;
}

export default function DexInfo2({ dexInfo }: DexInfo2Props) {
  const { name, dexNumber, genera, weight, height, form, types, sprite } =
    dexInfo;
  const primaryType = types[0];

  return (
    <div className="relative overflow-hidden rounded-4xl bg-muted/30">
      {primaryType && (
        <>
          {/* 이미지 뒤 메인 글로우 */}
          <div
            className={cn(
              'pointer-events-none absolute -left-16 top-1/2 -translate-y-1/2 size-144 rounded-full blur-3xl opacity-15 dark:opacity-35',
              `bg-${primaryType.identifier}`,
            )}
          />
          {/* 오른쪽 하단 보조 글로우 */}
          <div
            className={cn(
              'pointer-events-none absolute -bottom-24 -right-24 size-96 rounded-full blur-3xl opacity-10',
              `bg-${primaryType.identifier}`,
            )}
          />
        </>
      )}

      <div className="relative grid lg:grid-cols-2 items-center min-h-112">
        {/* LEFT: 이미지 */}
        <div className="relative mx-auto h-82 w-82 shrink-0 p-6 lg:h-100 lg:w-100">
          <PokeHeroImg
            sprite={sprite}
            name={name}
            type={primaryType}
            className="h-full w-full"
            priority
          />
        </div>

        {/* RIGHT: 텍스트 */}
        <div className="flex flex-col justify-center gap-8 p-8 lg:p-12">
          <div className="flex flex-col gap-3">
            <span className="text-md font-semibold tracking-widest text-muted-foreground">
              No.{formatNumber(dexNumber)}
            </span>
            <h1 className="text-6xl font-black tracking-tight leading-none">
              {name}
            </h1>
            {form && (
              <span className="text-base font-medium text-muted-foreground">
                {form}
              </span>
            )}
            <div className="flex gap-3 pt-2">
              {types.map((type) => (
                <TypeBadge key={type.identifier} type={type} />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <InfoChip icon={<BookIcon className="size-4" />} value={genera} />
            <InfoChip icon={<WeightIcon className="size-4" />} value={weight} />
            <InfoChip icon={<RulerIcon className="size-4" />} value={height} />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoChip({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex items-center gap-2 rounded-4xl bg-background border px-4 py-1.5 text-base font-medium">
      <span className="text-muted-foreground">{icon}</span>
      {value}
    </div>
  );
}
