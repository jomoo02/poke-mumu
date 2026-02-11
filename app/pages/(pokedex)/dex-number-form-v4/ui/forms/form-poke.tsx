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
    <div className="overflow-hidden font-suit py-1.5 px-4 text-sm font-medium truncate">
      {form || name}
    </div>
  );
}
