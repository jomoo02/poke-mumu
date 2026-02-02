import PokedexDexNumberFormPageUI from '@/app/pages/(pokedex)/dex-number-form';
// import PokedexDexNumberFormV2PageUI from '@/app/pages/(pokedex)/dex-number-form-v2';
import { Suspense } from 'react';

export default async function PokedexDexNumberFormPage({
  params,
}: PageProps<'/pokedex/[dexNumber]/[form]'>) {
  return (
    <Suspense>
      {params.then(({ form, dexNumber }) => (
        <PokedexDexNumberFormPageUI pokeKey={form} dexNumber={dexNumber} />
      ))}
    </Suspense>
  );
}
