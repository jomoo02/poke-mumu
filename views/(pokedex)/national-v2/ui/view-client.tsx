'use client';

import { useRouter } from 'next/navigation';

import { PageLayoutSection } from '@/shared/ui/page-layout';

import type { NationalPoke } from '../model/national-poke';
import { useNationalPokeList } from '../model/useNationalPokeList';
import PokeList from './poke-list';

interface ViewClientProps {
  pokes: NationalPoke[];
}

export default function ViewClient({ pokes }: ViewClientProps) {
  const filteredPokes = useNationalPokeList(pokes);

  const { bfcacheId } = useRouter();

  return (
    <PageLayoutSection className="mt-0 sm:mt-3">
      <PokeList key={bfcacheId} pokes={filteredPokes} />
    </PageLayoutSection>
  );
}
