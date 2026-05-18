import { Type } from '@/app/entities/type/model';
import { cn } from '@/app/shared/lib/cn';
import { Button } from '@/app/shared/ui/button';

interface TypeFilterProps {
  types: Type[];
  toggleType: (identifier: string) => void;
  activeTypes: Set<string>;
}

export default function TypeFilter({
  toggleType,
  types,
  activeTypes,
}: TypeFilterProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {types.map((t) => (
        <Button
          key={t.identifier}
          variant={'outline'}
          type="button"
          onClick={() => toggleType(t.identifier)}
          data-active={activeTypes.has(t.identifier)}
          className={cn(
            'data-active:bg-muted data-active:hover:bg-muted dark:data-active:bg-input dark:data-active:hover:bg-input',
          )}
        >
          {t.nameKo}
        </Button>
      ))}
    </div>
  );
}
