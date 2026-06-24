import type { Type } from '@/entities/type/model';
import { Toggle } from '@/shared/ui/toggle';
import { useControlContext } from '../../model-v2/pokedex';
import { TypeIcon } from '@/entities/type/ui';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

interface TypeSectionProps {
  types: Type[];
}

export default function TypeSection({ types }: TypeSectionProps) {
  const { filterTypes, toggleFilterType, resetFilterType } =
    useControlContext();

  const isSelected = (type: Type) =>
    filterTypes.some((t) => t.identifier === type.identifier);

  const isAllTypes = filterTypes.length === 0;
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="pb-5">
      <Button
        variant={'ghost'}
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-lg font-medium w-full justify-between px-1 hover:bg-transparent rounded-md"
      >
        <span>타입</span>
        <ChevronDownIcon
          className={cn(
            'size-5.5 transform duration-250',
            isOpen ? 'rotate-180' : '',
          )}
        />
      </Button>

      {isOpen && (
        <div className="grid grid-cols-3 gap-3 pt-4 ">
          {/* <Button
          variant={'default'}
          onClick={resetFilterType}
          className={cn(
            'h-11 rounded-4xl col-span-2',
            isAllTypes ? 'bg-primary/90' : 'bg-muted/70 text-foreground',
          )}
        >
          모든 타입
        </Button> */}
          {types.map((type) => (
            <Toggle
              key={type.identifier}
              pressed={isSelected(type)}
              onPressedChange={() => toggleFilterType(type)}
              className={cn(
                ' h-20 items-center border justify-center gap-1.5 p-3 group rounded-2xl  aria-pressed:bg-input/70 flex flex-col',
              )}
              aria-label={type.nameKo}
            >
              <TypeIcon type={type} className={cn('size-7.5 rounded-lg ')} />
              {/* <span className="pr-2.5">{type.nameKo}</span> */}
              <span className="text-center text-sm text-foreground/70">
                {' '}
                {type.nameKo}
              </span>
            </Toggle>
          ))}
        </div>
      )}
    </div>
  );
}
