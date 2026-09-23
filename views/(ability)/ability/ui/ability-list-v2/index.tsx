'use client';

import Link from 'next/link';
import { useLayoutEffect, useRef, useState } from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';

import { cn } from '@/shared/lib/cn';
import type { Ability } from '@/entities/ability/model';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';

import useAbilityList from './useAbilityList';

const MIN_COLUMN_WIDTH = 280; // minmax(280px, 1fr)
const GAP = 24; // gap-6 = 1.5rem
const ROW_HEIGHT = 159; // h-[190px]
const ROW_GAP = 24; // 행 사이 간격
const ROW_STRIDE = ROW_HEIGHT + ROW_GAP; // 183

interface AbilityListProps {
  abilities: Ability[];
}

export default function AbilityListV2({ abilities }: AbilityListProps) {
  const { filteredAbilities } = useAbilityList(abilities);

  const listRef = useRef<HTMLDivElement | null>(null);
  const [columnCount, setColumnCount] = useState(1);
  const [scrollMargin, setScrollMargin] = useState(0);

  // 컨테이너 너비 측정 → 컬럼 수 계산 (auto-fill과 동일 공식)
  useLayoutEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const calc = () => {
      setScrollMargin(el.getBoundingClientRect().top + window.scrollY);
      // sm 미만에서는 1열 강제
      const isSmUp = window.matchMedia('(min-width: 640px)').matches;
      const width = el.clientWidth;
      const cols = isSmUp
        ? Math.max(1, Math.floor((width + GAP) / (MIN_COLUMN_WIDTH + GAP)))
        : 1;
      setColumnCount(cols);
    };

    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const rowCount = Math.ceil(filteredAbilities.length / columnCount);

  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => ROW_STRIDE,
    overscan: 5,
    scrollMargin,
  });

  return (
    <div className="flex flex-col gap-6">
      <div aria-live="polite" className="text-sm text-foreground/70">
        {filteredAbilities.length}개의 특성
      </div>
      {filteredAbilities.length === 0 ? (
        <div className="font-medium text-muted-foreground">
          일치하는 특성이 없습니다
        </div>
      ) : (
        <div
          ref={listRef}
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const start = virtualRow.index * columnCount;
            const rowItems = filteredAbilities.slice(
              start,
              start + columnCount,
            );

            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${
                    virtualRow.start - virtualizer.options.scrollMargin
                  }px)`,
                }}
              >
                <div
                  className="grid gap-6 h-[159px]"
                  style={{
                    gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
                  }}
                >
                  {rowItems.map((ability) => (
                    <AbilityItem key={ability.identifier} ability={ability} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface AbilityProps {
  ability: Ability;
}

function AbilityItem({ ability }: AbilityProps) {
  return (
    <Card
      variant="link"
      render={<Link href={`/ability/${ability.identifier}`} />}
    >
      <CardHeader>
        <CardTitle>{ability.nameKo}</CardTitle>
        <CardDescription>
          <p className="truncate">{`${ability.nameEn} / ${ability.nameJa}`}</p>
        </CardDescription>
      </CardHeader>
      <CardContent
        className={cn(
          'line-clamp-2 break-keep flex-1 h-full text-md text-foreground/70',
        )}
      >
        {ability.flavorText}
      </CardContent>
    </Card>
  );
}
