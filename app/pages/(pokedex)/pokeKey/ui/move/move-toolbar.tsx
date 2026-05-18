// app/pages/(pokedex)/pokeKey/ui/move/move-toolbar.tsx
'use client';

import { ChangeEvent } from 'react';

import { cn } from '@/app/shared/lib/cn';
import type { SortKey } from '../../model/move/useMoveTable';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@/app/shared/ui/select';
import { Input } from '@/app/shared/ui/input';

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'default', label: '기본' },
  { value: 'name', label: '이름순' },
  { value: 'power-desc', label: '위력 높은 순' },
  { value: 'power-asc', label: '위력 낮은 순' },
  { value: 'type', label: '타입순' },
];

interface MoveToolbarProps {
  search: string;
  onSearchChange: (v: string) => void;
  sortKey: SortKey;
  onSortKeyChange: (v: SortKey) => void;
  resultCount: number;
  totalCount: number;
}

export default function MoveToolbar({
  search,
  onSearchChange,
  sortKey,
  onSortKeyChange,
  resultCount,
  totalCount,
}: MoveToolbarProps) {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleValueChange = (v: string) => {
    onSortKeyChange(v as SortKey);
  };

  return (
    <div className="@container">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <Input
          value={search}
          onChange={handleSearch}
          className="placeholder:text-sm max-w-xl"
          placeholder="기술 이름으로 검색"
        />

        <Select value={sortKey} onValueChange={handleValueChange}>
          <SelectTrigger className="w-40 px-4 min-h-10 h-10 bg-muted dark:bg-input dark:hover:bg-input">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
