import { getAllType } from '@/app/entities/type/api';

import { getNationalPokedex } from './api';
import PokedexTable from './ui/pokedex-table';

export default async function PokedexAllPageV2UI() {
  const [nationPokedex, allType] = await Promise.all([
    getNationalPokedex(),
    getAllType(),
  ]);

  return (
    <div className="w-full mx-auto px-4 sm:px-6 md:px-8 xl:px-16 max-w-384">
      <h1 className="text-4xl font-bold tracking-tight my-4">전국도감</h1>
      <PokedexTable pokes={nationPokedex} types={allType} />
    </div>
  );
}
