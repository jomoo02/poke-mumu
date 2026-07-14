import { Suspense } from 'react';

import { getAllType } from '@/entities/type/api';
import { PageContainer } from '@/shared/ui/container';

import { getAllNationalPoke } from './api';
import PokedexAllClient from './ui/pokedex-all-client';

export default async function PokedexAllPageViewF() {
  const [pokes, allType] = await Promise.all([
    getAllNationalPoke(),
    getAllType(),
  ]);

  const types = allType.filter((type) => type.identifier !== 'unknown');

  const statLegendLine1 = 'H: 체력, A: 공격, B: 방어,\u00A0';
  const statLegendLine2 = 'C: 특수공격, D: 특수방어, S:스피드';

  return (
    <PageContainer>
      <div className="mb-4">
        <h1 className="text-4xl font-bold tracking-tight">전국도감</h1>
        <div className="flex pt-4 flex-wrap text-foreground/70">
          <p className=" break-keep text-pretty">{statLegendLine1}</p>
          <p className=" break-keep text-pretty">{statLegendLine2}</p>
        </div>
      </div>
      <Suspense>
        <PokedexAllClient pokes={pokes} types={types} />
      </Suspense>
    </PageContainer>
  );
}
