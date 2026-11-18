'use client';

import { useRouter } from 'next/navigation';

import { PageLayoutSection } from '@/shared/ui/page-layout';
import type { Type } from '@/entities/type/model';

import Toolbar from './toolbar';
import PokeList from './poke-list-v2';
import type { NationalPoke } from '../model';
import { usePokeListFilter } from '../model/poke-list';
import PokeSearch from './poke-search';

interface ViewClientProps {
  types: Type[];
  pokes: NationalPoke[];
}

export default function ViewClient({ types, pokes }: ViewClientProps) {
  const filteredPokes = usePokeListFilter(pokes);

  const { bfcacheId } = useRouter();

  return (
    <>
      {/* <PageLayoutSection className="mt-0 gap-4">
        <PokeSearch />
        <Toolbar types={types} />
      </PageLayoutSection> */}
      <PageLayoutSection className="mt-0 sm:mt-3">
        <PokeList key={bfcacheId} pokes={filteredPokes} />
      </PageLayoutSection>
    </>
  );
}
