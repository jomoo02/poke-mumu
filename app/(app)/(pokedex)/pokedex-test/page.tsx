import { getNationalPokedex } from '@/app/pages/(pokedex)/all/api';
import { getAllType } from '@/app/entities/type/api';

import TestContainer from './_container';

export default async function PokedexTestPage() {
  const [pokes, types] = await Promise.all([
    getNationalPokedex(),
    getAllType(),
  ]);

  return (
    <div className="w-full mx-auto max-w-384 min-h-dvh py-8">
      <h1 className="text-4xl font-bold tracking-tight mt-4 mb-6 px-4 sm:px-6 md:px-8 xl:px-16">
        전국도감
      </h1>
      <TestContainer pokes={pokes} types={types} />
    </div>
  );
}
