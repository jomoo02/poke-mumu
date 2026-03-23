import { cn } from '@/app/shared/lib/cn';
import { getSurroundPokes, getPokeForms } from './api';

import MobilePokeFormList from './ui/mobile-poke-form-list';
import DesktopPokeFormList from './ui/desktop-poke-form-list';
import Toc from './ui/toc';

interface PokedexDexNumberLayoutProps {
  params: Promise<{ dexNumber: number | string; form: string }>;
  children: React.ReactNode;
}

export default async function PokedexDexNumberLayoutUI({
  params,
  children,
}: PokedexDexNumberLayoutProps) {
  const { dexNumber, form } = await params;

  const [pokeForms, surroundPokes] = await Promise.all([
    getPokeForms(dexNumber),
    getSurroundPokes(dexNumber),
  ]);

  return (
    <div
      className="
      py-10
      mx-auto grid
        grid-cols-[minmax(0,1fr)]
        lg:grid-cols-[248px_minmax(0,1fr)]
        xl:grid-cols-[248px_minmax(0,1fr)_224px] max-w-384 min-h-dvh w-full"
    >
      <div className="lg:hidden max-w-3xl mx-auto w-full px-4 sm:px-6">
        <MobilePokeFormList pokeForms={pokeForms} form={form} />
      </div>
      <div className="hidden lg:block shrink-0 lg:sticky lg:top-24 z-30 w-full h-[calc(100vh-144px)] overflow-y-auto">
        <DesktopPokeFormList pokeForms={pokeForms} form={form} />
      </div>
      <main className="flex-1 min-w-0 max-w-3xl w-full px-4 sm:px-6 xl:px-0 mx-auto">
        {children}
      </main>
      <div className="hidden xl:block p-6 shrink-0 sticky top-24 z-20 w-full h-[calc(100vh-144px)]">
        <Toc />
      </div>
    </div>
  );
}
