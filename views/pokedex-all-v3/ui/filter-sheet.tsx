'use client';

import { useState } from 'react';
import { SlidersHorizontalIcon } from 'lucide-react';

import { type Type } from '@/entities/type/model';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';
import { Button } from '@/shared/ui/button';
import { useIsMobile } from '@/shared/model/useMobile';

import TypeFilter from './type-filter';
import FormFilter from './form-filter';

interface FilterSheetProps {
  types: Type[];
  selectedTypes: string[];
  selectedForms: string[];
  resultCount: number;
  onToggleType: (identifier: string) => void;
  onToggleForm: (identifier: string) => void;
  onReset: () => void;
}

// 선택 즉시 URL(경로) 반영(라이브). "N마리 보기" 버튼은 형식상 존재 — Sheet 닫기만 수행.
export default function FilterSheet({
  types,
  selectedTypes,
  selectedForms,
  resultCount,
  onToggleType,
  onToggleForm,
  onReset,
}: FilterSheetProps) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile(1028); // 데스크톱: 오른쪽 / 모바일: 하단

  const activeCount = selectedTypes.length + selectedForms.length;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-4xl h-10 bg-input/50 dark:bg-input/70 hover:bg-input/70 dark:hover:bg-input"
        >
          <SlidersHorizontalIcon className="size-4" />
          필터{activeCount > 0 ? ` ${activeCount}` : ''}
        </Button>
      </SheetTrigger>
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className="flex flex-col data-[side=bottom]:max-h-[85dvh] data-[side=bottom]:h-[85dvh]"
      >
        <SheetHeader>
          <SheetTitle>필터</SheetTitle>
          <SheetDescription className="sr-only">
            타입·모습 필터
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-auto px-5 flex flex-col gap-5">
          <div>
            <div className="mb-4 flex items-center justify-between text-sm font-medium">
              <span className="text-lg font-medium">타입</span>
              <span className="text-muted-foreground">최대 2개</span>
            </div>
            <TypeFilter
              types={types}
              selected={selectedTypes}
              onToggle={onToggleType}
            />
          </div>
          <div>
            <div className="mb-4 text-lg font-medium">모습</div>
            <FormFilter selected={selectedForms} onToggle={onToggleForm} />
          </div>
        </div>

        <SheetFooter>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onReset}
              className="h-13 text-base px-5 rounded-xl"
            >
              초기화
            </Button>
            <Button
              onClick={() => setOpen(false)}
              className="h-13 text-base flex-1 rounded-xl"
            >
              {resultCount.toLocaleString()}마리의 포켓몬 보기
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
