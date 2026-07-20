import { SearchIcon, XIcon } from 'lucide-react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/shared/ui/input-group';

// import { useAbilitySearchContext } from './context';
import { useAbilitySearch } from './useAbilitySearch';

export default function AbilitySearch() {
  const placeholder = '맹화, Blaze, もうか';
  const { input, onInputChange, clearSearch } = useAbilitySearch();

  return (
    <InputGroup className="w-full md:max-w-md md:w-md h-10.5">
      <InputGroupInput
        placeholder={placeholder}
        className="h-10.5"
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
      />
      <InputGroupAddon>
        <SearchIcon className="size-4.5" />
      </InputGroupAddon>
      <InputGroupAddon align={'inline-end'}>
        <InputGroupButton
          tabIndex={-1}
          onClick={clearSearch}
          size={'icon-sm'}
          className={
            input === ''
              ? 'text-transparent hover:text-transparent hidden'
              : 'flex'
          }
        >
          <XIcon className="size-5" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
