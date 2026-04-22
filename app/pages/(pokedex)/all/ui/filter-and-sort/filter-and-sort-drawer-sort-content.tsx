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
            className="flex px-4 gap-2 h-11 items-center group hover:bg-muted dark:hover:bg-input rounded-4xl dark:has-checked:bg-input has-checked:bg-muted"
          >
            <input
              name="sort"
              type="radio"
              value={value}
              checked={currentValue === value}
              onChange={() => onSortChange(option)}
              className={cn(
                'border border-border bg-input relative appearance-none rounded-full size-4 checked:after:scale-100 checked:bg-primary',
                'after:absolute after:size-1.75 after:rounded-full after:bg-white after:inset-0 after:m-auto after:scale-0',
              )}
            />
            <span className="text-md">{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}
