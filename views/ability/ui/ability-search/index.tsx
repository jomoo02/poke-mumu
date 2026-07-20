'use client';

import { SearchIcon, XIcon } from 'lucide-react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/shared/ui/input-group';

import { useAbilitySearch } from './useAbilitySearch';

export default function AbilitySearch() {
  const placeholder = '맹화, Blaze, もうか';

  const { input, onInputChange, clearSearch } = useAbilitySearch();

  return (
    <InputGroup className="w-full h-10.5 lg:max-w-md">
      <InputGroupInput
        placeholder={placeholder}
        className="h-10.5"
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        autoComplete="off"
        aria-label="특성 이름 검색 (한글·영문·일본어)"
      />
      <InputGroupAddon>
        <SearchIcon className="size-4.5" />
      </InputGroupAddon>
      <InputGroupAddon align={'inline-end'}>
        <InputGroupButton
          tabIndex={-1}
          onClick={clearSearch}
          aria-label="검색어 지우기"
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
