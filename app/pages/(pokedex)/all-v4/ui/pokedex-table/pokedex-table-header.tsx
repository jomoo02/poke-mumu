import { ArrowDownUpIcon, ArrowUpIcon } from 'lucide-react';
import { RefObject } from 'react';

import { cn } from '@/app/shared/lib/cn';
import { Button } from '@/app/shared/ui/button';

import { type Direction, type SortKey } from '../../model';
import { columns } from './config';

interface TableHeaderProps {
  ref?: RefObject<HTMLDivElement | null>;
  onClick: (target: string) => void;
  direction: Direction;
  sortKey: SortKey;
  isScrolledX?: boolean;
}

export default function PokedexTableHeader({
  ref,
  onClick,
  direction,
  sortKey,
  isScrolledX,
}: TableHeaderProps) {
  return (
    // <div ref={ref} className="overflow-x-auto  scroll-auto">
    <div className="">
      <div className="flex relative h-12">
        {columns.map(({ id, header, sortable, width, align }) => (
          <div
            key={id}
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
        ))}
      </div>
    </div>
  );
}
