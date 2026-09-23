import NationalV2View from '@/views/(pokedex)/national-v2';
import { Suspense } from 'react';

export default function NationalV2Page() {
  return (
    <Suspense>
      <NationalV2View />
    </Suspense>
  );
}
