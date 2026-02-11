import { type Poke } from '@/app/entities/poke/model';
import { PokeSprite } from '@/app/entities/poke/ui';
import { formatNumber } from '@/app/shared/lib/format';

interface FormPokeProps {
  poke: Poke;
}

export default function FormPoke({ poke }: FormPokeProps) {
  const { dexNumber, name, form } = poke;
  const formattedNumber = `#${formatNumber(dexNumber)}`;

  return (
    <div className="flex w-full overflow-hidden font-suit gap-4  p-2 border rounded-xl h-20">
      <div className="rounded-lg bg-muted/90 aspect-square flex items-center justify-center">
        <PokeSprite poke={poke} />
      </div>
      <div className="flex flex-col w-full flex-1 overflow-hidden">
        <div className="w-full truncate text-sm text-left text-muted-foreground font-medium">
          {formattedNumber}
        </div>
        <div className="w-full truncate text-left font-medium text-sm">
          {name}
        </div>
        <div className="text-sm text-left  w-full truncate text-muted-foreground">
          {form}
        </div>
      </div>
    </div>
  );
}
