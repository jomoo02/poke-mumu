import PokedexDexNumberFormPageUI from '@/app/pages/(pokedex)/dex-number-form';
import PokedexDexNumberFormV2PageUI from '@/app/pages/(pokedex)/dex-number-form-v2';
import PokedexDexNumberFormPageV3UI from '@/app/pages/(pokedex)/dex-number-form-v3';
import { Suspense } from 'react';

export default async function PokedexDexNumberFormPage({
  params,
}: PageProps<'/pokedex/[dexNumber]/[form]'>) {
  return (
    <Suspense>
      {params.then(({ form, dexNumber }) => (
        <PokedexDexNumberFormPageV3UI pokeKey={form} dexNumber={dexNumber} />
      ))}
    </Suspense>
  );
}
