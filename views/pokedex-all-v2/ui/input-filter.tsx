import { SearchIcon, XIcon } from 'lucide-react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/shared/ui/input-group';
import { cn } from '@/shared/lib/cn';
import { useSearchContext } from '../model-v2/pokedex';
import { ChangeEvent } from 'react';

export default function InputFilter() {
  const { inputValue, setInputValue } = useSearchContext();
  const placeholder = '';

  const handleChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    setInputValue('');
  };

  return (
    <InputGroup className="max-w-xl mx-auto h-11">
      <InputGroupInput
        value={inputValue}
        onChange={handleChange}
        // id="name-poke"
        autoComplete="off"
        placeholder={'포켓몬 이\u200B름 또는 도감 번호'}
        className="peer"
      />
      {/* <label
        htmlFor="name-poke"
        className="absolute left-3 top-2 text-muted-foreground transition-all peer-focus:-top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:-top-2"
      >
        name
      </label> */}
      <InputGroupAddon>
        <SearchIcon className="size-4.5" />
      </InputGroupAddon>
      <InputGroupAddon align={'inline-end'}>
        <InputGroupButton
          tabIndex={-1}
          onClick={handleClick}
          size={'icon-sm'}
          className={cn(
            inputValue === ''
              ? 'text-transparent hover:text-transparent hidden'
              : 'flex',
          )}
        >
          <XIcon className="size-5" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
