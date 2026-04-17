import { type ColumnDef } from '@/app/shared/model/useTable';
import { type MoveView } from '../../../model';
import { Button } from '@/app/shared/ui/button';
import { ArrowUpIcon, ArrowUpDownIcon } from 'lucide-react';
import { cn } from '@/app/shared/lib/cn';
import { TypeIcon } from '@/app/entities/type/ui';
import { DamageClassIcon } from '@/app/entities/damage-class/ui';

const safeStr = (s?: string) => s ?? '';

export const legendsZaBasicColumns: ColumnDef<MoveView>[] = [
  {
    id: 'name',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="flex  hover:bg-accent gap-1 text-inherit"
        onClick={column.toggleSorting}
      >
        <span>기술</span>
        <span className="size-3.5">
          <ArrowUpIcon
            data-state={column.getSortedDirection() ?? 'hidden'}
            className={cn(
              'size-3.5',
              'data-[state=hidden]:hidden data-[state=desc]:rotate-180 transition-transform transform duration-400 will-change-transform',
            )}
          />
        </span>
      </Button>
    ),
    cell: ({ row }) => <>{row.name}</>,
    sortable: true,
    sortFn: (a, b) => safeStr(a.name).localeCompare(safeStr(b.name)),
    filterable: true,
  },
  {
    id: 'type',
    header: ({ column }) => (
      <div className="h-full w-full flex justify-center items-center">
        <Button
          variant="ghost"
          className="flex  hover:bg-accent gap-1 text-inherit"
          onClick={column.toggleSorting}
        >
          <span>타입</span>
          <span className="size-3.5">
            {column.getSortedDirection() ? (
              <ArrowUpIcon
                data-state={column.getSortedDirection() ?? 'hidden'}
                className={cn(
                  'size-3.5',
                  'data-[state=hidden]:hidden data-[state=desc]:rotate-180 transition-transform transform duration-400 will-change-transform',
                )}
              />
            ) : (
              <ArrowUpDownIcon className="size-3.5" />
            )}
          </span>
        </Button>
      </div>
    ),
    cell: ({ row }) => <TypeIcon type={row.type} className="size-6.5" />,
    sortable: true,
    sortFn: (a, b) =>
      safeStr(a.type.identifier).localeCompare(safeStr(b.type.identifier)),
  },
  {
    id: 'damageClass',
    header: ({ column }) => (
      <div className="h-full w-full flex justify-center items-center">
        <Button
          variant="ghost"
          className="flex  hover:bg-accent gap-1 text-inherit"
          onClick={column.toggleSorting}
        >
          <span>분류</span>
          <span className="size-3.5">
            {column.getSortedDirection() ? (
              <ArrowUpIcon
                data-state={column.getSortedDirection() ?? 'hidden'}
                className={cn(
                  'size-3.5',
                  'data-[state=hidden]:hidden data-[state=desc]:rotate-180 transition-transform transform duration-400 will-change-transform',
                )}
              />
            ) : (
              <ArrowUpDownIcon className="size-3.5" />
            )}
          </span>
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <DamageClassIcon damageClass={row.damageClass} />
      </div>
    ),
    sortable: true,
    sortFn: (a, b) =>
      safeStr(a.damageClass).localeCompare(safeStr(b.damageClass)),
  },
  {
    id: 'power',
    header: ({ column }) => (
      <div className="flex justify-end items-center w-full h-full">
        <Button
          variant="ghost"
          className="flex  hover:bg-accent gap- text-inherit"
          onClick={column.toggleSorting}
        >
          <span>위력</span>
          <span className="size-3.5">
            {column.getSortedDirection() ? (
              <ArrowUpIcon
                data-state={column.getSortedDirection() ?? 'hidden'}
                className={cn(
                  'size-3.5',
                  'data-[state=hidden]:hidden data-[state=desc]:rotate-180 transition-transform transform duration-400 will-change-transform',
                )}
              />
            ) : (
              <ArrowUpDownIcon className="size-3.5" />
            )}
          </span>
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-right pr-2">{row.power || '-'}</div>
    ),
    sortable: true,
    sortFn: (a, b) => (a.power ?? -1) - (b.power ?? -1),
  },
  {
    id: 'cooldown',
    header: ({ column }) => (
      <div className="w-full h-full flex justify-end items-center">
        <Button
          variant="ghost"
          className="flex  hover:bg-accent gap-1 text-inherit"
          onClick={column.toggleSorting}
        >
          <span>재사용 시간</span>
          <span className="size-3.5">
            {column.getSortedDirection() ? (
              <ArrowUpIcon
                data-state={column.getSortedDirection() ?? 'hidden'}
                className={cn(
                  'size-3.5',
                  'data-[state=hidden]:hidden data-[state=desc]:rotate-180 transition-transform transform duration-400 will-change-transform',
                )}
              />
            ) : (
              <ArrowUpDownIcon className="size-3.5" />
            )}
          </span>
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-right">{row.cooldown ? `${row.cooldown}` : '-'}</div>
    ),
    sortable: true,
    sortFn: (a, b) => (a.cooldown ?? -1) - (b.cooldown ?? -1),
  },
];
