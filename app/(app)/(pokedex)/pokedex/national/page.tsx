import NationalView from '@/views/(pokedex)/national';
import { Suspense } from 'react';

export default function NationalPage() {
  return (
    <Suspense>
      <NationalView />
    </Suspense>
  );
}
