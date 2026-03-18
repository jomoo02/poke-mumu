import { SearchIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { ChangeEvent, startTransition, useEffect, useState } from 'react';

import { Input } from '@/app/shared/ui/input';
import { Button } from '@/app/shared/ui/button';

interface PokedexFilterInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
}

export default function PokedexFilterInput({
  inputValue,
  setInputValue,
}: PokedexFilterInputProps) {
  const placeholder = 'Name...';

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
    <div className="relative flex-1 max-w-xl mx-auto w-full">
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
  );
}
