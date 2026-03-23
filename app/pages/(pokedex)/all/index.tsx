import { getAllType } from '@/app/entities/type/api';

import { getNationalPokedex } from './api';
import Container from './ui/container';

export default async function PokedexAllPageUI() {
  const [nationPokedex, allType] = await Promise.all([
    getNationalPokedex(),
    getAllType(),
  ]);

  const title = '전국도감';

  return (
    <div className="w-full mx-auto max-w-384 min-h-dvh py-8 px-4 sm:px-6 xl:px-10">
      <h1 className="text-4xl font-bold tracking-tight mt-4 mb-6">{title}</h1>
      <Container pokes={nationPokedex} types={allType} />
    </div>
  );
}
