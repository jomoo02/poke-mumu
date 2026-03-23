import { type Type } from '@/app/entities/type/model';
import { cn } from '@/app/shared/lib/cn';
import { Button } from '@/app/shared/ui/button';

interface TypeFilterContentProps {
  allTypes: Type[];
  selected: Type[];
  isMaxed: boolean;
  onToggle: (type: Type) => void;
}

export default function TypeFilterContent({
  allTypes,
  selected,
  isMaxed,
  onToggle,
}: TypeFilterContentProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 gap-2">
      {allTypes.map((type) => {
        const isSelected = selected.find(
          (t) => t.identifier === type.identifier,
        );
        const isDisabled = !isSelected && isMaxed;

        return (
          <Button
            key={type.identifier}
            variant="outline"
            data-state={isSelected ? 'active' : 'inactive'}
            disabled={isDisabled}
            onClick={() => onToggle(type)}
            className={cn(
              'h-11 transition-none text-base font-normal',
              'disabled:cursor-not-allowed disabled:opacity-30',
              'data-active:bg-foreground data-active:hover:bg-foreground data-active:font-semibold data-active:text-background data-active:hover:text-background',
            )}
          >
            {type.name}
          </Button>
        );
      })}
    </div>
  );
}
