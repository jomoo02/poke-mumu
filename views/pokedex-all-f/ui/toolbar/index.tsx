'use client';

import { useRef } from 'react';
import { RotateCwIcon } from 'lucide-react';

import type { Type } from '@/entities/type/model';
import { Button } from '@/shared/ui/button';
import { useIsMobile } from '@/shared/model/useMobile';
import { useScrollIntoViewOnClick } from '@/shared/model/useScrollIntoViewOnClick';
import { useScrollIntoViewOnResize } from '@/shared/model/useScrollIntoViewOnResize';

import PokeSearchInput from '../poke-search';
import TypeFilter from '../type-filter';
import FormFilter from '../form-filter';
import PokeSort from '../poke-sort';

interface PokedexToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  types: Type[];
  isActive: boolean;
  onResetFilters: () => void;
  resultText: string;
}

// 검색 + 필터/정렬 pills + 초기화 + 결과 텍스트.
// isMobile과 가로 스크롤 보정은 이 툴바만의 관심사라 여기서 소유한다.
export default function PokedexToolbar({
  searchValue,
  onSearchChange,
  types,
  isActive,
  onResetFilters,
  resultText,
}: PokedexToolbarProps) {
  const isMobile = useIsMobile(768);

  // 모바일: 탭한 trigger(pill)를 가운데로 스크롤해 완전히 보이게.
  const toolbarRef = useRef<HTMLDivElement>(null);
  const scrollTriggerIntoView = useScrollIntoViewOnClick({
    enabled: isMobile,
    inline: 'center',
    selector: '[data-scroll-item]',
  });
  // 선택으로 trigger 텍스트가 길어져 잘리면, 너비 확정 시 다시 보이게 맞춘다.
  useScrollIntoViewOnResize(toolbarRef, {
    enabled: isMobile,
    selector: '[data-scroll-item]',
    inline: 'nearest',
  });

  return (
    <div className="flex flex-col gap-3 sm:gap-6">
      <PokeSearchInput value={searchValue} onChange={onSearchChange} />
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:items-center">
        <div
          ref={toolbarRef}
          className="flex gap-2 overflow-auto p-1 -m-1"
          onClick={scrollTriggerIntoView}
        >
          {isActive && (
            <Button
              variant={'secondary'}
              aria-label="필터 및 정렬 초기화"
              className="size-10.5 bg-input/50 dark:bg-input/70 hover:bg-input/70 dark:hover:bg-input"
              onClick={onResetFilters}
            >
              <RotateCwIcon className="size-4.5" />
            </Button>
          )}
          <PokeSort isMobile={isMobile} />
          <TypeFilter types={types} isMobile={isMobile} />
          <FormFilter isMobile={isMobile} />
        </div>
        <div aria-live="polite" className="text-sm text-foreground/70 shrink-0">
          {resultText}
        </div>
      </div>
    </div>
  );
}
