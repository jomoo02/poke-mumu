import PokedexNationalBasicPage from '@/_pages/pokedex-national/basic';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense>
      <PokedexNationalBasicPage />
    </Suspense>
  );
}
