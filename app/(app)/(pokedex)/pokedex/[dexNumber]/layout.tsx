import DexNavigator from '@/app/widgets/(pokedex)/dex-navigator';
import { Suspense } from 'react';

interface PokedexDexNumberLayoutProps {
  params: Promise<{ dexNumber: string }>;
  children: React.ReactNode;
}

export default async function PokedexDexNumberLayout({
  params,
  children,
}: PokedexDexNumberLayoutProps) {
  const dexNumber = params.then((p) => ({ dexNumber: p.dexNumber }));
  return (
    <>
      <Suspense>
        <DexNavigator dexNumber={dexNumber} />
      </Suspense>
      {children}
    </>
  );
}
