'use client';

import { useMemo, useRef } from 'react';
import { RotateCwIcon } from 'lucide-react';

import type { Type } from '@/entities/type/model';
import { useIsMobile } from '@/shared/model/useMobile';
import { useScrollIntoViewOnClick } from '@/shared/model/useScrollIntoViewOnClick';
import { useScrollIntoViewOnResize } from '@/shared/model/useScrollIntoViewOnResize';
import { Button } from '@/shared/ui/button';
import { useSearchParamsState } from '@/shared/lib/search-params';
import { SortControl } from '@/features/sort-control';
import { FilterControl } from '@/features/filter-control';

import { pokeSortConfig } from '../model/sort-config';
import {
  buildTypeFilterConfig,
  FORM_FILTER_CONFIG,
  GEN_FILTER_CONFIG,
} from '../model/filter-config';
import { SEARCH_PARAM_KEYS } from '../model/search-params';

const FILTER_KEYS = [
  SEARCH_PARAM_KEYS.type,
  SEARCH_PARAM_KEYS.form,
  SEARCH_PARAM_KEYS.gen,
];

interface ToolbarProps {
  types: Type[];
}

export default function Toolbar({ types }: ToolbarProps) {
  const isMobile = useIsMobile();

  const toolbarRef = useRef<HTMLDivElement>(null);

  const handleClick = useScrollIntoViewOnClick({
    inline: 'center',
    selector: '[data-scroll-item]',
    behavior: 'smooth',
  });

  const { suppressNextResizeScroll } = useScrollIntoViewOnResize(toolbarRef, {
    selector: '[data-scroll-item]',
    inline: 'center',
    behavior: 'auto',
  });

  // 페이지 단위 조합(IoC): 여러 컨트롤의 활성 여부를 합치고 한 번에 초기화한다.
  const { searchParams, setParams } = useSearchParamsState();

  const hasFilter = FILTER_KEYS.some(
    (key) => searchParams.getAll(key).filter(Boolean).length > 0,
  );
  const hasSort =
    Boolean(searchParams.get('sort')) || Boolean(searchParams.get('dir'));
  const isActive = hasFilter || hasSort;

  const resetAll = () => {
    suppressNextResizeScroll(); // 초기화로 생기는 리사이즈 스크롤만 스킵
    setParams({ type: null, form: null, gen: null, sort: null, dir: null });
  };

  const typeConfig = useMemo(() => buildTypeFilterConfig(types), [types]);

  return (
    <div
      data-slot="toolbar"
      ref={toolbarRef}
      onClick={handleClick}
      className="flex gap-3 overflow-auto p-1 -m-1"
    >
      {isActive && (
        <Button
          variant="secondary"
          aria-label="필터 및 정렬 초기화"
          className="size-10.5 bg-input/50 dark:bg-input/70 hover:bg-input/70 dark:hover:bg-input"
          onClick={resetAll}
        >
          <RotateCwIcon />
        </Button>
      )}

      <FilterControl config={typeConfig} isMobile={isMobile} />
      <FilterControl config={FORM_FILTER_CONFIG} isMobile={isMobile} />
      <FilterControl config={GEN_FILTER_CONFIG} isMobile={isMobile} />

      <SortControl config={pokeSortConfig} isMobile={isMobile} />
    </div>
  );
}
