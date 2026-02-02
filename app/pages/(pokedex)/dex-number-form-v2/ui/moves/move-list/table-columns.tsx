import { type ColumnDef } from '@/app/shared/model/useTable';
import { type MoveView } from '../../../model';
import Button from '@/app/shared/ui/button';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/app/shared/lib/cn';
import { TypeIcon } from '@/app/entities/type/ui';
import { DamageClassIcon } from '@/app/entities/damage-class/ui';

const safeStr = (s?: string) => s ?? '';

export const basicColumns: ColumnDef<MoveView>[] = [
  {
    id: 'name',
    header: ({ column }) => (
      <Button
        className="flex h-full gap-2 hover:bg-accent px-2 justify-between "
        onClick={column.toggleSorting}
      >
        <span>기술</span>
        <span className="size-3.5">
          <ArrowUp
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
          className="flex  px-2 gap-2  h-full hover:bg-accent active:bg-accent"
          onClick={column.toggleSorting}
        >
          <span>타입</span>
          <span className="size-3.5">
            <ArrowUp
              data-state={column.getSortedDirection() ?? 'hidden'}
              className={cn(
                'size-3.5',
                'data-[state=hidden]:hidden data-[state=desc]:rotate-180 transition-transform transform duration-400 will-change-transform',
              )}
            />
          </span>
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {' '}
        <TypeIcon type={row.type} className="size-6.5 md:size-7" />
      </div>
    ),
    sortable: true,
    sortFn: (a, b) =>
      safeStr(a.type.identifier).localeCompare(safeStr(b.type.identifier)),
  },
  {
    id: 'damageClass',
    header: ({ column }) => (
      <div className="h-full w-full flex justify-center items-center">
        <Button
          className="flex h-full hover:bg-accent px-2  gap-2 active:bg-accent "
          onClick={column.toggleSorting}
        >
          <span>분류</span>
          <span className="size-3.5">
            <ArrowUp
              data-state={column.getSortedDirection() ?? 'hidden'}
              className={cn(
                'size-3.5',
                'data-[state=hidden]:hidden data-[state=desc]:rotate-180 transition-transform transform duration-400 will-change-transform',
              )}
            />
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
          className="flex justify-between gap-2 h-full hover:bg-accent px-2 active:bg-accent"
          onClick={column.toggleSorting}
        >
          <span>위력</span>
          <span className="size-3.5">
            <ArrowUp
              data-state={column.getSortedDirection() ?? 'hidden'}
              className={cn(
                'size-3.5 ',
                'data-[state=hidden]:hidden data-[state=desc]:rotate-180 transition-transform transform duration-400 will-change-transform',
              )}
            />
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
    id: 'accuracy',
    header: ({ column }) => (
      <div className="w-full h-full flex justify-end items-center">
        {' '}
        <Button
          className="flex justify-between gap-2 h-full hover:bg-accent px-2  active:bg-accent "
          onClick={column.toggleSorting}
        >
          <span>명중률</span>
          <span className="size-3.5">
            <ArrowUp
              data-state={column.getSortedDirection() ?? 'hidden'}
              className={cn(
                'size-3.5 ',
                'data-[state=hidden]:hidden data-[state=desc]:rotate-180 transition-transform transform duration-400 will-change-transform',
              )}
            />
          </span>
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-right pr-2">
        {row.accuracy ? `${row.accuracy}` : '-'}
      </div>
    ),
    sortable: true,
    sortFn: (a, b) => (a.accuracy ?? -1) - (b.accuracy ?? -1),
  },
  {
    id: 'pp',
    header: ({ column }) => (
      <div className="w-full h-full flex justify-end items-center">
        <Button
          className="flex justify-between gap-2 h-full hover:bg-accent px-2  active:bg-accent "
          onClick={column.toggleSorting}
        >
          <span>PP</span>
          <span className="size-3.5">
            <ArrowUp
              data-state={column.getSortedDirection() ?? 'hidden'}
              className={cn(
                'size-3.5 ',
                'data-[state=hidden]:hidden data-[state=desc]:rotate-180 transition-transform transform duration-400 will-change-transform',
              )}
            />
          </span>
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-right pr-2">{row.pp || '-'}</div>,
    sortable: true,
    sortFn: (a, b) => (a.pp ?? -1) - (b.pp ?? -1),
  },
  // {
  //   id: 'info',
  //   header: () => <div />,
  //   cell: ({ row }) => (
  //     <>
  //       <Move move={row} />
  //     </>
  //   ),
  //   sortable: false,
  // },
];

export const levelUpColumn: ColumnDef<MoveView> = {
  id: 'level',
  header: ({ column }) => (
    <Button
      className="flex h-full gap-2 hover:bg-accent px-2 active:bg-accent"
      onClick={column.toggleSorting}
    >
      <span>Lv.</span>
      <span className="size-3.5">
        <ArrowUp
          data-state={column.getSortedDirection() ?? 'hidden'}
          className={cn(
            'size-3.5',
            'data-[state=hidden]:hidden data-[state=desc]:rotate-180 transition-transform transform duration-400 will-change-transform',
          )}
        />
      </span>
    </Button>
  ),
  cell: ({ row }) => <div className="text-left">{row.level}</div>,
  sortable: true,
  sortFn: (a, b) => (a.level ?? -1) - (b.level ?? -1),
};

export const machineColumn: ColumnDef<MoveView> = {
  id: 'machine',
  header: ({ column, content }) => (
    <Button
      className="flex justify-between gap-2 h-full hover:bg-accent px-2 active:bg-accent"
      onClick={column.toggleSorting}
    >
      <span>{content}</span>
      <span className="size-3.5">
        <ArrowUp
          data-state={column.getSortedDirection() ?? 'hidden'}
          className={cn(
            'size-3.5 ',
            'data-[state=hidden]:hidden data-[state=desc]:rotate-180 transition-transform transform duration-400 will-change-transform',
          )}
        />
      </span>
    </Button>
  ),
  cell: ({ row }) => <div>{row.machineNumber}</div>,
  sortable: true,
  sortFn: (a, b) => (a.machineNumber ?? -1) - (b.machineNumber ?? -1),
};

export const legendsZaBasicColumns: ColumnDef<MoveView>[] = [
  {
    id: 'name',
    header: ({ column }) => (
      <Button
        className="flex h-full gap-2 hover:bg-accent px-2 justify-between "
        onClick={column.toggleSorting}
      >
        <span>기술</span>
        <span className="size-3.5">
          <ArrowUp
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
          className="flex  px-2 gap-2  h-full hover:bg-accent active:bg-accent"
          onClick={column.toggleSorting}
        >
          <span>타입</span>
          <span className="size-3.5">
            <ArrowUp
              data-state={column.getSortedDirection() ?? 'hidden'}
              className={cn(
                'size-3.5',
                'data-[state=hidden]:hidden data-[state=desc]:rotate-180 transition-transform transform duration-400 will-change-transform',
              )}
            />
          </span>
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {' '}
        <TypeIcon type={row.type} className="size-6.5 md:size-7" />
      </div>
    ),
    sortable: true,
    sortFn: (a, b) =>
      safeStr(a.type.identifier).localeCompare(safeStr(b.type.identifier)),
  },
  {
    id: 'damageClass',
    header: ({ column }) => (
      <div className="h-full w-full flex justify-center items-center">
        <Button
          className="flex h-full hover:bg-accent px-2  gap-2 active:bg-accent "
          onClick={column.toggleSorting}
        >
          <span>분류</span>
          <span className="size-3.5">
            <ArrowUp
              data-state={column.getSortedDirection() ?? 'hidden'}
              className={cn(
                'size-3.5',
                'data-[state=hidden]:hidden data-[state=desc]:rotate-180 transition-transform transform duration-400 will-change-transform',
              )}
            />
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
          className="flex justify-between gap-2 h-full hover:bg-accent px-2 active:bg-accent"
          onClick={column.toggleSorting}
        >
          <span>위력</span>
          <span className="size-3.5">
            <ArrowUp
              data-state={column.getSortedDirection() ?? 'hidden'}
              className={cn(
                'size-3.5 ',
                'data-[state=hidden]:hidden data-[state=desc]:rotate-180 transition-transform transform duration-400 will-change-transform',
              )}
            />
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
        {' '}
        <Button
          className="flex justify-between gap-2 h-full hover:bg-accent px-2  active:bg-accent "
          onClick={column.toggleSorting}
        >
          <span>재사용 시간</span>
          <span className="size-3.5">
            <ArrowUp
              data-state={column.getSortedDirection() ?? 'hidden'}
              className={cn(
                'size-3.5 ',
                'data-[state=hidden]:hidden data-[state=desc]:rotate-180 transition-transform transform duration-400 will-change-transform',
              )}
            />
          </span>
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-right pr-2">
        {row.cooldown ? `${row.cooldown}` : '-'}
      </div>
    ),
    sortable: true,
    sortFn: (a, b) => (a.cooldown ?? -1) - (b.cooldown ?? -1),
  },
];
