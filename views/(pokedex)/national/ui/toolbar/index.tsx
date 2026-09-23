'use client';

import { useRef } from 'react';
import { RotateCwIcon } from 'lucide-react';

import type { Type } from '@/entities/type/model';
import { useIsMobile } from '@/shared/model/useMobile';
import { useScrollIntoViewOnClick } from '@/shared/model/useScrollIntoViewOnClick';
import { useScrollIntoViewOnResize } from '@/shared/model/useScrollIntoViewOnResize';
import { Button } from '@/shared/ui/button';

import PokeSort from '../poke-sort';
import PokeFilter from '../poke-filter';
import { useSearchParamsState } from '../../model/search-params';

interface ToolbarProps {
  types: Type[];
}

export default function Toolbar({ types }: ToolbarProps) {
  const isMobile = useIsMobile();

  const toolbarRef = useRef<HTMLDivElement>(null);

  const handleClick = useScrollIntoViewOnClick({
    // enabled: true,
    inline: 'center',
    selector: '[data-scroll-item]',
    behavior: 'smooth',
  });

  const { suppressNextResizeScroll } = useScrollIntoViewOnResize(toolbarRef, {
    // enabled: isMobile,
    selector: '[data-scroll-item]',
    inline: 'center',
    behavior: 'auto',
  });

  const { resetParams, isActive } = useSearchParamsState();

  return (
    <div
      data-slot="toolbar"
      ref={toolbarRef}
      onClick={handleClick}
      className="flex gap-3 overflow-auto p-1 -m-1 "
    >
      {isActive && (
        <Button
          variant={'secondary'}
          aria-label="필터 및 정렬 초기화"
          className="size-10.5 bg-input/50 dark:bg-input/70 hover:bg-input/70 dark:hover:bg-input"
          // onClick={resetParams}
          onClick={() => {
            suppressNextResizeScroll(); // 먼저 플래그 세우고
            resetParams(); // 그 다음 초기화 → 이때 생기는 리사이즈 스크롤만 스킵
          }}
        >
          <RotateCwIcon />
        </Button>
      )}
      <PokeFilter isMobile={isMobile} types={types} />

      <PokeSort isMobile={isMobile} />
    </div>
  );
}
