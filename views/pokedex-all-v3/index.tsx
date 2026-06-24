import { Suspense } from 'react';

import { getAllType } from '@/entities/type/api';

import { getNationalPokedex } from './api';
import PokedexView from './ui/pokedex-view';

// 그리드 자리만 차지하는 간단한 스켈레톤(Suspense fallback).
function PokedexSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="h-[402px] rounded-4xl border bg-muted/40 animate-pulse"
        />
      ))}
    </div>
  );
}

export default async function PokedexAllPageViewV3() {
  // 전체 리스트와 타입은 서버에서 'use cache'로 캐시된 함수로 정적 패칭.
  const [pokes, allType] = await Promise.all([
    getNationalPokedex(),
    getAllType(),
  ]);

  const types = allType.filter((type) => type.identifier !== 'unknown');

  return (
    <div className="max-w-365 mx-auto py-12 w-full min-h-svh flex flex-col gap-6 px-5 md:px-8 lg:px-10 3xl:px-2.5">
      <h1 className="text-4xl font-bold tracking-tight mt-4 mb-6">전국도감</h1>
      {/* useSearchParams를 쓰는 클라이언트 트리는 Suspense로 감싼다(ISR 보존). */}
      <Suspense fallback={<PokedexSkeleton />}>
        <PokedexView all={pokes} types={types} />
      </Suspense>
    </div>
  );
}
