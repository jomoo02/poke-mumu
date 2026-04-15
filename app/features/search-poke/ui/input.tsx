import { SearchIcon, XIcon } from 'lucide-react';

import { useSearchContext } from '../provider/search.context';

import { Button } from '@/app/shared/ui/button';
import { cn } from '@/app/shared/lib/cn';

export default function Input() {
  const { inputRef, handleInputValueChange, closeSearch, inputValue } =
    useSearchContext();

  const placeholderText = '도감 번호 또는 포켓몬 이름으로 검색';

  return (
    <div className="p-4 bg-card border-b">
      <div className="">
        <div
          className={cn(
            ' flex rounded-4xl justify-center items-center gap-x-1 px-4 border h-10 shrink-0 group shadow-sm bg-input/50',
            'group has-focus:border-ring has-focus:ring-ring/50 has-focus:ring-[3px]',
          )}
        >
          <SearchIcon className="size-5" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleInputValueChange(e.target.value)}
            autoComplete="off"
            ref={inputRef}
            // onFocus={(e) => {
            //   e.target.scrollIntoView({ block: 'nearest' });
            // }}
            placeholder={placeholderText}
            className="flex-1 px-2 py-1 h-8 focus:outline-none placeholder:text-muted-foreground placeholder:font-suit"
          />

          <Button
            variant="ghost"
            type="button"
            className=""
            tabIndex={-1}
            aria-label="Close"
            size="icon"
            onClick={closeSearch}
          >
            <XIcon className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
