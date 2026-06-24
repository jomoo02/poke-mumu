'use client';

import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { Button } from '@/shared/ui/button';

import { useListParams } from '../model/use-list-params';
import { SORT_OPTIONS, parseSort } from '../model/sort';
import { Field, FieldLabel } from '@/shared/ui/field';

// 키 Select + 방향 토글. URL(sortKey/sortDir)에 즉시 반영(라이브).
export default function SortControl() {
  const { searchParams, update } = useListParams();
  const { key, dir } = parseSort(searchParams);

  // 키 변경 시 방향도 그 키의 defaultDir로 동반 갱신(이전 방향 잔류 방지).
  const changeKey = (nextKey: string) => {
    const opt = SORT_OPTIONS.find((o) => o.key === nextKey);
    if (!opt) return;
    update({ sortKey: nextKey, sortDir: opt.defaultDir });
  };

  // 첫 진입 시 URL에 sortKey가 없으면 parseSort가 sortDir을 무시하므로
  // 방향만 바꿀 때도 현재 키를 함께 써준다.
  const toggleDir = () =>
    update({ sortKey: key, sortDir: dir === 'asc' ? 'desc' : 'asc' });

  return (
    <div className="flex gap-2">
      <div>
        <Select value={key} onValueChange={changeKey}>
          <SelectTrigger className="min-w-32 h-10.5">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((o) => (
              <SelectItem key={o.key} value={o.key}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        type="button"
        variant="secondary"
        className="size-10.5 bg-input/50 dark:bg-input/70 hover:bg-input/70 dark:hover:bg-input"
        size="icon"
        onClick={toggleDir}
        aria-label={dir === 'asc' ? '오름차순' : '내림차순'}
      >
        {dir === 'asc' ? (
          <ArrowUpIcon className="size-4.5" />
        ) : (
          <ArrowDownIcon className="size-4.5" />
        )}
      </Button>
    </div>
  );
}
