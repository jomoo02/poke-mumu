'use client';

import { SearchIcon, XIcon } from 'lucide-react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/_shared/ui/input-group';
import { useSearchParamsInput } from '@/_shared/lib/search-params';

import { PAGE_RESET_KEYS, SEARCH_PARAMS_KEY } from '../../config/search-params';

export default function AbilitySearch() {
  const placeholder = '맹화, Blaze, もうか';

  const { value, onChange, onCompositionEnd, clear } = useSearchParamsInput({
    key: SEARCH_PARAMS_KEY.search,
    resetKeys: PAGE_RESET_KEYS,
  });

  return (
    <InputGroup className="w-full h-11">
      <InputGroupInput
        placeholder={placeholder}
        className="h-11"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onCompositionEnd={onCompositionEnd}
        autoComplete="off"
        aria-label="특성 검색 (한글·영문·일본어)"
      />
      <InputGroupAddon>
        <SearchIcon className="size-4.5" aria-hidden />
      </InputGroupAddon>
      <InputGroupAddon align={'inline-end'}>
        <InputGroupButton
          tabIndex={-1}
          onClick={clear}
          aria-label="검색어 지우기"
          size={'icon-sm'}
          className={value === '' ? ' hidden' : 'flex'}
        >
          <XIcon className="size-5" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
