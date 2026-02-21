import DexNavigator from '@/app/widgets/(pokedex)/dex-navigator';
import PokedexDexNumberSidebar from '@/app/widgets/(pokedex)/dex-number-sidebar';
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
    <div className="w-full flex flex-col my-8">
      <Suspense>
        <PokedexDexNumberSidebar dexNumber={dexNumber} />
      </Suspense>
      <div className="flex-1 shrink-0">{children}</div>
    </div>
  );
}
