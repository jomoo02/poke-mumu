'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, ListFilterIcon } from 'lucide-react';
import { Type } from '@/app/entities/type/model';
import { Button } from '@/app/shared/ui/button';
import { cn } from '@/app/shared/lib/cn';

const MAX_SELECTION = 2;

interface TypeFilterProps {
  allTypes: Type[];
  selected: string[];
  onChange: (types: string[]) => void;
}

export default function TypeFilter({
  allTypes,
  selected,
  onChange,
}: TypeFilterProps) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const isMaxed = selected.length >= MAX_SELECTION;
  const hasSelection = selected.length > 0;

  const filteredAllTypes = allTypes.filter(
    ({ identifier }) => identifier !== 'unknown',
  );

  useEffect(() => {
    if (!contentRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setHeight(entry.contentRect.height);
    });
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  const handleToggle = (identifier: string) => {
    if (selected.includes(identifier)) {
      onChange(selected.filter((t) => t !== identifier));
    } else if (!isMaxed) {
      onChange([...selected, identifier]);
    }
  };

  const handleReset = () => {
    onChange([]);
  };

  const selectedTypes = filteredAllTypes.filter((t) =>
    selected.includes(t.identifier),
  );

  return (
    <div className="sm:contents">
      {/* 모바일: 접기/펼치기 트리거 */}
      <div className="flex gap-2 items-center">
        <div>
          <Button
            variant={'outline'}
            onClick={() => setOpen((v) => !v)}
            className="flex flex-1 items-center justify-between h-10 px-4 text-sm"
          >
            <ListFilterIcon className="size-4" />
            <span>타입</span>
            <div className="w-px h-full bg-border mx-2" />
            <div className="">
              {' '}
              {selectedTypes.length > 0 ? (
                <div className="flex gap-1.5">
                  {selectedTypes.map(({ identifier, name }) => (
                    <span
                      key={identifier}
                      className="rounded-md px-2 py-0.5 text-sm font-semibold text-white"
                      style={{
                        backgroundColor: `var(--color-${identifier})`,
                      }}
                    >
                      {name}
                    </span>
                  ))}
                </div>
              ) : (
                <>
                  <span className="">모든 타입</span>{' '}
                </>
              )}
            </div>
          </Button>
        </div>

        {hasSelection && <ResetButton onClick={handleReset} />}
      </div>
      {/* <div className="flex gap-2 ">
        <div>
          <Button
            variant={'ghost'}
            onClick={() => setOpen((v) => !v)}
            className="flex flex-1 items-center justify-between h-10 px-4 text-sm"
          >
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">타입: </span>
              {selectedTypes.length > 0 ? (
                <div className="flex gap-1.5">
                  {selectedTypes.map(({ identifier, name }) => (
                    <span
                      key={identifier}
                      className="rounded-md px-2 py-0.5 text-sm font-semibold text-white"
                      style={{
                        backgroundColor: `var(--color-${identifier})`,
                      }}
                    >
                      {name}
                    </span>
                  ))}
                </div>
              ) : (
                <>
                  <span className="text-muted-foreground">모든 타입</span>{' '}
                  <ChevronDown
                    className="size-4 text-muted-foreground transition-transform duration-200"
                    style={{ transform: open ? 'rotate(180deg)' : undefined }}
                  />
                </>
              )}
            </div>
          </Button>
        </div>

        {hasSelection && (
          <Button
            variant="outline"
            onClick={handleReset}
            className="h-10 px-2.5 text-muted-foreground"
            aria-label="타입 필터 초기화"
          >
            <X className="size-4" />
          </Button>
        )}
      </div> */}

      {/* 모바일: 애니메이션 패널 */}
      <div
        className="overflow-hidden transition-[height] duration-200 ease-out "
        style={{ height: open ? height : 0 }}
      >
        <div ref={contentRef}>
          <div className="flex flex-wrap gap-2 pt-2">
            <BadgeList
              allTypes={filteredAllTypes}
              selected={selected}
              isMaxed={isMaxed}
              onToggle={handleToggle}
            />
            {/* {hasSelection && <ResetButton onClick={handleReset} />} */}
          </div>
        </div>
      </div>

      {/* 데스크톱: 항상 노출 */}
      {/* <div className="hidden sm:block">
        <div className="flex flex-wrap gap-2">
          <BadgeList
            allTypes={filteredAllTypes}
            selected={selected}
            isMaxed={isMaxed}
            onToggle={handleToggle}
          />
          {hasSelection && <ResetButton onClick={handleReset} />}
        </div>
      </div> */}
    </div>
  );
}

function ResetButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className="text-muted-foreground h-10"
    >
      <X className="size-3.5" />
      초기화
    </Button>
  );
}

function BadgeList({
  allTypes,
  selected,
  isMaxed,
  onToggle,
}: {
  allTypes: Type[];
  selected: string[];
  isMaxed: boolean;
  onToggle: (id: string) => void;
}) {
  return allTypes.map(({ identifier, name }) => {
    const isSelected = selected.includes(identifier);
    const isDisabled = !isSelected && isMaxed;

    return (
      <Button
        key={identifier}
        variant={'outline'}
        disabled={isDisabled}
        onClick={() => onToggle(identifier)}
        className={cn(
          'px-3 transition-none',
          isDisabled && 'cursor-not-allowed opacity-30',
          isSelected ? 'font-semibold' : '',
        )}
        style={
          isSelected
            ? {
                backgroundColor: `var(--color-${identifier})`,
                borderColor: `var(--color-border-${identifier})`,
                color: '#fff',
              }
            : {}
        }
      >
        {name}
      </Button>
    );
  });
}
