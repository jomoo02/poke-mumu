import { cn } from '@/app/shared/lib/cn';

import { type SortOption, getSortOptions } from '../../model';

interface SortContentProps {
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export default function SortContent({ sort, onSortChange }: SortContentProps) {
  const currentValue = `${sort.key}-${sort.direction}`;

  const sortOptions = getSortOptions();

  return (
    <div className="flex flex-col w-full gap-1">
      {sortOptions.map((option) => {
        const value = `${option.key}-${option.direction}`;

        return (
          <label
            key={value}
            className="flex px-2 gap-2 h-11 items-center group hover:bg-accent rounded-lg has-checked:bg-accent"
          >
            <input
              name="sort"
              type="radio"
              value={value}
              checked={currentValue === value}
              onChange={() => onSortChange(option)}
              className={cn(
                'border border-border relative appearance-none rounded-full size-5 group-hover:bg-accent checked:after:scale-100',
                'after:absolute after:size-2.75 after:rounded-full after:bg-foreground after:inset-0 after:m-auto after:scale-0 ',
              )}
            />
            <span className="">{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}
