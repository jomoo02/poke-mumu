'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const POKEMON_TYPES = [
  { identifier: 'normal', name: '노말' },
  { identifier: 'fire', name: '불꽃' },
  { identifier: 'water', name: '물' },
  { identifier: 'grass', name: '풀' },
  { identifier: 'electric', name: '전기' },
  { identifier: 'ice', name: '얼음' },
  { identifier: 'fighting', name: '격투' },
  { identifier: 'poison', name: '독' },
  { identifier: 'ground', name: '땅' },
  { identifier: 'flying', name: '비행' },
  { identifier: 'psychic', name: '에스퍼' },
  { identifier: 'bug', name: '벌레' },
  { identifier: 'rock', name: '바위' },
  { identifier: 'ghost', name: '고스트' },
  { identifier: 'dragon', name: '드래곤' },
  { identifier: 'dark', name: '악' },
  { identifier: 'steel', name: '강철' },
  { identifier: 'fairy', name: '페어리' },
] as const;

const MAX_SELECTION = 2;

interface TypeFilterProps {
  selected: string[];
  onChange: (types: string[]) => void;
}

export default function TypeFilter({ selected, onChange }: TypeFilterProps) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const isMaxed = selected.length >= MAX_SELECTION;

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

  const selectedTypes = POKEMON_TYPES.filter((t) =>
    selected.includes(t.identifier),
  );

  return (
    <div className="sm:contents">
      {/* 모바일: 접기/펼치기 트리거 */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-sm sm:hidden"
      >
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">타입</span>
          {selectedTypes.length > 0 ? (
            <div className="flex gap-1.5">
              {selectedTypes.map(({ identifier, name }) => (
                <span
                  key={identifier}
                  className="rounded-full px-2 py-0.5 text-xs font-medium text-white"
                  style={{
                    backgroundColor: `var(--color-${identifier})`,
                  }}
                >
                  {name}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-muted-foreground/60">전체</span>
          )}
        </div>
        <ChevronDown
          className="size-4 text-muted-foreground transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : undefined }}
        />
      </button>

      {/* 모바일: 애니메이션 패널 */}
      <div
        className="overflow-hidden transition-[height] duration-200 ease-out sm:hidden"
        style={{ height: open ? height : 0 }}
      >
        <div ref={contentRef}>
          <div className="flex flex-wrap gap-2 pt-2">
            <BadgeList
              selected={selected}
              isMaxed={isMaxed}
              onToggle={handleToggle}
            />
          </div>
        </div>
      </div>

      {/* 데스크톱: 항상 노출 */}
      <div className="hidden sm:block">
        <div className="flex flex-wrap gap-2">
          <BadgeList
            selected={selected}
            isMaxed={isMaxed}
            onToggle={handleToggle}
          />
        </div>
      </div>
    </div>
  );
}

function BadgeList({
  selected,
  isMaxed,
  onToggle,
}: {
  selected: string[];
  isMaxed: boolean;
  onToggle: (id: string) => void;
}) {
  return POKEMON_TYPES.map(({ identifier, name }) => {
    const isSelected = selected.includes(identifier);
    const isDisabled = !isSelected && isMaxed;

    return (
      <button
        key={identifier}
        type="button"
        disabled={isDisabled}
        onClick={() => onToggle(identifier)}
        className={[
          'rounded-full border px-3 py-1 text-sm font-medium',
          'transition-colors duration-150',
          isDisabled && 'cursor-not-allowed opacity-35',
        ]
          .filter(Boolean)
          .join(' ')}
        style={
          isSelected
            ? {
                backgroundColor: `var(--color-${identifier})`,
                borderColor: `var(--color-border-${identifier})`,
                color: '#fff',
              }
            : {
                backgroundColor: 'transparent',
                borderColor: `var(--color-border-${identifier})`,
                color: `var(--color-${identifier})`,
              }
        }
      >
        {name}
      </button>
    );
  });
}
