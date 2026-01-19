'use client';

import { ArrowUp, ArrowDown } from 'lucide-react';

import Button from '@/app/shared/ui/button';
import { cn } from '@/app/shared/lib/cn';

import { type SortKey, type Direction } from '../model';

interface SortGroupProps {
  onClickSortButton: (v: string) => void;
  direction: Direction;
  selectedSortKey: SortKey;
}

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

export default function SortGroup({
  onClickSortButton,
  direction,
  selectedSortKey,
}: SortGroupProps) {
  return (
    <div className="gap-2 flex flex-wrap">
      {sortItems.map((item) => (
        <Button
          key={item.sortKey}
          onClick={() => onClickSortButton(item.sortKey)}
          className={cn(
            'py-2 px-3 border border-border rounded-lg bg-card text-sm',
            item.sortKey === selectedSortKey
              ? 'border-primary bg-primary/10'
              : 'hover:bg-accent',
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
            <div className="size-4" />
          )}
        </Button>
      ))}
    </div>
  );
}
