import { SearchIcon, XIcon } from 'lucide-react';

import { useSearchContext } from '../provider/search.context';

import { Button } from '@/app/shared/ui/button';

export default function Input() {
  const { inputRef, handleInputValueChange, closeSearch, inputValue } =
    useSearchContext();

  const placeholderText = '도감 번호 또는 포켓몬 이름으로 검색';

  return (
    <div className="px-4 border-b pb-2">
      <div className=" flex rounded-xl justify-center items-center gap-x-0.5 px-2 bg-input/50 min-h-10 h-10 max-h-10">
        <SearchIcon className="size-5" />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleInputValueChange(e.target.value)}
          ref={inputRef}
          placeholder={placeholderText}
          className="flex-1 px-2 py-1 h-8 focus:outline-none text-slate-800 placeholder:text-muted-foreground placeholder:font-suit"
        />

        <Button
          variant="ghost"
          type="button"
          aria-label="Close"
          size="icon"
          onClick={closeSearch}
        >
          <XIcon className="size-5" />
        </Button>
      </div>
    </div>
  );
}
