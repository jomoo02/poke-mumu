'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

import { type Type } from '@/entities/type/model';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/shared/ui/sheet';
import { Button } from '@/shared/ui/button';
import { useIsMobile } from '@/shared/model/useMobile';

import { useListParams } from '../model/use-list-params';
import { parseSort, SORT_OPTIONS, DEFAULT_SORT } from '../model/sort';
import { FORM_FILTERS } from '../model/forms';
import TypeFilter from './type-filter';
import FormFilter from './form-filter';
import SortControl from './sort-control';

const MAX_TYPES = 2;

type Section = 'type' | 'form' | 'sort';

interface FilterContainerProps {
  types: Type[];
}

// 타입·모습·정렬을 하나의 Sheet로 관리. 트리거는 각각 존재하고,
// 트리거 클릭 시 Sheet를 열고 해당 섹션으로 자동 스크롤한다.
export default function FilterContainer({ types }: FilterContainerProps) {
  const { searchParams, update } = useListParams();
  const isMobile = useIsMobile(1028);

  const selectedTypes = (searchParams.get('type') ?? '')
    .split(',')
    .filter(Boolean);
  const selectedForms = (searchParams.get('form') ?? '')
    .split(',')
    .filter(Boolean);
  const { key: sortKey, dir: sortDir } = parseSort(searchParams);

  // ── URL 라이브 토글 ──────────────────────────────
  const toggleType = (id: string) => {
    const next = selectedTypes.includes(id)
      ? selectedTypes.filter((t) => t !== id)
      : [...selectedTypes, id].slice(-MAX_TYPES);
    update({ type: next });
  };
  const toggleForm = (id: string) => {
    const next = selectedForms.includes(id)
      ? selectedForms.filter((t) => t !== id)
      : [...selectedForms, id];
    update({ form: next });
  };

  // ── 트리거 요약 라벨 ─────────────────────────────
  const typeSummary = selectedTypes
    .map((id) => types.find((t) => t.identifier === id)?.nameKo ?? id)
    .join(', ');
  const formSummary = selectedForms
    .map((id) => FORM_FILTERS.find((f) => f.identifier === id)?.label ?? id)
    .join(', ');
  const sortLabel =
    SORT_OPTIONS.find((o) => o.key === sortKey)?.label ?? sortKey;
  const isDefaultSort =
    sortKey === DEFAULT_SORT.key && sortDir === DEFAULT_SORT.dir;

  // ── Sheet 열기 + 섹션 자동 스크롤 ─────────────────
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState<Section>('type');
  const [nonce, setNonce] = useState(0);

  const typeRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  const openAt = (section: Section) => {
    setTarget(section);
    setNonce((n) => n + 1);
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const refs: Record<Section, React.RefObject<HTMLDivElement | null>> = {
      type: typeRef,
      form: formRef,
      sort: sortRef,
    };
    // Sheet 콘텐츠 마운트/애니메이션 후에 스크롤.
    const timer = setTimeout(() => {
      refs[target].current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 120);
    return () => clearTimeout(timer);
  }, [open, target, nonce]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" onClick={() => openAt('type')}>
          타입{selectedTypes.length > 0 ? `: ${typeSummary}` : ''}
        </Button>
        <Button variant="outline" onClick={() => openAt('form')}>
          모습{selectedForms.length > 0 ? `: ${formSummary}` : ''}
        </Button>
        <Button variant="outline" onClick={() => openAt('sort')}>
          정렬{!isDefaultSort ? `: ${sortLabel}` : ''}
          {sortDir === 'asc' ? (
            <ArrowUpIcon className="size-4" />
          ) : (
            <ArrowDownIcon className="size-4" />
          )}
        </Button>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side={isMobile ? 'bottom' : 'right'}
          className="flex flex-col data-[side=bottom]:max-h-[85dvh] data-[side=bottom]:h-[85dvh]"
        >
          <SheetHeader>
            <SheetTitle>필터 · 정렬</SheetTitle>
            <SheetDescription className="sr-only">
              타입·모습 필터 및 정렬
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-auto px-5 flex flex-col gap-8 pb-8">
            <section ref={typeRef} className="scroll-mt-2">
              <div className="mb-4 flex items-center justify-between text-sm font-medium">
                <span className="text-lg font-medium">타입</span>
                <span className="text-muted-foreground">최대 2개</span>
              </div>
              <TypeFilter
                types={types}
                selected={selectedTypes}
                onToggle={toggleType}
              />
            </section>

            <section ref={formRef} className="scroll-mt-2">
              <div className="mb-4 text-lg font-medium">모습</div>
              <FormFilter selected={selectedForms} onToggle={toggleForm} />
            </section>

            <section ref={sortRef} className="scroll-mt-2">
              <div className="mb-4 text-lg font-medium">정렬</div>
              <SortControl />
            </section>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
