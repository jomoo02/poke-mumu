import { ArrowDownUpIcon, ArrowUpIcon } from 'lucide-react';

import { cn } from '@/app/shared/lib/cn';
import { Button } from '@/app/shared/ui/button';

import { type Direction, type SortKey } from '../../model';
import { columns } from './config';

interface TableHeaderProps {
  onClick: (target: string) => void;
  direction: Direction;
  sortKey: SortKey;
  isXScrolled: boolean;
}

export default function PokedexTableHeader({
  onClick,
  direction,
  sortKey,
  isXScrolled,
}: TableHeaderProps) {
  return (
    <div className="sticky top-0 z-50 w-full h-12 min-w-330">
      <div className="flex w-full relative items-center h-full">
        <div
          className={cn(
            'w-26 min-w-26 sticky left-0 bg-card border-b z-10 shrink-0 h-full ',
            isXScrolled ? 'shadow-sm' : '',
          )}
        />
        {columns.map(({ id, header, sortable, width, align }) => (
          <div
            key={id}
            className={cn(
              'bg-card border-b h-full flex items-center ',
              'text-sm font-medium',
              sortable ? 'px-2' : 'px-4',
              width,
              id === 'name' ? '' : 'shrink-0',
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
