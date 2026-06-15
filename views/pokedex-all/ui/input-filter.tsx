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
  const placeholder = '도감번호 또는 이름';

  const handleChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    setInputValue('');
  };

  return (
    <InputGroup className="max-w-xl mx-auto h-11">
      <InputGroupInput
        placeholder={placeholder}
        className="h-10"
        value={inputValue}
        onChange={handleChange}
      />
      <InputGroupAddon>
        <SearchIcon className="size-4.5" />
      </InputGroupAddon>
      <InputGroupAddon align={'inline-end'}>
        <InputGroupButton
          tabIndex={-1}
          onClick={handleClick}
          size={'icon-sm'}
          className={cn(
            inputValue === '' ? 'text-transparent hover:text-transparent' : '',
          )}
        >
          <XIcon className="size-5" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
