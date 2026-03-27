'use client';

import { useEffect, useRef } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { useVirtualizer } from '@tanstack/react-virtual';
import Link from 'next/link';

import { type Poke } from '@/app/entities/poke/model';
import { PokeSprite } from '@/app/entities/poke/ui';
import { formatNumber } from '@/app/shared/lib/format';
import { cn } from '@/app/shared/lib/cn';

const ITEM_HEIGHT = 56;

interface DesktopNavProps {
  pokes: Poke[];
}

export default function DesktopNav({ pokes }: DesktopNavProps) {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const isFirstMount = useRef(true);

  const params = useParams<{ dexNumber?: string }>();
  const dexNumber = params?.dexNumber ? Number(params.dexNumber) : 0;

  const activeIndex = pokes.findIndex((p) => p.dexNumber === dexNumber);

  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: pokes.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ITEM_HEIGHT + 4,
    initialOffset: Math.max(0, activeIndex) * ITEM_HEIGHT,
  });

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (activeIndex < 0) return;

    const isVisible = virtualizer
      .getVirtualItems()
      .some((item) => item.index === activeIndex);

    if (!isVisible) {
      virtualizer.scrollToIndex(activeIndex, { align: 'center' });
    }
  }, [activeIndex, pathname, virtualizer]);

  return (
    <div
      ref={scrollRef}
      className="h-full overflow-y-auto pl-8 pr-6 py-14 thin-scrollbar"
    >
      <div
        className="relative w-full  flex flex-col gap-1"
        style={{ height: virtualizer.getTotalSize() }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const poke = pokes[virtualItem.index];
          const isActive = poke.dexNumber === dexNumber;

          return (
            <Link
              key={virtualItem.key}
              href={`/pokedex/${poke.dexNumber}/${poke.pokeKey}`}
              className={cn(
                'absolute left-0 right-0 flex items-center gap-2 rounded-lg px-2',
                isActive
                  ? 'bg-accent font-medium'
                  : 'text-muted-foreground hover:text-foreground',
              )}
              style={{
                height: ITEM_HEIGHT,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <PokeSprite poke={poke} className="size-10 shrink-0" />
              <div className="text-sm min-w-0">
                <div className="text-muted-foreground">
                  {formatNumber(poke.dexNumber)}
                </div>
                <div className="truncate">{poke.name}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
