import { getAllType } from '@/app/entities/type/api';

import { getNationalPokedex } from './api';
import PokedexTable from './ui/pokedex-table';

export default async function PokedexAllPageV2UI() {
  const [nationPokedex, allType] = await Promise.all([
    getNationalPokedex(),
    getAllType(),
  ]);

  return (
    <div>
      <PokedexTable pokes={nationPokedex} types={allType} />
    </div>
  );
}
