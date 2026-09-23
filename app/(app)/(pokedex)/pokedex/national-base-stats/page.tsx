import NationalBaseStatsView from '@/views/(pokedex)/national-base-stats';
import { Suspense } from 'react';

export default function NationalBaseStatsPage() {
  return (
    <Suspense>
      <NationalBaseStatsView />
    </Suspense>
  );
}
