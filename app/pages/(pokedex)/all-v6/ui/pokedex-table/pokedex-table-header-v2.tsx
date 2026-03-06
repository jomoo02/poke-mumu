import { ArrowDownUpIcon, ArrowUpIcon } from 'lucide-react';
import { RefObject } from 'react';

import { cn } from '@/app/shared/lib/cn';
import { Button } from '@/app/shared/ui/button';

import { type Direction, type SortKey } from '../../model';
import { columns } from './config';
import { useWindowVirtualizer } from '@tanstack/react-virtual';

interface TableHeaderProps {
  ref: RefObject<HTMLDivElement | null>;
  onClick: (target: string) => void;
  direction: Direction;
  sortKey: SortKey;
  isScrolledX: boolean;
}

export default function PokedexTableHeaderV2({
  ref,
  onClick,
  direction,
  sortKey,
  isScrolledX,
}: TableHeaderProps) {
  const colVirtualizer = useWindowVirtualizer({
    count: 10,
    estimateSize: (i) => columns[i].w,
    overscan: 10,
    horizontal: true,
  });
  const virtualColumns = colVirtualizer.getVirtualItems();
  return (
    // <div ref={ref} className="overflow-x-auto  scroll-auto">
    <div ref={ref} className=" sticky top-0 w-full left-0 right-0 h-12 z-10">
      {/* <div className="flex w-max lg:w-full relative h-12"> */}

      <div
        className=" relative w-full"
        style={{ width: `${colVirtualizer.getTotalSize()}px`, height: '100%' }}
      >
        <div
          className={cn(
            'w-20 md:w-26 sticky left-0 bg-card border-b z-10 top-0 h-full',
            isScrolledX ? 'shadow-sm' : '',
          )}
        />
        {virtualColumns.map((virtualCol) => (
          <div
            key={columns[virtualCol.index].id}
            style={{
              position: 'absolute',
              top: 0,
              // left: 104,
              transform: `translateX(${virtualCol.start}px)`,
              height: '100%',
            }}
            className={cn(
              'left-20 md:left-26',
              'bg-card border-b h-full flex items-center w-30',
              'text-sm font-medium',
              columns[virtualCol.index].sortable ? 'px-2' : 'px-4',
              columns[virtualCol.index].width,
              columns[virtualCol.index].align === 'right'
                ? 'justify-end'
                : 'justify-start',
            )}
          >
            {columns[virtualCol.index].sortable ? (
              <Button
                variant={'ghost'}
                size={'lg'}
                onClick={() => onClick(columns[virtualCol.index].id)}
                className={
                  sortKey === columns[virtualCol.index].id ? 'bg-muted' : ''
                }
              >
                {columns[virtualCol.index].header}
                {sortKey === columns[virtualCol.index].id ? (
                  <ArrowUpIcon
                    className={cn(
                      'size-4  transition-transform transform duration-400',

                      direction === 'desc' ? 'rotate-180' : '',
                    )}
                  />
                ) : (
                  <ArrowDownUpIcon className="size-4" />
                )}
              </Button>
            ) : (
              <>{columns[virtualCol.index].header}</>
            )}
          </div>
        ))}

        {/* {columns.map(({ id, header, sortable, width, align }) => (
          <div
            key={id}
            style={{}}
            className={cn(
              'bg-card border-b h-full flex items-center',
              'text-sm font-medium',
              sortable ? 'px-2' : 'px-4',
              width,
              align === 'right' ? 'justify-end' : 'justify-start',
            )}
          >
            {sortable ? (
              <Button
                variant={'ghost'}
                size={'lg'}
                onClick={() => onClick(id)}
                className={sortKey === id ? 'bg-muted' : ''}
              >
                {header}
                {sortKey === id ? (
                  <ArrowUpIcon
                    className={cn(
                      'size-4  transition-transform transform duration-400',

                      direction === 'desc' ? 'rotate-180' : '',
                    )}
                  />
                ) : (
                  <ArrowDownUpIcon className="size-4" />
                )}
              </Button>
            ) : (
              <>{header}</>
            )}
          </div>
        ))} */}
      </div>
    </div>
    // </div>
  );
}
