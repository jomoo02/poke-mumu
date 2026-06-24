import { getAllType } from '@/entities/type/api';

import { getNationalPokedex } from './api';
import Container from './ui/container';

export default async function PokedexAllPageViewV2() {
  const [nationPokedex, allType] = await Promise.all([
    getNationalPokedex(),
    getAllType(),
  ]);

  const title = '전국도감';

  return (
    <div className="max-w-365 mx-auto py-12 w-full min-h-svh flex flex-col gap-6 px-5 md:px-8 lg:px-10 3xl:px-2.5">
      <h1 className="text-4xl font-bold tracking-tight mt-4 mb-6">{title}</h1>
      <Container
        pokes={nationPokedex}
        types={allType.filter((type) => type.identifier !== 'unknown')}
      />
      {/* <PokedexProvider pokes={nationPokedex}>1</PokedexProvider> */}
    </div>
  );
}
