import PokedexDexNumberFormPageUI from '@/app/pages/(pokedex)/dex-number-form';
// import PokedexDexNumberFormV2PageUI from '@/app/pages/(pokedex)/dex-number-form-v2';
// import PokedexDexNumberFormPageV3UI from '@/app/pages/(pokedex)/dex-number-form-v3';
// import PokedexDexNumberFormPageV4UI from '@/app/pages/(pokedex)/dex-number-form-v4';
// import PokedexDexNumberFormV0PageUI from '@/app/pages/(pokedex)/dex-number-form-v0';
// import PokedexDexNumberFormPageV5UI from '@/app/pages/(pokedex)/dex-number-form-v5';
import PokedexDexNumberFormPageUIVV1 from '@/app/pages/(pokedex)/dex-number-form-vv1';
import PokedexDexNumberFormPageUIVV2 from '@/app/pages/(pokedex)/dex-number-form-vv2';
import PokedexDexNumberFormPageUIVV3 from '@/app/pages/(pokedex)/dex-number-form-vv3';
import PokedexDexNumberFormPageUIVV4 from '@/app/pages/(pokedex)/dex-number-form-vv4';
import PokedexDexNumberFormPageUIVV5 from '@/app/pages/(pokedex)/dex-number-form-vv5';

import { Suspense } from 'react';

export default async function PokedexDexNumberFormPage({
  params,
}: PageProps<'/pokedex/[dexNumber]/[form]'>) {
  return (
    <Suspense>
      {params.then(({ form, dexNumber }) => (
        <PokedexDexNumberFormPageUIVV5 pokeKey={form} dexNumber={dexNumber} />
      ))}
    </Suspense>
  );
}
