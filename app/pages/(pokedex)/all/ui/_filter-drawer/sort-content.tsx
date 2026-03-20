import { Button } from '@/app/shared/ui/button';
import { type SortKey, type Direction, type SortOption } from '../../model';
import { cn } from '@/app/shared/lib/cn';
import { Input } from '@/app/shared/ui/input';

const SORT_OPTIONS: { key: SortKey; label: string; direction: Direction }[] = [
  { key: 'dexNumber', label: '도감번호 순서', direction: 'asc' },
  { key: 'dexNumber', label: '도감번호 반대 순서', direction: 'desc' },
  { key: 'name', label: '이름 순서', direction: 'asc' },
  { key: 'name', label: '이름 반대 순서', direction: 'desc' },
  { key: 'hp', label: 'HP 높은 순서', direction: 'desc' },
  { key: 'hp', label: 'HP 낮은 순서', direction: 'asc' },
  { key: 'attack', label: '공격 높은 순서', direction: 'desc' },
  { key: 'attack', label: '공격 낮은 순서', direction: 'asc' },
  { key: 'defense', label: '방어 높은 순서', direction: 'desc' },
  { key: 'defense', label: '방어 낮은 순서', direction: 'asc' },
  { key: 'specialAttack', label: '특수공격 높은 순서', direction: 'desc' },
  { key: 'specialAttack', label: '특수공격 낮은 순서', direction: 'asc' },
  { key: 'specialDefense', label: '특수방어 높은 순서', direction: 'desc' },
  { key: 'specialDefense', label: '특수방어 낮은 순서', direction: 'asc' },
  { key: 'speed', label: '스피드 높은 순서', direction: 'desc' },
  { key: 'speed', label: '스피드 낮은 순서', direction: 'asc' },
  { key: 'total', label: '총합 높은 순서', direction: 'desc' },
  { key: 'total', label: '총합 낮은 순서', direction: 'asc' },
];

interface SortContentProps {
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export default function SortContent({ sort, onSortChange }: SortContentProps) {
  const currentValue = `${sort.key}-${sort.direction}`;

  return (
    <div className="flex flex-col w-full gap-1">
      {SORT_OPTIONS.map((option) => {
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
