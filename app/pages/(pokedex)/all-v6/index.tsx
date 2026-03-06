import { getAllType } from '@/app/entities/type/api';

import { getNationalPokedex } from './api';
import Container from './ui/container';
// import PokeCard from './ui/mobile/poke-card';

export default async function PokedexAllPageV6UI() {
  const [nationPokedex, allType] = await Promise.all([
    getNationalPokedex(),
    getAllType(),
  ]);

  return (
    <div className="w-full mx-auto max-w-384 py-6">
      {/* <div className="w-full max-h-dvh"> */}
      <h1 className="text-4xl font-bold tracking-tight mt-4 mb-6 px-4 sm:px-6 md:px-8 xl:px-16">
        전국도감
      </h1>

      <Container pokes={nationPokedex} types={allType} />
    </div>
  );
}
