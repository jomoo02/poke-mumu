import { getAllType } from '@/app/entities/type/api';

import { getNationalPokedex } from './api';
import NationalDex from './ui/national-pokedex';

export default async function PokedexAllPageUI() {
  const [nationPokedex, allType] = await Promise.all([
    getNationalPokedex({}),
    getAllType(),
  ]);

  return (
    <div>
      <NationalDex pokes={nationPokedex} types={allType} />
    </div>
  );
}
