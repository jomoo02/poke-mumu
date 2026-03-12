import { useEffect, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/shared/ui/dialog';

import { Direction, SortKey, getSortOptions } from '../../model';
import { SlidersHorizontal, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { Type } from '@/app/entities/type/model';
import { Button } from '@/app/shared/ui/button';

interface PokedexFilterDialogProps {
  filterTypes: string[];
  sortKey: SortKey;
  setFilterTypes: (type: string[]) => void;
  setSortKey: (key: SortKey) => void;
  allTypes: Type[];
  direction: Direction;
}

export default function PokedexFilterDialog({
  filterTypes,
  sortKey,
  setFilterTypes,
  setSortKey,
  allTypes,
  direction,
}: PokedexFilterDialogProps) {
  const [open, setOpen] = useState(false);
  const isDirty = filterTypes.length > 0 || sortKey !== 'dexNumber';
  // const activeFilterCount =
  //   (filterType !== 'all' ? 1 : 0) + (sortKey !== 'dexNumber' ? 1 : 0);
  const resetAll = () => {
    setFilterTypes([]);
    setSortKey('dexNumber');
  };

  const [localFilterType, setLocalFilterType] = useState(filterTypes);
  const [localSortKey, setLocalSortKey] = useState(sortKey);
  useEffect(() => {
    if (open) {
      setLocalFilterType(filterTypes);
      setLocalSortKey(sortKey);
    }
  }, [open]);

  // 적용하기
  const handleApply = () => {
    setFilterTypes(localFilterType);
    setSortKey(localSortKey);
    setOpen(false);
  };
  const options = getSortOptions();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-10" size={'lg'} variant={'outline'}>
          <SlidersHorizontalIcon className="size-4.5 " />
          {/* {activeFilterCount > 0 && (
            <span className="size-4.5 inline-flex items-center text-xs justify-center font-semibold bg-primary text-primary-foreground rounded-full">
              {activeFilterCount}
            </span>
          )} */}
        </Button>
      </DialogTrigger>

      {/* ── Drawer 형태로 오버라이드 ── */}
      <DialogContent
        showCloseButton={false}
        className="
                fixed inset-x-0 bottom-0 top-auto
                left-0 translate-x-0 translate-y-0
                max-w-none sm:max-w-none
                rounded-t-2xl rounded-b-none
                p-0 gap-0
                max-h-[70dvh] h-full flex flex-col
                duration-200
                data-open:slide-in-from-bottom
                data-closed:slide-out-to-bottom
              "
      >
        {/* 헤더 */}
        <DialogHeader className="flex-row items-center justify-between p-6 shrink-0">
          <DialogTitle className="text-base font-bold">
            필터 및 정렬
          </DialogTitle>
          <DialogDescription />
          <div className="flex items-center gap-3">
            {isDirty && (
              <button
                onClick={resetAll}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                초기화
              </button>
            )}
            <button
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="닫기"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>

        <div className="border-t shrink-0" />

        {/* 스크롤 콘텐츠 */}
        <div className="overflow-y-auto flex flex-col gap-5 px-5 py-4">
          {/* 타입 */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              타입
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setLocalFilterType([])}
                className={[
                  'px-3 py-0.5 rounded-full border text-sm font-semibold transition-all',
                  localFilterType.length === 0
                    ? 'bg-foreground text-background border-foreground'
                    : 'bg-background text-muted-foreground border-border hover:border-foreground hover:text-foreground',
                ].join(' ')}
              >
                전체
              </button>
              {allTypes.map((t) => {
                const selected = localFilterType.includes(t.identifier);
                return (
                  <button
                    key={t.identifier}
                    onClick={() =>
                      setLocalFilterType((prev) => {
                        if (prev.length === 2) {
                          return [prev[1], t.identifier];
                        }
                        return [...prev, t.identifier];
                      })
                    }
                    className={[
                      'px-3 py-0.5 rounded-full border text-sm font-semibold transition-all',
                      selected
                        ? 'bg-foreground text-background border-foreground'
                        : 'bg-background text-muted-foreground border-border hover:border-foreground hover:text-foreground',
                    ].join(' ')}
                  >
                    {t.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t" />

          {/* 정렬 */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              정렬
            </span>
            <div className="flex flex-wrap gap-1.5">
              {options.map((opt) => {
                const active = localSortKey === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setLocalSortKey(opt.id)}
                    className={[
                      'px-3 py-1 rounded-lg border text-sm font-semibold transition-all',
                      active
                        ? 'bg-foreground text-background border-foreground'
                        : 'bg-background text-muted-foreground border-border hover:border-foreground hover:text-foreground',
                    ].join(' ')}
                  >
                    {opt.label}
                    {active && (
                      <span className="ml-1 text-xs opacity-70">
                        {direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 적용 버튼 */}
        <div className="shrink-0 px-5 py-4 border-t">
          <button
            onClick={handleApply}
            className="w-full py-3 rounded-xl bg-foreground text-background text-sm font-bold
                             hover:opacity-80 transition-opacity active:scale-[0.98]"
          >
            적용하기
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
