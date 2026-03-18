'use client';

import { useState, useRef, useEffect } from 'react';
import { X, ListFilterIcon } from 'lucide-react';
import { Type } from '@/app/entities/type/model';
import { Button } from '@/app/shared/ui/button';
import { cn } from '@/app/shared/lib/cn';

const MAX_SELECTION = 2;

interface TypeFilterV2Props {
  allTypes: Type[];
  selected: string[];
  onChange: (types: string[]) => void;
  count: number;
  totalCount: number;
}

export default function TypeFilterV2({
  allTypes,
  selected,
  onChange,
  count,
  totalCount,
}: TypeFilterV2Props) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const filteredAllTypes = allTypes.filter(
    ({ identifier }) => identifier !== 'unknown',
  );

  const selectedTypes = filteredAllTypes.filter((t) =>
    selected.includes(t.identifier),
  );

  const isMaxed = selected.length >= MAX_SELECTION;
  const hasSelection = selected.length > 0;

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
    } else if (selected.length < MAX_SELECTION) {
      onChange([...selected, identifier]);
    }
  };

  const handleRemove = (identifier: string) => {
    onChange(selected.filter((t) => t !== identifier));
  };

  return (
    /**
     * 모바일(flex-col): Trigger → Panel → Count
     *   - Count에 order-last 적용 → DOM 순서(2번)임에도 패널(3번) 뒤로 밀림
     * 데스크탑(sm:grid): row1: [Trigger | Count], row2: [Panel col-span-2]
     */
    <div className="flex flex-col gap-2 sm:grid sm:grid-cols-[1fr_auto] sm:gap-x-4 sm:gap-y-2">
      {/* Trigger — mobile row1 / desktop row1 col1 */}
      <div className="flex items-center gap-2 sm:col-start-1 sm:row-start-1">
        <Button variant="outline" size="lg" onClick={() => setOpen((v) => !v)}>
          {/* <ListFilterIcon className="size-4" /> */}
          <span>타입 필터</span>
        </Button>

        {selectedTypes.map(({ identifier, name }) => (
          <button
            key={identifier}
            type="button"
            onClick={() => handleRemove(identifier)}
            className="flex shrink-0 items-center gap-1 rounded-md px-2.5 py-1 text-sm font-semibold text-white transition-opacity hover:opacity-80"
            style={{ backgroundColor: `var(--color-${identifier})` }}
          >
            {name}
            <X className="size-3" />
          </button>
        ))}

        {hasSelection && (
          <button
            type="button"
            onClick={() => onChange([])}
            className="shrink-0 text-sm text-muted-foreground hover:text-foreground"
          >
            초기화
          </button>
        )}
      </div>

      {/* Count — mobile row3(order-last) / desktop row1 col2 */}
      <span className="order-last self-center text-sm text-muted-foreground sm:order-none sm:col-start-2 sm:row-start-1">
        {totalCount !== count
          ? `${count} of ${totalCount} Pokémon`
          : `${totalCount} Pokémon`}
        {/* {count}마리 포켓몬 */}
      </span>

      {/* Panel — mobile row2 / desktop row2 col-span-2 */}
      <div
        className={cn(
          'overflow-hidden transition-[height] duration-200 ease-out sm:col-span-2 sm:row-start-2',
        )}
        style={{ height: open ? height : 0 }}
      >
        <div ref={contentRef}>
          <div className="flex flex-wrap gap-2 pt-1">
            {filteredAllTypes.map(({ identifier, name }) => {
              const isSelected = selected.includes(identifier);
              const isDisabled = !isSelected && isMaxed;

              return (
                <Button
                  key={identifier}
                  variant="outline"
                  disabled={isDisabled}
                  onClick={() => handleToggle(identifier)}
                  className={cn(
                    'px-3 transition-none',
                    isDisabled && 'cursor-not-allowed opacity-30',
                    isSelected && 'font-semibold',
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
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
