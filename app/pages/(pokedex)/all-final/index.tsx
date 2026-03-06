import { getAllType } from '@/app/entities/type/api';

import { getNationalPokedex } from './api';
import Container from './ui/container';

export default async function PokedexAllPageFinal() {
  const [nationPokedex, allType] = await Promise.all([
    getNationalPokedex(),
    getAllType(),
  ]);

  const pageHeading = '전국도감';

  return (
    <div className="w-full mx-auto max-w-384 py-8">
      <h1 className="text-4xl font-bold tracking-tight p-4 sm:px-6 xl:px-16">
        {pageHeading}
      </h1>

      <Container pokes={nationPokedex} types={allType} />
    </div>
  );
}
