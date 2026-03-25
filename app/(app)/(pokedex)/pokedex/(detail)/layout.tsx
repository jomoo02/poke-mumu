import { Suspense } from 'react';

import PokedexDetailLayoutUI from '@/app/widgets/(pokedex)/(detail)/layout';

interface PokedexDexNumberLayoutProps {
  children: React.ReactNode;
}

export default async function PokedexDexNumberLayout({
  children,
}: PokedexDexNumberLayoutProps) {
  return (
    <Suspense>
      <PokedexDetailLayoutUI>{children}</PokedexDetailLayoutUI>
    </Suspense>
  );
}
