import PokedexPokeKeyPageUI from '@/app/pages/(pokedex)/pokeKey';
import { Suspense } from 'react';

export default async function PokedexDexNumberFormPage({
  params,
}: PageProps<'/pokedex/[pokeKey]'>) {
  return (
    <Suspense>
      <div>
        {params.then(({ pokeKey }) => (
          <PokedexPokeKeyPageUI pokeKey={pokeKey} />
        ))}
      </div>
    </Suspense>
  );
}
