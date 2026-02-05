import { type Poke } from '@/app/entities/poke/model';
import { PokeSprite } from '@/app/entities/poke/ui';
import { formatNumber } from '@/app/shared/lib/format';

interface FormPokeProps {
  poke: Poke;
}

export default function FormPoke({ poke }: FormPokeProps) {
  const { dexNumber, name, form } = poke;
  const formattedNumber = `No.${formatNumber(dexNumber)}`;

  return (
    <div className="flex w-full overflow-hidden font-suit">
      <div className="mr-4 rounded-xl">
        <PokeSprite poke={poke} />
      </div>
      <div className="flex flex-col w-full flex-1 overflow-hidden">
        <div className="w-full truncate text-sm text-left font-normal">
          {formattedNumber}
        </div>
        <div className="w-full truncate text-left">{name}</div>
        <div className="text-sm text-muted-foreground text-left font-medium min-h-5 w-full truncate">
          {form}
        </div>
      </div>
    </div>
  );
}
