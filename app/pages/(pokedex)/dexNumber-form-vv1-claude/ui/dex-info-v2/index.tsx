import { formatNumber } from '@/app/shared/lib/format';
import { TypeBadge } from '@/app/entities/type/ui';
import { type DexInfoView } from '../../../dex-number-form-vv1/model';
import PokeImg from './poke-img';

interface DexInfoProps {
  dexInfo: DexInfoView;
}

export default function DexInfoV2({ dexInfo }: DexInfoProps) {
  const { name, dexNumber, genera, weight, height, form, types } = dexInfo;
  const formattedDexNumber = `No.${formatNumber(dexNumber)}`;

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 py-8">
      <div className="relative shrink-0 w-56 h-56 sm:w-64 sm:h-64">
        <PokeImg
          className="object-contain w-full h-full"
          poke={dexInfo}
          type={types[0]}
          priority
        />
      </div>

      <div className="flex flex-col gap-3 sm:pt-4">
        <span className="text-sm font-medium text-muted-foreground tracking-widest">
          {formattedDexNumber}
        </span>
        <h1 className="text-4xl font-bold tracking-tight">{name}</h1>
        {form && (
          <span className="text-base text-muted-foreground">{form}</span>
        )}
        {genera && (
          <span className="text-sm text-muted-foreground">{genera}</span>
        )}

        <div className="flex gap-2 mt-1">
          {types.map((type) => (
            <TypeBadge key={type.identifier} type={type} />
          ))}
        </div>

        <div className="flex gap-6 mt-2 text-sm text-muted-foreground">
          {height && (
            <div className="flex flex-col gap-0.5">
              <span className="text-xs uppercase tracking-wider font-medium">키</span>
              <span className="text-foreground font-semibold">{height}</span>
            </div>
          )}
          {weight && (
            <div className="flex flex-col gap-0.5">
              <span className="text-xs uppercase tracking-wider font-medium">몸무게</span>
              <span className="text-foreground font-semibold">{weight}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
