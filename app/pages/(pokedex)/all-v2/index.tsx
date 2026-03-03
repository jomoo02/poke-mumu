import { getAllType } from '@/app/entities/type/api';

import { getNationalPokedex } from './api';
import Container from './ui/container';
// import PokeCard from './ui/mobile/poke-card';

export default async function PokedexAllPageV2UI() {
  const [nationPokedex, allType] = await Promise.all([
    getNationalPokedex(),
    getAllType(),
  ]);

  return (
    <div className="w-full mx-auto max-w-384 min-h-dvh py-6">
      {/* <div className="w-full max-h-dvh"> */}
      <h1 className="text-4xl font-bold tracking-tight mt-4 mb-6 px-4 sm:px-6 md:px-8 xl:px-16">
        전국도감
      </h1>
      {/* <div className=" max-w-156">
        <PokeCard poke={nationPokedex[0]} />
      </div>
      <div className=" max-w-188">
        <PokeCard poke={nationPokedex[0]} />
      </div>
      <div className=" max-w-240">
        <PokeCard poke={nationPokedex[0]} />
      </div> */}

      <Container pokes={nationPokedex} types={allType} />
    </div>
  );
}
