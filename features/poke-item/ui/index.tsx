import { PokeSprite } from '@/entities/poke/ui';
import { formatNumber } from '@/shared/lib/format';
import { TypeIcon } from '@/entities/type/ui';
import { cn } from '@/shared/lib/cn';

import type { PokeItemFeature } from '../model';

interface PokeItemProps {
  poke: PokeItemFeature;
  formatLength?: number;
  className?: string;
}
export default function PokeItem({
  poke,
  className,
  formatLength = 4,
}: PokeItemProps) {
  const { nameKo, form, type1, type2, dexNumber } = poke;

  return (
    <div
      className={cn(
        'flex items-center gap-x-3.5 w-full rounded-2xl',
        className,
      )}
    >
      <div className="bg-muted/50 rounded-2xl p-2">
        <PokeSprite poke={poke} className="size-11.5 2xs:size-12" />
      </div>
      <div className="text-md flex font-medium tabular-nums">
        {formatNumber(dexNumber, formatLength)}
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="font-medium truncate">{nameKo}</div>
        <div className="text-foreground/70 text-sm truncate">{form}</div>
      </div>
      <div className="grid grid-cols-2 gap-1.5 items-center pr-2.5 shrink-0">
        <TypeIcon type={type1} className="size-7  rounded-md " />

        {type2 && <TypeIcon type={type2} className="size-7 rounded-md" />}
      </div>
    </div>
  );
}
