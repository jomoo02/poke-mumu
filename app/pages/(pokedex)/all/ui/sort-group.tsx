'use client';

import { ArrowUp, ArrowDown, ArrowDownUp } from 'lucide-react';

import Button from '@/app/shared/ui/button';
import { type SortKey, type Direction } from '../model';
import { cn } from '@/app/shared/lib/cn';

interface SortGroupProps {
  onClickSortButton: (v: string) => void;
  direction: Direction;
  selectedSortKey: SortKey;
}

export default function SortGroup({
  onClickSortButton,
  direction,
  selectedSortKey,
}: SortGroupProps) {
  const sortItems: { sortKey: SortKey; content: string }[] = [
    {
      sortKey: 'dexNumber',
      content: '도감번호',
    },

    {
      sortKey: 'name',
      content: '이름',
    },
    {
      sortKey: 'total',
      content: '총합',
    },
    {
      sortKey: 'hp',
      content: 'HP',
    },
    {
      sortKey: 'attack',
      content: '공격',
    },
    {
      sortKey: 'defense',
      content: '방어',
    },

    {
      sortKey: 'specialAttack',
      content: '특수공격',
    },
    {
      sortKey: 'specialDefense',
      content: '특수방어',
    },
    {
      sortKey: 'speed',
      content: '스피드',
    },
  ];
  return (
    <div className="mx-auto max-w-7xl p-6 gap-2 flex flex-wrap">
      {sortItems.map((item) => (
        <Button
          key={item.sortKey}
          onClick={() => onClickSortButton(item.sortKey)}
          className={cn(
            'py-2 px-3 border border-border text-base rounded-lg bg-card',
            item.sortKey === selectedSortKey && 'border-primary bg-primary/10',
          )}
        >
          {item.content}
          {item.sortKey === selectedSortKey ? (
            <>
              {direction === 'asc' ? (
                <ArrowUp className="size-4" />
              ) : (
                <ArrowDown className="size-4" />
              )}
            </>
          ) : (
            <ArrowDownUp className="size-4" />
          )}
        </Button>
      ))}
    </div>
  );
}
