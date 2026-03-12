'use client';

import { useState } from 'react';

import { type NationalPokeView } from '@/app/pages/(pokedex)/all/model';
import { type Type } from '@/app/entities/type/model';
import usePokedex from '@/app/pages/(pokedex)/all/model/usePokedex';
import NameInput from '@/app/pages/(pokedex)/all/ui/name-input';
import TypeFilter from '@/app/pages/(pokedex)/all/ui/type-filter';
import ScrollToTopButton from '@/app/pages/(pokedex)/all/ui/scroll-to-top-button';
import Pokedex from '@/app/pages/(pokedex)/all/ui/pokedex';
import { cn } from '@/app/shared/lib/cn';
import { Button } from '@/app/shared/ui/button';

import { CardGrid } from './ui';
import PokedexFilter from './filter';

type Variant = 'table' | 'card';

interface Props {
  pokes: NationalPokeView[];
  types: Type[];
}

// ── 메인 컨테이너 ─────────────────────────────────────────────────────────
export default function TestContainer({ pokes, types }: Props) {
  const [variant, setVariant] = useState<Variant>('table');

  const {
    pokes: filteredPokes,
    setSortKey,
    filterType,
    setFilterType,
    inputValue,
    sortKey,
    direction,
    setInputValue,
    isPending,
  } = usePokedex(pokes);

  return (
    <div className="w-full">
      <ScrollToTopButton />

      {/* 필터 + 뷰 전환 */}
      <PokedexFilter
        allTypes={types}
        inputValue={inputValue}
        setInputValue={setInputValue}
        filterType={filterType}
        setFilterType={setFilterType}
        sortKey={sortKey}
        setSortKey={setSortKey}
        direction={direction}
      />
      <div className="flex flex-wrap gap-4 sm:gap-6 items-end px-4 sm:px-6 xl:px-16 w-full">
        <NameInput inputValue={inputValue} onChange={setInputValue} />
        <TypeFilter
          types={types}
          onChangeType={setFilterType}
          selectedType={filterType}
        />
        <div className="flex gap-1 ml-auto">
          {(
            [
              { id: 'table', label: '테이블' },
              { id: 'card', label: '카드' },
            ] as { id: Variant; label: string }[]
          ).map((v) => (
            <Button
              key={v.id}
              variant={variant === v.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setVariant(v.id)}
            >
              {v.label}
            </Button>
          ))}
        </div>
      </div>

      {/* 결과 수 */}
      <p className="px-4 sm:px-6 xl:px-16 mt-3 mb-2 text-sm text-muted-foreground">
        {filteredPokes.length}마리
      </p>

      {/* 콘텐츠 */}
      <div
        className={cn(
          'mt-4 w-full relative transition-opacity duration-150',
          isPending ? 'opacity-50' : 'opacity-100',
          variant === 'table' ? 'sm:px-6 xl:px-14' : '',
        )}
        style={{ contain: 'layout' }}
      >
        {filteredPokes.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <p className="text-lg font-semibold">검색 결과가 없습니다</p>
            <p className="text-sm mt-1">다른 이름이나 타입을 시도해 보세요</p>
          </div>
        ) : variant === 'table' ? (
          <Pokedex
            pokes={filteredPokes}
            onClickHeader={setSortKey}
            sortKey={sortKey}
            direction={direction}
          />
        ) : (
          <CardGrid pokes={filteredPokes} />
        )}
      </div>
    </div>
  );
}
