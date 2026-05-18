// app/pages/(pokedex)/pokeKey/ui/move/section.client.tsx (수정 부분만)
'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';

import { movesApiUrl, movesFetcher, type AvailableVg } from '../../api/move';
import { type PokeMoveResult, type PokeMoveZa } from '../../model';
import VgSelector from './vg-selector';
import MoveToolbar from './move-toolbar';
import MoveFilterToggles from './move-filter-toggle';
import MoveTable from './move-table';
import MoveTableZa from './move-table-za';
import {
  useMoveTable,
  useMoveFacets,
  type SortKey,
  type MoveTableFilters,
} from '../../model/move/useMoveTable';
import { cn } from '@/app/shared/lib/cn';

interface MovesSectionClientProps {
  pokeKey: string;
  defaultVg: number;
  availableVgs: AvailableVg[];
  initialMoves: PokeMoveResult;
}

export default function MovesSectionClient({
  pokeKey,
  defaultVg,
  availableVgs,
  initialMoves,
}: MovesSectionClientProps) {
  // ... router/swr/handleVgChange 그대로 ...
  const router = useRouter();
  const searchParams = useSearchParams();

  const vgParam = searchParams.get('vg');
  const currentVg = vgParam ? Number(vgParam) : defaultVg;

  const { data, isLoading, error } = useSWR<PokeMoveResult>(
    movesApiUrl(pokeKey, currentVg),
    movesFetcher,
    {
      fallbackData: currentVg === defaultVg ? initialMoves : undefined,
      revalidateOnFocus: false,
      keepPreviousData: true,
      dedupingInterval: 60_000,
    },
  );

  const handleVgChange = useCallback(
    (newVg: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('vg', String(newVg));
      router.replace(`?${params.toString()}`, { scroll: false });
    },

    [router, searchParams],
  );
  // 필터/정렬 클라 상태 — vm/za 공통
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('default');
  const [selectedLearnMethods, setSelectedLearnMethods] = useState<Set<string>>(
    new Set(),
  );
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());

  const toggleLearnMethod = useCallback((id: string) => {
    setSelectedLearnMethods((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleType = useCallback((id: string) => {
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);
  const clearAllFilters = useCallback(() => {
    setSearch('');
    setSelectedLearnMethods(new Set());
    setSelectedTypes(new Set());
  }, []);
  const filters = useMemo<MoveTableFilters>(
    () => ({
      search,
      learnMethods: selectedLearnMethods,
      typeIdentifiers: selectedTypes,
      sortKey,
    }),
    [search, selectedLearnMethods, selectedTypes, sortKey],
  );

  // vm 분기
  const vmMoves = data?.kind === 'vm' ? data.moves : [];
  const filteredVm = useMoveTable(vmMoves, filters);
  const vmFacets = useMoveFacets(vmMoves);

  // ZA 분기 (base만)
  const zaMovesBase = useMemo<PokeMoveZa[]>(
    () =>
      data?.kind === 'za'
        ? data.moves.filter((m) => m.za_variant === 'base')
        : [],
    [data],
  );
  const filteredZa = useMoveTable(zaMovesBase, filters);
  const zaFacets = useMoveFacets(zaMovesBase);

  // ─── render ──────────────────────────────────────────
  return (
    <>
      <VgSelector
        availableVgs={availableVgs}
        currentVg={currentVg}
        onVgChange={handleVgChange}
      />

      {error ? (
        <p className="text-sm text-destructive">
          기술 데이터를 불러오지 못했어요.
        </p>
      ) : !data ? (
        <p className="text-sm text-muted-foreground">불러오는 중…</p>
      ) : data.kind === 'vm' ? (
        <div
          className={cn(
            'flex flex-col gap-4',
            isLoading ? 'opacity-70 transition-opacity' : '',
          )}
        >
          <MoveFilterToggles
            learnMethods={vmFacets.learnMethods}
            selectedLearnMethods={selectedLearnMethods}
            onToggleLearnMethod={toggleLearnMethod}
            types={vmFacets.types}
            selectedTypes={selectedTypes}
            onToggleType={toggleType}
            onClearAll={clearAllFilters}
          />

          <div className="flex flex-col gap-4">
            <MoveToolbar
              search={search}
              onSearchChange={setSearch}
              sortKey={sortKey}
              onSortKeyChange={setSortKey}
              resultCount={filteredVm.length}
              totalCount={vmMoves.length}
            />
            <MoveTable moves={filteredVm} />
          </div>
        </div>
      ) : (
        // ZA
        <div
          className={
            isLoading
              ? 'opacity-70 transition-opacity flex flex-col gap-4'
              : 'flex flex-col gap-4'
          }
        >
          <MoveFilterToggles
            learnMethods={zaFacets.learnMethods}
            selectedLearnMethods={selectedLearnMethods}
            onToggleLearnMethod={toggleLearnMethod}
            types={zaFacets.types}
            selectedTypes={selectedTypes}
            onToggleType={toggleType}
            onClearAll={clearAllFilters}
          />
          <MoveToolbar
            search={search}
            onSearchChange={setSearch}
            sortKey={sortKey}
            onSortKeyChange={setSortKey}
            resultCount={filteredZa.length}
            totalCount={zaMovesBase.length}
          />
          <MoveTableZa moves={filteredZa} />
        </div>
      )}
    </>
  );
}
