import {
  PageLayoutContainer,
  PageLayoutSection,
} from '@/shared/ui/page-layout';
import ScrollToTopButton from '@/shared/ui/scroll-to-top-button';
import { getAllType } from '@/entities/type/api';

import { getNationalPokes } from './api';

import ViewClient from './ui/view-client';
import PokeSearch from './ui/poke-search';
import Toolbar from './ui/toolbar';

export default async function NationalView() {
  const [pokes, allType] = await Promise.all([
    getNationalPokes(),
    getAllType(),
  ]);

  if (!pokes) {
    return null;
  }

  const types = allType.filter((type) => type.identifier !== 'unknown');

  return (
    <>
      <ScrollToTopButton />
      <PageLayoutContainer>
        <PageLayoutSection className="mt-0 gap-4">
          <PokeSearch />
          <Toolbar types={types} />
        </PageLayoutSection>
        <ViewClient types={types} pokes={pokes} />
      </PageLayoutContainer>
    </>
  );
}
