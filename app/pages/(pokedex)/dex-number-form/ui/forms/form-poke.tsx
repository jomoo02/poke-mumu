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
    <div className="flex w-full">
      <div className="pr-4">
        <PokeSprite poke={poke} />
      </div>
      <div className="flex flex-col">
        <div className="text-sm text-muted-foreground font-medium">
          {formattedNumber}
        </div>
        <div>{name}</div>
        <div className="text-sm text-muted-foreground font-medium">{form}</div>
      </div>
    </div>
  );
}
