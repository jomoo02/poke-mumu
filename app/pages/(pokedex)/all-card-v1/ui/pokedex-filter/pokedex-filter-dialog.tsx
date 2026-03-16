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
import { SlidersHorizontalIcon, XIcon, RotateCwIcon } from 'lucide-react';
import { Type } from '@/app/entities/type/model';
import { Button } from '@/app/shared/ui/button';
import { cn } from '@/app/shared/lib/cn';

const DIRECTION_OPTIONS: { value: Direction; label: string }[] = [
  { value: 'asc', label: '↑ 오름차순' },
  { value: 'desc', label: '↓ 내림차순' },
];

const SORT_LABEL: Record<string, string> = {
  dexNumber: '#',
  name: '이름',
  total: '총합',
  hp: 'HP',
  attack: '공격',
  defense: '방어',
  specialAttack: '특공',
  specialDefense: '특방',
  speed: '속도',
};

const MAX_TYPE_SELECT = 2;

interface PokedexFilterDialogProps {
  sortKey: SortKey;
  direction: Direction;
  filterTypes: string[];
  setFilterTypes: (types: string[]) => void;
  setSortKey: (key: SortKey) => void;
  setDirection: (direction: Direction) => void;
  allTypes: Type[];
  isDirty: boolean;
}

export default function PokedexFilterDialog({
  filterTypes,
  sortKey,
  direction,
  setFilterTypes,
  setSortKey,
  setDirection,
  allTypes,
  isDirty,
}: PokedexFilterDialogProps) {
  const [open, setOpen] = useState(false);

  const [localFilterTypes, setLocalFilterTypes] =
    useState<string[]>(filterTypes);
  const [localSortKey, setLocalSortKey] = useState<SortKey>(sortKey);
  const [localDirection, setLocalDirection] = useState<Direction>(direction);

  useEffect(() => {
    if (open) {
      setLocalFilterTypes(filterTypes);
      setLocalSortKey(sortKey);
      setLocalDirection(direction);
    }
  }, [open]);

  const isDirtyLocal =
    localFilterTypes.length > 0 ||
    localSortKey !== 'dexNumber' ||
    localDirection !== 'asc';

  // 선택된 타입 객체
  const selectedTypeObjects = localFilterTypes
    .map((id) => allTypes.find((t) => t.identifier === id))
    .filter((t): t is Type => t !== undefined);

  // 타입 토글 — 2개 선택 시 나머지 disabled
  const toggleType = (identifier: string) => {
    setLocalFilterTypes((prev) => {
      if (prev.includes(identifier)) {
        return prev.filter((t) => t !== identifier);
      }
      if (prev.length >= MAX_TYPE_SELECT) return prev;
      return [...prev, identifier];
    });
  };

  const resetAll = () => {
    setLocalFilterTypes([]);
    setLocalSortKey('dexNumber');
    setLocalDirection('asc');
  };

  const handleApply = () => {
    setFilterTypes(localFilterTypes);
    setSortKey(localSortKey);
    setDirection(localDirection);
    setOpen(false);
  };

  const options = getSortOptions();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-10 relative" size="lg" variant="outline">
          <SlidersHorizontalIcon className="size-4.5" />
          {isDirty && (
            <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 size-2 rounded-full bg-primary" />
          )}
        </Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="
          fixed inset-x-0 bottom-0 top-auto
          left-0 translate-x-0 translate-y-0
          max-w-none sm:max-w-none
          rounded-t-2xl rounded-b-none
          p-0 gap-0
          max-h-[70dvh] flex flex-col
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
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            size="icon-lg"
            aria-label="닫기"
          >
            <XIcon className="size-5" />
          </Button>
        </DialogHeader>

        <div className="border-t shrink-0" />

        {/* 현재 선택 상태 + 초기화 — 선택된 항목이 있을 때만 노출 */}
        {isDirtyLocal && (
          <>
            <div className="flex items-center gap-2 px-5 py-3 shrink-0">
              <Button variant="ghost" onClick={resetAll} className="shrink-0">
                <RotateCwIcon className="size-3.5" />
                <span>초기화</span>
              </Button>
              <div className="h-6  w-px mx-2 bg-border" />
              <div className="flex flex-wrap gap-1 flex-1">
                {/* 선택된 타입 chip */}
                {selectedTypeObjects.map((t) => (
                  <Button
                    variant={'secondary'}
                    key={t.identifier}
                    onClick={() => toggleType(t.identifier)}
                  >
                    타입: {t.name}
                    <XIcon className="size-3.5" />
                  </Button>
                ))}
                {/* 정렬 기준 chip — 기본값이 아닐 때만 */}
                {localSortKey !== 'dexNumber' && (
                  <Button
                    variant={'secondary'}
                    onClick={() => setLocalSortKey('dexNumber')}
                  >
                    정렬 기준: {SORT_LABEL[localSortKey]}
                    <XIcon className="size-3" />
                  </Button>
                )}
                {/* 정렬 방향 chip — 기본값이 아닐 때만 */}
                {localDirection !== 'asc' && (
                  <Button
                    onClick={() => setLocalDirection('asc')}
                    variant={'secondary'}
                  >
                    정렬 방향:{' '}
                    {localDirection === 'desc' ? '내림차순' : '오름차순'}
                    <XIcon className="size-3" />
                  </Button>
                )}
              </div>
            </div>
            <div className="border-t shrink-0" />
          </>
        )}

        {/* 스크롤 콘텐츠 */}
        <div className="overflow-y-auto flex flex-col gap-5 px-5 py-4">
          {/* 타입 */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                타입
              </span>
              {localFilterTypes.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  {localFilterTypes.length} / {MAX_TYPE_SELECT}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Button
                onClick={() => setLocalFilterTypes([])}
                variant="outline"
                className={cn(
                  localFilterTypes.length === 0
                    ? 'border-primary bg-primary/10 hover:bg-primary/10'
                    : '',
                )}
              >
                전체
              </Button>
              {allTypes.map((t) => {
                const selected = localFilterTypes.includes(t.identifier);
                const disabled =
                  !selected && localFilterTypes.length >= MAX_TYPE_SELECT;
                return (
                  <Button
                    key={t.identifier}
                    variant="outline"
                    disabled={disabled}
                    onClick={() => toggleType(t.identifier)}
                    className={cn(
                      selected
                        ? 'border-primary bg-primary/10 hover:bg-primary/10'
                        : '',
                    )}
                  >
                    {t.name}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="border-t" />

          {/* 정렬 기준 */}
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              정렬 기준
            </span>
            <div className="flex flex-wrap gap-1.5">
              {options.map((opt) => {
                const active = localSortKey === opt.id;
                return (
                  <Button
                    key={opt.id}
                    variant="outline"
                    onClick={() => setLocalSortKey(opt.id)}
                    className={cn(
                      active
                        ? 'border-primary bg-primary/10 hover:bg-primary/10'
                        : '',
                    )}
                  >
                    {opt.label}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="border-t" />

          {/* 정렬 방향 */}
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              정렬 방향
            </span>
            <div className="flex gap-1.5">
              {DIRECTION_OPTIONS.map((opt) => {
                const active = localDirection === opt.value;
                return (
                  <Button
                    key={opt.value}
                    variant="outline"
                    onClick={() => setLocalDirection(opt.value)}
                    className={cn(
                      active
                        ? 'border-primary bg-primary/10 hover:bg-primary/10'
                        : '',
                    )}
                  >
                    {opt.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 적용 버튼 */}
        <div className="shrink-0 px-5 py-4 border-t">
          <Button
            variant="default"
            onClick={handleApply}
            size="lg"
            className="w-full h-10 font-bold"
          >
            적용
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
