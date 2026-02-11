import PokedexDexNumberFormPageUI from '@/app/pages/(pokedex)/dex-number-form';
import PokedexDexNumberFormV2PageUI from '@/app/pages/(pokedex)/dex-number-form-v2';
import PokedexDexNumberFormPageV3UI from '@/app/pages/(pokedex)/dex-number-form-v3';
import PokedexDexNumberFormPageV4UI from '@/app/pages/(pokedex)/dex-number-form-v4';
import PokedexDexNumberFormV0PageUI from '@/app/pages/(pokedex)/dex-number-form-v0';
import PokedexDexNumberFormPageV5UI from '@/app/pages/(pokedex)/dex-number-form-v5';
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
