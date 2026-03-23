import DexNavigator from '@/app/widgets/(pokedex)/dex-navigator';
import PokedexDexNumberSidebar from '@/app/widgets/(pokedex)/dex-number-sidebar';
import { Suspense } from 'react';

import PokedexDexNumberLayoutUI from '@/app/widgets/(pokedex)/dex-number-layout';

interface PokedexDexNumberLayoutProps {
  params: Promise<{ dexNumber: string; form: string }>;
  children: React.ReactNode;
}

export default async function PokedexDexNumberLayout({
  params,
  children,
}: PokedexDexNumberLayoutProps) {
  const dexNumber = params.then((p) => ({ dexNumber: p.dexNumber }));
  return (
    <Suspense>
      <PokedexDexNumberLayoutUI params={params}>
        {children}
      </PokedexDexNumberLayoutUI>
      {/* <PokedexDexNumberSidebar dexNumber={dexNumber} /> */}
    </Suspense>
  );
}
