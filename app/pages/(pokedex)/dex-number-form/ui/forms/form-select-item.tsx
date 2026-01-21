import Link from 'next/link';

import { type Poke } from '@/app/entities/poke/model';

import FormPoke from './form-poke';

interface FormSelectItemProps {
  poke: Poke;
}

export default function FormSelectItem({ poke }: FormSelectItemProps) {
  const { dexNumber, pokeKey } = poke;
  const href = `/pokedex/${dexNumber}/${pokeKey}`;

  return (
    <Link href={href} className="rounded-xl py-2">
      <FormPoke poke={poke} />
    </Link>
  );
}
