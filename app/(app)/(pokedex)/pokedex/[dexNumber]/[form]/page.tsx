import PokedexDexNumberFormPageUI from '@/app/pages/(pokedex)/dex-number-form';
import { Suspense } from 'react';

export default async function PokedexDexNumberFormPage({
  params,
}: PageProps<'/pokedex/[dexNumber]/[form]'>) {
  return (
    <Suspense>
      {params.then(({ form }) => (
        <PokedexDexNumberFormPageUI pokeKey={form} />
      ))}
    </Suspense>
  );
}
