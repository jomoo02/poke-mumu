import { Suspense } from 'react';

import { getAllType } from '@/entities/type/api';
import { PageContainer } from '@/shared/ui/container';

import { getNationalPokedex } from './api';
import PokedexView from './ui/pokedex-view';

export default async function PokedexAllPageViewV4() {
  const [pokes, allType] = await Promise.all([
    getNationalPokedex(),
    getAllType(),
  ]);
  const types = allType.filter((type) => type.identifier !== 'unknown');

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-4xl font-bold tracking-tight">전국도감</h1>
        <p className="pt-4 text-foreground/70">
          H: 체력, A: 공격, B: 방어, C: 특수공격, D: 특수방어, S:스피드
        </p>
      </div>
      <Suspense>
        <PokedexView pokes={pokes} types={types} />
      </Suspense>
    </PageContainer>
  );
}
