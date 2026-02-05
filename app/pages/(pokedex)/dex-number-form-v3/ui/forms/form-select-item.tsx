import Link from 'next/link';

import { type Poke } from '@/app/entities/poke/model';

import FormPoke from './form-poke';

interface FormSelectItemProps {
  poke: Poke;
  className?: string;
}

export default function FormSelectItem({
  poke,
  className,
}: FormSelectItemProps) {
  const { dexNumber, pokeKey } = poke;
  const href = `/pokedex/${dexNumber}/${pokeKey}`;

  return (
    <Link href={href} className={className}>
      <FormPoke poke={poke} />
    </Link>
  );
}
