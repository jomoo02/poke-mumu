import {
  ChevronDownIcon,
  ChevronsUpDownIcon,
  ChevronUpIcon,
} from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';

import type { AbilitySort, SortKey } from '../../lib/ability-sort';

const HEAD_CELL =
  'sticky top-13 z-10 h-11 bg-muted px-4 text-sm text-foreground/70 font-medium whitespace-nowrap text-left';

interface AbilityTableHeaderProps {
  sort: AbilitySort;
  onToggleSort: (sortKey: SortKey) => void;
}

export default function AbilityTableHeader({
  sort,
  onToggleSort,
}: AbilityTableHeaderProps) {
  return (
    <thead>
      <tr>
        <SortableHead
          label="이름"
          sortKey="name"
          sort={sort}
          onToggleSort={onToggleSort}
          className="rounded-l-lg"
        />
        <th className={HEAD_CELL}>설명</th>
        <SortableHead
          label="등장"
          sortKey="appearance"
          sort={sort}
          onToggleSort={onToggleSort}
          className="rounded-r-lg"
        />
      </tr>
    </thead>
  );
}

interface SortableHeadProps {
  label: string;
  sortKey: SortKey;
  sort: AbilitySort;
  onToggleSort: (sortKey: SortKey) => void;
  className?: string;
}

function SortableHead({
  label,
  sortKey,
  sort,
  onToggleSort,
  className,
}: SortableHeadProps) {
  // URL sort state(sort, dir)를 기준으로 활성 여부/aria/아이콘을 파생한다
  const isActive = sort.sort === sortKey;

  const ariaSort = !isActive
    ? 'none'
    : sort.dir === 'asc'
      ? 'ascending'
      : 'descending';

  const Icon = !isActive
    ? ChevronsUpDownIcon
    : sort.dir === 'asc'
      ? ChevronUpIcon
      : ChevronDownIcon;

  return (
    <th aria-sort={ariaSort} className={cn(HEAD_CELL, className)}>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => onToggleSort(sortKey)}
        className={cn('-mx-2.5', isActive && 'text-foreground')}
      >
        {label}
        <Icon
          aria-hidden="true"
          className={cn('size-4', !isActive && 'opacity-30')}
        />
      </Button>
    </th>
  );
}
