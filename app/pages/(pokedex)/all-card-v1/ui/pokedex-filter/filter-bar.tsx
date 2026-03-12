import { SearchIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';

import { Input } from '@/app/shared/ui/input';
import { ChangeEvent, startTransition, useEffect, useState } from 'react';
import { Button } from '@/app/shared/ui/button';
import { cn } from '@/app/shared/lib/cn';

interface FilterBarProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  activeFilterCount: number;
}

export default function FilterBar({
  inputValue,
  setInputValue,
  activeFilterCount,
}: FilterBarProps) {
  const placeholder = 'Name...';
  const isActive = activeFilterCount > 0;

  const [localInput, setLocalInput] = useState(inputValue);

  useEffect(() => {
    setLocalInput(inputValue);
  }, [inputValue]);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setLocalInput(v);
    startTransition(() => {
      setInputValue(v);
    });
  };

  const handleClickButton = () => {
    setInputValue('');
  };

  return (
    <div className="bg-card sticky top-14 z-10">
      <div className="px-4 sm:px-6 xl:px-14 py-4 flex items-center gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            value={localInput}
            onChange={handleChangeInput}
            placeholder={placeholder}
            className="w-full px-11 bg-input/30 h-10 rounded-lg focus:bg-card"
          />
          {inputValue && (
            <Button
              onClick={handleClickButton}
              variant={'ghost'}
              className="absolute right-4 top-1/2 -translate-y-1/2 px-0 "
            >
              <XIcon className="size-4.5  text-muted-foreground" />
            </Button>
          )}
        </div>

        <Button className="h-10" size={'lg'} variant={'outline'}>
          <SlidersHorizontalIcon className="size-4.5 " />
          {isActive && (
            <span className="size-4.5 inline-flex items-center text-xs justify-center font-semibold bg-primary text-primary-foreground rounded-full">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
